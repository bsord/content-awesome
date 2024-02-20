const mongoose = require("./db");
const Project = require("./models/project");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

// CREATE
module.exports.add_project = async (event) => {
  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // insert project to database
  const project = await Project.create({
    title: body?.title || 'test project title',
    description: body?.description || 'test project description'
  })

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: 'Project created successfully!',
      project: project
    }),
  }
}

// READ
module.exports.get_projects = async (event) => {
  // connect to database
  await mongoose.connect();

  const projects = await Project.find();

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: projects,
    }),
  };
};

module.exports.get_project_by_id = async (event) => {
  // get project id from url path
  const project_id = event.pathParameters.project_id
  await mongoose.connect()
  const project = await Project.findById(project_id)

  // find project in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `here is your project: ${project_id}`,
      data: project
    }),
  }
}

// UPDATE
module.exports.update_project = async (event) => {
  // get project id from url path
  const project_id = event.pathParameters.project_id

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // update project in database
  const project = await Project.findByIdAndUpdate(
    project_id,
    {
      title: body?.title,
    },
    { new: true }
  )

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `Project with id ${project_id} has been updated`,
      project: project
    }),
  }
}

// DESTROY
module.exports.delete_project = async (event) => {

  // get project id from url path
  const project_id = event.pathParameters.project_id

  // connect to database
  await mongoose.connect()

  // update project in database
  const project = await Project.findByIdAndDelete(project_id)

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `project ${project_id} has been deleted`,
      project: project
    }),
  }
}


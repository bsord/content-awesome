const mongoose = require("./db");
const ContentOutline = require("./models/contentOutline");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

// CREATE
module.exports.add_contentOutline = async (event) => {
  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // insert contentOutline to database
  const contentOutline = await ContentOutline.create({
    title: body?.title || 'title',
    teaser: body?.teaser || undefined,
    project_id: body?.project_id,
    searchTerm_id: body?.searchTerm_id || undefined
  })

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: 'ContentOutline created successfully!',
      contentOutline: contentOutline
    }),
  }
}

// READ
module.exports.get_contentOutlines = async (event) => {

  console.log(event.queryStringParameters)
  // connect to database
  await mongoose.connect();
  var contentOutlines = []
  if(event.queryStringParameters){
    contentOutlines = await ContentOutline.find(event.queryStringParameters);
  } else {
    contentOutlines = await ContentOutline.find();
  }
  

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: contentOutlines,
    }),
  };
};

module.exports.get_contentOutline_by_id = async (event) => {
  // get contentOutline id from url path
  const contentOutline_id = event.pathParameters.contentOutline_id
  await mongoose.connect()
  const contentOutline = await ContentOutline.findById(contentOutline_id)

  // find contentOutline in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `here is your contentOutline: ${contentOutline_id}`,
      data: contentOutline
    }),
  }
}

// UPDATE
module.exports.update_contentOutline = async (event) => {
  // get contentOutline id from url path
  const contentOutline_id = event.pathParameters.contentOutline_id

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect() 

  // update contentOutline in database
  const contentOutline = await ContentOutline.findByIdAndUpdate(
    contentOutline_id,
    {
      term: body?.term,
    },
    { new: true }
  )

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `ContentOutline with id ${contentOutline_id} has been updated`,
      contentOutline: contentOutline
    }),
  }
}

// DESTROY
module.exports.delete_contentOutline = async (event) => {

  // get contentOutline id from url path
  const contentOutline_id = event.pathParameters.contentOutline_id

  // connect to database
  await mongoose.connect()

  // update contentOutline in database
  const contentOutline = await ContentOutline.findByIdAndDelete(contentOutline_id)

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `contentOutline ${contentOutline_id} has been deleted`,
      contentOutline: contentOutline
    }),
  }
}


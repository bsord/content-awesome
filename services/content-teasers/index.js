const mongoose = require("./db");
const ContentTeaser = require("./models/contentTeaser");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

// CREATE
module.exports.add_contentTeaser = async (event) => {
  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // insert contentTeaser to database
  const contentTeaser = await ContentTeaser.create({
    term: body?.term || 'term',
    project_id: body?.project_id,
    searchTerm_id: body?.searchTerm_id || undefined
  })

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: 'ContentTeaser created successfully!',
      contentTeaser: contentTeaser
    }),
  }
}

// READ
module.exports.get_contentTeasers = async (event) => {

  console.log(event.queryStringParameters)
  // connect to database
  await mongoose.connect();
  var contentTeasers = []
  if(event.queryStringParameters){
    contentTeasers = await ContentTeaser.find(event.queryStringParameters);
  } else {
    contentTeasers = await ContentTeaser.find();
  }
  

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: contentTeasers,
    }),
  };
};

module.exports.get_contentTeaser_by_id = async (event) => {
  // get contentTeaser id from url path
  const contentTeaser_id = event.pathParameters.contentTeaser_id
  await mongoose.connect()
  const contentTeaser = await ContentTeaser.findById(contentTeaser_id)

  // find contentTeaser in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `here is your contentTeaser: ${contentTeaser_id}`,
      data: contentTeaser
    }),
  }
}

// UPDATE
module.exports.update_contentTeaser = async (event) => {
  // get contentTeaser id from url path
  const contentTeaser_id = event.pathParameters.contentTeaser_id

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect() 

  // update contentTeaser in database
  const contentTeaser = await ContentTeaser.findByIdAndUpdate(
    contentTeaser_id,
    {
      term: body?.term,
    },
    { new: true }
  )

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `ContentTeaser with id ${contentTeaser_id} has been updated`,
      contentTeaser: contentTeaser
    }),
  }
}

// DESTROY
module.exports.delete_contentTeaser = async (event) => {

  // get contentTeaser id from url path
  const contentTeaser_id = event.pathParameters.contentTeaser_id

  // connect to database
  await mongoose.connect()

  // update contentTeaser in database
  const contentTeaser = await ContentTeaser.findByIdAndDelete(contentTeaser_id)

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `contentTeaser ${contentTeaser_id} has been deleted`,
      contentTeaser: contentTeaser
    }),
  }
}


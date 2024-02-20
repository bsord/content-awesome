const mongoose = require("./db");
const SearchTerm = require("./models/searchTerm");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

// CREATE
module.exports.add_searchTerm = async (event) => {
  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // insert searchTerm to database
  const searchTerm = await SearchTerm.create({
    term: body?.term || 'term',
    project_id: body?.project_id,
    keyword_id: body?.keyword_id || undefined
  })

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: 'SearchTerm created successfully!',
      searchTerm: searchTerm
    }),
  }
}

// READ
module.exports.get_searchTerms = async (event) => {

  console.log(event.queryStringParameters)
  // connect to database
  await mongoose.connect();
  var searchTerms = []
  if(event.queryStringParameters){
    searchTerms = await SearchTerm.find(event.queryStringParameters);
  } else {
    searchTerms = await SearchTerm.find();
  }
  

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: searchTerms,
    }),
  };
};

module.exports.get_searchTerm_by_id = async (event) => {
  // get searchTerm id from url path
  const searchTerm_id = event.pathParameters.searchTerm_id
  await mongoose.connect()
  const searchTerm = await SearchTerm.findById(searchTerm_id)

  // find searchTerm in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `here is your searchTerm: ${searchTerm_id}`,
      data: searchTerm
    }),
  }
}

// UPDATE
module.exports.update_searchTerm = async (event) => {
  // get searchTerm id from url path
  const searchTerm_id = event.pathParameters.searchTerm_id

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // update searchTerm in database
  const searchTerm = await SearchTerm.findByIdAndUpdate(
    searchTerm_id,
    {
      term: body?.term,
    },
    { new: true }
  )

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `SearchTerm with id ${searchTerm_id} has been updated`,
      searchTerm: searchTerm
    }),
  }
}

// DESTROY
module.exports.delete_searchTerm = async (event) => {

  // get searchTerm id from url path
  const searchTerm_id = event.pathParameters.searchTerm_id

  // connect to database
  await mongoose.connect()

  // update searchTerm in database
  const searchTerm = await SearchTerm.findByIdAndDelete(searchTerm_id)

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `searchTerm ${searchTerm_id} has been deleted`,
      searchTerm: searchTerm
    }),
  }
}


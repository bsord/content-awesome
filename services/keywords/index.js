const mongoose = require("./db");
const Keyword = require("./models/keyword");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

// CREATE
module.exports.add_keyword = async (event) => {
  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // insert keyword to database
  const keyword = await Keyword.create({
    word: body?.word || 'word',
    project_id: body?.project_id
  })

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: 'Keyword created successfully!',
      keyword: keyword
    }),
  }
}

// READ
module.exports.get_keywords = async (event) => {

  console.log(event.queryStringParameters)
  // connect to database
  await mongoose.connect();
  var keywords = []
  if(event.queryStringParameters){
    keywords = await Keyword.find(event.queryStringParameters);
  } else {
    keywords = await Keyword.find();
  }
  

  // return results
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      success: true,
      data: keywords,
    }),
  };
};

module.exports.get_keyword_by_id = async (event) => {
  // get keyword id from url path
  const keyword_id = event.pathParameters.keyword_id
  await mongoose.connect()
  const keyword = await Keyword.findById(keyword_id)

  // find keyword in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `here is your keyword: ${keyword_id}`,
      data: keyword
    }),
  }
}

// UPDATE
module.exports.update_keyword = async (event) => {
  // get keyword id from url path
  const keyword_id = event.pathParameters.keyword_id

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // update keyword in database
  const keyword = await Keyword.findByIdAndUpdate(
    keyword_id,
    {
      word: body?.word,
    },
    { new: true }
  )

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `Keyword with id ${keyword_id} has been updated`,
      keyword: keyword
    }),
  }
}

// DESTROY
module.exports.delete_keyword = async (event) => {

  // get keyword id from url path
  const keyword_id = event.pathParameters.keyword_id

  // connect to database
  await mongoose.connect()

  // update keyword in database
  const keyword = await Keyword.findByIdAndDelete(keyword_id)

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `keyword ${keyword_id} has been deleted`,
      keyword: keyword
    }),
  }
}


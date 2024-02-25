const mongoose = require('./db')
const Tester = require('./models/tester')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

// CREATE
module.exports.add_tester = async (event) => {
  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // insert tester to database
  const tester = await Tester.create({
    email: body?.email,
    password: '',
  })

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: 'ok',
      tester: tester,
      input: event,
    }),
  }
}

// READ
module.exports.get_testers = async (event) => {

  var data = []

  try {
    // get event body
    var body = JSON.parse(event.body)

    // connect to database
    await mongoose.connect()

    // get testers
    const testers = await Tester.find(body.filter) // passing a bad filter in the post request should cause a failure here
    if (testers.length > 0) {
      data = testers
    }

  } catch (error) {
    console.log(error)
  }

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: null,
      testers: data,
    })
  }
  
}

module.exports.get_tester_by_id = async (event) => {
  // get tester id from url path
  const tester_id = event.pathParameters.tester_id
  await mongoose.connect()
  const tester = await Tester.findById(tester_id)

  // find tester in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `ok`,
      tester: tester,
    }),
  }
}

// UPDATE
module.exports.update_tester = async (event) => {
  // get tester id from url path
  const tester_id = event.pathParameters.tester_id

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // update tester in database
  const tester = await Tester.findByIdAndUpdate(
    tester_id,
    {
      text: body?.text,
    },
    { new: true }
  )

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `ok`,
      tester: tester,
    }),
  }
}

// DESTROY
module.exports.delete_tester = async (event) => {
  // get tester id from url path
  const tester_id = event.pathParameters.tester_id

  // connect to database
  await mongoose.connect()

  // update tester in database
  const tester = await Tester.findByIdAndDelete(tester_id)

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `ok`,
      tester: tester,
    }),
  }
}

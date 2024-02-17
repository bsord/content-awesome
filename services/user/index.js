const mongoose = require('./db')
const User = require('./models/user')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

// CREATE
module.exports.add_user = async (event) => {
  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // insert user to database
  const user = await User.create({
    email: body?.email,
    password: '',
  })

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: 'ok',
      user: user,
      input: event,
    }),
  }
}

// READ
module.exports.get_users = async (event) => {
  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // get all users
  const users = await User.find()

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: null,
      users: users,
    }),
  }
}

module.exports.get_user_by_id = async (event) => {
  // get user id from url path
  const user_id = event.pathParameters.user_id
  await mongoose.connect()
  const user = await User.findById(user_id)

  // find user in database

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `ok`,
      user: user,
    }),
  }
}

// UPDATE
module.exports.update_user = async (event) => {
  // get user id from url path
  const user_id = event.pathParameters.user_id

  // get event body
  var body = JSON.parse(event.body)

  // connect to database
  await mongoose.connect()

  // update user in database
  const user = await User.findByIdAndUpdate(
    user_id,
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
      user: user,
    }),
  }
}

// DESTROY
module.exports.delete_user = async (event) => {
  // get user id from url path
  const user_id = event.pathParameters.user_id

  // connect to database
  await mongoose.connect()

  // update user in database
  const user = await User.findByIdAndDelete(user_id)

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      message: `ok`,
      user: user,
    }),
  }
}

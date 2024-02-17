const mongoose = require('mongoose')
let isConnected

const uri = process.env['MONGO_CONNECTION_STRING']

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection')
    return Promise.resolve()
  }

  console.log('=> using new database connection')
  return mongoose.connect(uri).then((db) => {
    isConnected = db.connections[0].readyState
  })
}

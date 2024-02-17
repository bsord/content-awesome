const LocalStrategy = require('passport-local')
const User = require('.models/user')

module.exports = (passport) => {
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          // check if user exists
          const userExists = await User.findOne({ email: email })
          if (userExists) {
            return done(null, false)
          }
          // Create a new user with the user data provided
          const user = await User.create({ email, password })
          return done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )
}

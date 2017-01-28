const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options = {};

init();


passport.use(new LocalStrategy(options, (username, password, done) => {
  //checks to see if the username exists in the database.
  models.User.findAll({
    where: {
      username
    }
  })
  //if the user does not exist in the database it will return false
  .then((user) => {
    if (user[0] === undefined) {
      return done(null, false);
    }
  //if the password entered by user does not match the database password
  //return false and user is not authenticated.
    if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
      return done(null, false);
    }
  //if user exists and the passwords match then user is authenticated and can view session
     else {
      return done(null, user[0].dataValues);
     }
  })
  //logs any errors that may come up
  .catch((err) => { return done(err); });
}));


module.exports = passport;

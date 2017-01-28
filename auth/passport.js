const passport = require('passport');
const models = require('../db/models/index');


//Serialize process which grabs and stores the user info as
//a json object in a session memory.
module.exports = () => {
  passport.serializeUser((user, done) => {
  done(null, user.id);
  });


 //Deserialize process which grabs the specific user info from the
 //session memory and for the app's use.
  passport.deserializeUser((id, done) => {
    models.User.findById(id)
    .then((user) => { done(null, user);  })
    .catch((err) => { done(err, null);  });
    });
  };

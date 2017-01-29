const bcrypt = require('bcryptjs');
const models = require('../db/models/index');

//function that compares the entered password with password in
//the registered password in the database.
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

//If the user is logged in, they'll be redirected to their page and
//and we go on to the next middleware.
function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    { status: 'You are already logged in' }
  );

  return next();
}
//information entered by user is being stored in this function
function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(() => {
    res.redirect('/');
  });
}
//redirecting users that are not logged in to the log in page
function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });

  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser
}

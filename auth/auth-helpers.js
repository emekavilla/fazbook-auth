const bcrypt = require('bcryptjs');
const models = require('../db/models/index');

//function that compares the entered password with password in
//the registered password in the database.
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

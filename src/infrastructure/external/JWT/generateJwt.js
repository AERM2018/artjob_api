const jwt = require('jsonwebtoken');
module.exports = (user) => {
  const { name, email, location, phone_number } = user;
  return jwt.sign({ name, email, location, phone_number }, process.env.JWTSECRET);
};

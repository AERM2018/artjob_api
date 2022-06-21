const jwt = require('jsonwebtoken');
module.exports = (user) => {
  return jwt.sign({ ...user }, process.env.JWTSECRET);
};

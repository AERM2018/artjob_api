const { verify } = require('jsonwebtoken');
const { prepareAndSendResponse, HttpStatus } = require('../../../adapters/helpers/responseHandler');
module.exports = (req, res, next) => {
  try {
    const token = req.headers['access-token'];
    const { id } = verify(token, process.env.JWTSECRET);
    req.user_id = id;
    next();
    // prepareAndSendResponse(res, HttpStatus.UNFORBBIDEN, error, 'Invalid token!');
  } catch (error) {
    prepareAndSendResponse(res, HttpStatus.UNFORBBIDEN, error, 'Invalid token!');
  }
};

const loginUser = require('../domain/userCases/users/loginUser');
const signupUser = require('../domain/userCases/users/signupUser');
const ArtistDataSource = require('../infrastructure/external/dataSources/artistDataSource');
const UserDataSource = require('../infrastructure/external/dataSources/userDataSource');
const generateJwt = require('../infrastructure/external/JWT/generateJwt');
const { prepareAndSendDataResponse, HttpStatus, prepareAndSendResponse } = require('./helpers/responseHandler');

const authController = (userDataSource, companyDataSource, artistDataSource) => ({
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const { status, error, msg, data } = await loginUser(email, password, userDataSource);
      // When a msg is not undefined it's becasuse the credentials were wrong, and data isn't send
      if (msg && status !== HttpStatus.OK) return prepareAndSendResponse(res, status, error, msg);
      // When the login is correct, send the user data and token
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  signup: async (req, res) => {
    try {
      // the req's body contains all the user props
      const { status, error, data } = await signupUser(req.body, userDataSource, companyDataSource, artistDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },
});

module.exports = authController;

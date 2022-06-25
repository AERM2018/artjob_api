const applyToJobOffer = require('../domain/userCases/users/artist/applyToJobOffer');
const createJobOffer = require('../domain/userCases/users/company/createJobOffer');
const getJobOffersByCompany = require('../domain/userCases/users/company/getJobOffers');
const rateUser = require('../domain/userCases/users/rateUser');
const { prepareAndSendDataResponse, HttpStatus, prepareAndSendResponse } = require('./helpers/responseHandler');

const userController = (jobOffersDataSource, userDataSource) => ({
  createJobOffer: async (req, res) => {
    try {
      const { userId } = req.params;
      const { status, data } = await createJobOffer({ company_user_id: userId, ...req.body }, jobOffersDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  getJobOffersByCompany: async (req, res) => {
    try {
      const { companyUserId } = req.params;
      const { status, data } = await getJobOffersByCompany(companyUserId, jobOffersDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  applyToJobOffer: async (req, res) => {
    try {
      const { userId, jobOfferId } = req.params;
      const { status, msg } = await applyToJobOffer(userId, jobOfferId, jobOffersDataSource);
      return prepareAndSendResponse(res, status, null, msg);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  rateUser: async (req, res) => {
    try {
      const { userIdRated } = req.params;
      const { rate } = req.body;
      const { status, data } = await rateUser(rate, userIdRated, userDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  sellArt: async (req, res) => {},
});

module.exports = userController;

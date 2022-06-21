const createJobOffer = require('../domain/userCases/company/createJobOffer');
const getJobOffersByCompany = require('../domain/userCases/company/getJobOffers');
const applyToJobOffer = require('../domain/userCases/users/artist/applyToJobOffer');
const { prepareAndSendDataResponse, HttpStatus, prepareAndSendResponse } = require('./helpers/responseHandler');

const userController = (jobOffersDataSource) => ({
  createJobOffer: async (req, res) => {
    try {
      const { user } = req.body;
      const { status, data } = await createJobOffer({ company_user_id: user.id, ...req.body }, jobOffersDataSource);
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
});

module.exports = userController;

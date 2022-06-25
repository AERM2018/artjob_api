const { prepareAndSendDataResponse, HttpStatus, prepareAndSendResponse } = require('./helpers/responseHandler');
const getJobOffers = require('../domain/userCases/users/company/getJobOffers');
const getApplicationsFromJobOffer = require('../domain/userCases/users/company/getApplicationsFromJobOffer');
const acceptApplicationForJobOffer = require('../domain/userCases/users/company/acceptApplicationForJobOffer');

const jobOfferController = (jobOffersDataSource) => ({
  getJobOffers: async (req, res) => {
    try {
      const { status, data } = await getJobOffers(null, jobOffersDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  getApplicationsFromJobOffer: async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const { status, data } = await getApplicationsFromJobOffer(jobOfferId);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  acceptApplicationForJobOffer: async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { status, data } = await acceptApplicationForJobOffer(applicationId);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },
});

module.exports = jobOfferController;

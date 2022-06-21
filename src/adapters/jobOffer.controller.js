const createJobOffer = require('../domain/userCases/company/createJobOffer');
const getJobOffers = require('../domain/userCases/company/getJobOffers');
const { prepareAndSendDataResponse, HttpStatus, prepareAndSendResponse } = require('./helpers/responseHandler');

const jobOfferController = (jobOffersDataSource) => ({
  getJobOffers: async (req, res) => {
    try {
      const { status, data } = await getJobOffers(null, jobOffersDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },
});

module.exports = jobOfferController;

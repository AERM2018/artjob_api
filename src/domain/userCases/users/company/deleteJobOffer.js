const { HttpStatus } = require('../../../../adapters/helpers/responseHandler');
const JobOfferDataSource = require('../../../../infrastructure/external/dataSources/jobOfferDataSource');

module.exports = async (jobOfferId, jobOfferDataSource = new JobOfferDataSource()) => {
  await jobOfferDataSource.deleteJobOffer(jobOfferId);
  return { status: HttpStatus.NO_CONTENT };
};

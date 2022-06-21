const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const JobOfferDataSource = require('../../../infrastructure/external/dataSources/jobOfferDataSource');

module.exports = async (companyUserId, jobOfferDataSource = new JobOfferDataSource()) => {
  const jobOffers = await jobOfferDataSource.getJobOffers(companyUserId);
  return { status: HttpStatus.OK, data: { job_offers: jobOffers } };
};

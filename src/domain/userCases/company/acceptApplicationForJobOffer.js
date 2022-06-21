const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const JobOfferDataSource = require('../../../infrastructure/external/dataSources/jobOfferDataSource');

module.exports = async (applicationId, jobOfferDataSource = new JobOfferDataSource()) => {
  const jobOfferId = await jobOfferDataSource.acceptApplicationForJobOffer(applicationId);
  const jobOffer = await jobOfferDataSource.getJobOfferById(jobOfferId);
  return { status: HttpStatus.OK, data: { job_offer: jobOffer } };
};

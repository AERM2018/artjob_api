const { HttpStatus } = require('../../../../adapters/helpers/responseHandler');
const JobOfferDataSource = require('../../../../infrastructure/external/dataSources/jobOfferDataSource');

module.exports = async (jobOfferId, jobOfferDataSource = new JobOfferDataSource()) => {
  await jobOfferDataSource.deleteProspectFromJobOffer(jobOfferId);
  const jobOfferUpdated = await jobOfferDataSource.getJobOfferById(jobOfferId);
  return { status: HttpStatus.OK, data: { job_offer: jobOfferUpdated } };
};

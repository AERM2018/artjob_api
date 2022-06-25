const { HttpStatus } = require('../../../../adapters/helpers/responseHandler');
const JobOfferDataSource = require('../../../../infrastructure/external/dataSources/jobOfferDataSource');

module.exports = async (jobOffer, jobOfferDataSource = new JobOfferDataSource()) => {
  const jobOfferId = await jobOfferDataSource.createJobOffer(jobOffer);
  const jobOfferSaved = await jobOfferDataSource.getJobOfferById(jobOfferId);
  return { status: HttpStatus.OK, data: jobOfferSaved };
};

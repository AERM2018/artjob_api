const { HttpStatus } = require('../../../../adapters/helpers/responseHandler');
const JobOfferDataSource = require('../../../../infrastructure/external/dataSources/jobOfferDataSource');

module.exports = async (jobOfferId, jobOfferDataSource = new JobOfferDataSource()) => {
  const jobOfferApplications = await jobOfferDataSource.showApplicationsFromJobOffer(jobOfferId);
  return { status: HttpStatus.OK, data: { applications: jobOfferApplications } };
};

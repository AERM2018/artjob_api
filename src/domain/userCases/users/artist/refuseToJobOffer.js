const { HttpStatus } = require('../../../../adapters/helpers/responseHandler');
const JobOfferDataSource = require('../../../../infrastructure/external/dataSources/jobOfferDataSource');

module.exports = async (userId, jobOfferId, jobOfferDataSource = new JobOfferDataSource()) => {
  await jobOfferDataSource.deleteApplicationFromJobOffer(userId, jobOfferId);
  return { status: HttpStatus.OK, msg: 'Tu aplicación para la oferta de trabajo ha sido eliminada.' };
};

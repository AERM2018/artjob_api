const { HttpStatus } = require('../../../../adapters/helpers/responseHandler');
const JobOfferDataSource = require('../../../../infrastructure/external/dataSources/jobOfferDataSource');

module.exports = async (artistUserId, jobOfferId, jobOfferDataSource = new JobOfferDataSource()) => {
  await jobOfferDataSource.addProspectToJobOffer(artistUserId, jobOfferId);
  return { status: HttpStatus.OK, msg: 'Has aplicado a la oferta correctamente' };
};

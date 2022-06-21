const jobOfferController = require('../../../adapters/jobOffer.controller');
const JobOfferDataSource = require('../../external/dataSources/jobOfferDataSource');
const validateJWT = require('../middlewares/validateJWT');

const jobOfferRouter = (router) => {
  const controller = jobOfferController(new JobOfferDataSource());
  router.get('/job_offers', [validateJWT], controller.getJobOffers);
  router.get('/job_offers/:jobOfferId/applications', [validateJWT], controller.getApplicationsFromJobOffer);
  router.patch(
    '/job_offers/:jobOfferId/applications/:applicationId',
    [validateJWT],
    controller.acceptApplicationForJobOffer,
  );
};
module.exports = jobOfferRouter;

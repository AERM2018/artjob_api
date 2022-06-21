const jobOfferController = require('../../../adapters/jobOffer.controller');
const JobOfferDataSource = require('../../external/dataSources/jobOfferDataSource');
const validateJWT = require('../middlewares/validateJWT');

const jobOfferRouter = (router) => {
  const controller = jobOfferController(new JobOfferDataSource());
  router.get('/job_offers', [validateJWT], controller.getJobOffers);
};
module.exports = jobOfferRouter;

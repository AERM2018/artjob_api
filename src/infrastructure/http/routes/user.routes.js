const userController = require('../../../adapters/user.controlller');
const JobOfferDataSource = require('../../external/dataSources/jobOfferDataSource');
const validateJWT = require('../middlewares/validateJWT');

const userRouter = (router) => {
  const controller = userController(new JobOfferDataSource());
  router.get('/users/:userId/job_offers', [validateJWT], controller.getJobOffersByCompany);
  router.post('/users/:userId/job_offers', [validateJWT], controller.createJobOffer);
  router.post('/users/:userId/job_offers/:jobOfferId', [validateJWT], controller.applyToJobOffer);
};
module.exports = userRouter;

const uploadImage = require('../middlewares/uploadImage');
const userController = require('../../../adapters/user.controlller');
const ArtSellDataSource = require('../../external/dataSources/artSellDataSource');
const JobOfferDataSource = require('../../external/dataSources/jobOfferDataSource');
const UserDataSource = require('../../external/dataSources/userDataSource');
const validateJWT = require('../middlewares/validateJWT');
const ArtistDataSource = require('../../external/dataSources/artistDataSource');
const CompanyDataSource = require('../../external/dataSources/companyDataSource');
const {
  deleteOldArtSellImage,
  isSellerUserFromArtSell,
  isArtSellSold,
  isCompanyUserFromJobOffer,
  hasJobOfferProspectChosen,
  deleteOldArtistPortafolioImage,
} = require('../middlewares/dbValidations');

const userRouter = (router) => {
  const controller = userController(
    new JobOfferDataSource(),
    new UserDataSource(),
    new ArtSellDataSource(),
    new ArtistDataSource(),
    new CompanyDataSource(),
  );
  // User info
  router.put('/users/:userId', [validateJWT], controller.updateUser);

  // Portafolio
  router.post(
    '/users/:userId/portafolio',
    [validateJWT, uploadImage.single('artist_portafolio'), deleteOldArtistPortafolioImage],
    controller.uploadArtistPortafolio,
  );

  // Job offers
  router.get('/users/:userId/job_offers', [validateJWT], controller.getJobOffersByCompany);
  router.post('/users/:userId/job_offers', [validateJWT], controller.createJobOffer);
  router.post('/users/:userId/job_offers/:jobOfferId', [validateJWT], controller.applyToJobOffer);
  router.delete('/users/:userId/job_offers/:jobOfferId/refuse', [validateJWT], controller.refuseToJobOffer);
  router.patch(
    '/users/:userId/job_offers/:jobOfferId',
    [validateJWT, isCompanyUserFromJobOffer],
    controller.updateJobOffer,
  );
  router.delete(
    '/users/:userId/job_offers/:jobOfferId/prospect',
    [validateJWT, isCompanyUserFromJobOffer],
    controller.deleteProspectFromJobOffer,
  );
  router.delete(
    '/users/:userId/job_offers/:jobOfferId',
    [validateJWT, isCompanyUserFromJobOffer, hasJobOfferProspectChosen],
    controller.deleteJobOffer,
  );
  // Rating users
  router.patch('/users/:userIdRated/rate', controller.rateUser);
  // Sell art
  router.post('/users/:sellerUserId/art_sells', uploadImage.single('art_sell_img'), controller.sellArt);
  router.patch(
    '/users/:sellerUserId/art_sells/:artSellId',
    [isSellerUserFromArtSell, uploadImage.single('art_sell_img'), deleteOldArtSellImage],
    controller.updateArtSell,
    router.delete(
      '/users/:sellerUserId/art_sells/:artSellId',
      [isSellerUserFromArtSell, isArtSellSold],
      controller.deleteArtSell,
    ),
  );
  // Buy art
  router.patch('/users/:buyerUserId/art_sells/:artSellId', controller.buyArt);
};
module.exports = userRouter;

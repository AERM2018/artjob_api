const applyToJobOffer = require('../domain/userCases/users/artist/applyToJobOffer');
const refuseToJobOffer = require('../domain/userCases/users/artist/refuseToJobOffer');
const uploadPortafolio = require('../domain/userCases/users/artist/uploadPortafolio');
const buyArtSell = require('../domain/userCases/users/buyArtSell');
const createJobOffer = require('../domain/userCases/users/company/createJobOffer');
const deleteJobOffer = require('../domain/userCases/users/company/deleteJobOffer');
const deleteProspectFromJobOffer = require('../domain/userCases/users/company/deleteProspectFromJobOffer');
const getJobOffersByCompany = require('../domain/userCases/users/company/getJobOffers');
const updateJobOffer = require('../domain/userCases/users/company/updateJobOffer');
const createArtSell = require('../domain/userCases/users/createArtSell');
const deleteArtSell = require('../domain/userCases/users/deleteArtSell');
const rateUser = require('../domain/userCases/users/rateUser');
const updateArtSell = require('../domain/userCases/users/updateArtSell');
const updateUser = require('../domain/userCases/users/updateUser');
const { prepareAndSendDataResponse, HttpStatus, prepareAndSendResponse } = require('./helpers/responseHandler');

const userController = (
  jobOffersDataSource,
  userDataSource,
  artSellDataSource,
  artistDataSource,
  companyDataSource,
) => ({
  // User
  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const { status, data } = await updateUser(userId, req.body, userDataSource, companyDataSource, artistDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  deleteUser: async (req, res) => {
    // FIXME: PUT THE RIGHT LOGIC
    try {
      const { userId } = req.params;
      const { status, data } = await createJobOffer({ company_user_id: userId, ...req.body }, jobOffersDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  // Portafolio
  uploadArtistPortafolio: async (req, res) => {
    try {
      const { userId } = req.params;
      const { image_url } = req.body;
      const { status, data } = await uploadPortafolio(userId, image_url, userDataSource, artistDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },
  // Job offers
  createJobOffer: async (req, res) => {
    try {
      const { userId } = req.params;
      const { status, data } = await createJobOffer({ company_user_id: userId, ...req.body }, jobOffersDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  getJobOffersByCompany: async (req, res) => {
    try {
      const { companyUserId } = req.params;
      const { status, data } = await getJobOffersByCompany(companyUserId, jobOffersDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  applyToJobOffer: async (req, res) => {
    try {
      const { userId, jobOfferId } = req.params;
      const { status, msg } = await applyToJobOffer(userId, jobOfferId, jobOffersDataSource);
      return prepareAndSendResponse(res, status, null, msg);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  refuseToJobOffer: async (req, res) => {
    try {
      const { userId, jobOfferId } = req.params;
      const { status, msg } = await refuseToJobOffer(userId, jobOfferId, jobOffersDataSource);
      return prepareAndSendResponse(res, status, null, msg);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  updateJobOffer: async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const { status, data } = await updateJobOffer(jobOfferId, req.body, jobOffersDataSource);
      return prepareAndSendResponse(res, status, null, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  deleteProspectFromJobOffer: async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const { status, data } = await deleteProspectFromJobOffer(jobOfferId, jobOffersDataSource);
      return prepareAndSendResponse(res, status, null, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  deleteJobOffer: async (req, res) => {
    try {
      const { jobOfferId } = req.params;
      const { status } = await deleteJobOffer(jobOfferId, jobOffersDataSource);
      return prepareAndSendResponse(res, status, null);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  // Rating
  rateUser: async (req, res) => {
    try {
      const { userIdRated } = req.params;
      const { rate } = req.body;
      const { status, data } = await rateUser(rate, userIdRated, userDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  // Art sells
  sellArt: async (req, res) => {
    try {
      const { sellerUserId } = req.params;
      const { status, data } = await createArtSell({ ...req.body, seller_user_id: sellerUserId });
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  updateArtSell: async (req, res) => {
    try {
      const { artSellId } = req.params;
      const { status, data } = await updateArtSell(
        artSellId,
        { ...req.body },
        artSellDataSource,
        artistDataSource,
        companyDataSource,
      );
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  deleteArtSell: async (req, res) => {
    try {
      const { artSellId } = req.params;
      const { status } = await deleteArtSell(artSellId);
      return prepareAndSendDataResponse(res, status);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },

  buyArt: async (req, res) => {
    try {
      const { buyerUserId, artSellId } = req.params;
      const { status, data } = await buyArtSell(
        artSellId,
        buyerUserId,
        artSellDataSource,
        artistDataSource,
        companyDataSource,
      );
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },
});

module.exports = userController;

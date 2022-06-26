const getArtSells = require('../domain/userCases/users/getArtSells');
const { prepareAndSendDataResponse, prepareAndSendResponse, HttpStatus } = require('./helpers/responseHandler');

const ArtSellController = (artSellController, artistDataSource, companyDataSource) => ({
  getArtSells: async (req, res) => {
    try {
      const { status, data } = await getArtSells(artSellController, artistDataSource, companyDataSource);
      return prepareAndSendDataResponse(res, status, data);
    } catch (error) {
      return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
    }
  },
});

module.exports = ArtSellController;

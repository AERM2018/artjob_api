const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const ArtSellDataSource = require('../../../infrastructure/external/dataSources/artSellDataSource');
const deleteArtSellImage = require('../../common/deleteStoredImage');
module.exports = async (artSellId, artSellDataSource = new ArtSellDataSource()) => {
  const { image_url } = await artSellDataSource.getArtSellById(artSellId);
  await artSellDataSource.deleteArtSell(artSellId);
  deleteArtSellImage(image_url);
  // Return new art sell instance
  return { status: HttpStatus.NO_CONTENT };
};

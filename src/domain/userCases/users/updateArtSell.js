const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const ArtSellDataSource = require('../../../infrastructure/external/dataSources/artSellDataSource');
const getUserExtraInfo = require('../../common/getUserExtraInfo');
const artSellSerializer = require('../../serializers/artSellSerializer');

module.exports = async (
  artSellId,
  artSell,
  artSellDataSource = new ArtSellDataSource(),
  artistDataSource,
  companyDataSource,
) => {
  await artSellDataSource.updateArtSell(artSellId, artSell);
  let newArtSell = await artSellDataSource.getArtSellById(artSellId);
  // Get seller and buyer user info
  newArtSell.seller.details = await getUserExtraInfo(newArtSell.seller, artistDataSource, companyDataSource);
  if (newArtSell.buyer)
    newArtSell.buyer.details = await getUserExtraInfo(newArtSell.buyer, artistDataSource, companyDataSource);
  newArtSell = artSellSerializer(newArtSell);
  // Return art sell instance updated
  return { status: HttpStatus.OK, data: { art_sell: newArtSell } };
};

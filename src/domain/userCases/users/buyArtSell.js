const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const ArtSellDataSource = require('../../../infrastructure/external/dataSources/artSellDataSource');
const getUserExtraInfo = require('../../common/getUserExtraInfo');
const artSellSerializer = require('../../serializers/artSellSerializer');

module.exports = async (
  artSellId,
  buyerUserId,
  artSellDataSource = new ArtSellDataSource(),
  artistDataSource,
  companyDataSource,
) => {
  await artSellDataSource.buyArtSell(artSellId, buyerUserId);
  let artSell = await artSellDataSource.getArtSellById(artSellId);
  // Join user seller info
  artSell.seller.details = await getUserExtraInfo(artSell.seller, artistDataSource, companyDataSource);
  // Join user buyer info
  if (artSell.buyer) artSell.buyer.details = await getUserExtraInfo(artSell.buyer, artistDataSource, companyDataSource);
  artSell = artSellSerializer(artSell);
  return { status: HttpStatus.OK, data: { art_sell: artSell } };
};

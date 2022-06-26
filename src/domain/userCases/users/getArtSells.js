const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const ArtSellDataSource = require('../../../infrastructure/external/dataSources/artSellDataSource');
const getUserExtraInfo = require('../../common/getUserExtraInfo');
const artSellSerializer = require('../../serializers/artSellSerializer');

module.exports = async (artSellDataSource = new ArtSellDataSource(), artistDataSource, companyDataSource) => {
  let artSells = await artSellDataSource.getArtSells();
  // Get user info about the seller and buyer
  artSells = await Promise.all(
    artSells.map(async (artSell) => {
      artSell.seller.details = await getUserExtraInfo(artSell.seller, artistDataSource, companyDataSource);
      if (artSell.buyer)
        artSell.buyer.details = await getUserExtraInfo(artSell.buyer, artistDataSource, companyDataSource);
      return artSellSerializer(artSell);
    }),
  );
  // Return new art sell instance
  return { status: HttpStatus.OK, data: { art_sells: artSells } };
};

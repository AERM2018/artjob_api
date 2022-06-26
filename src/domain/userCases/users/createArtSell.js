const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const ArtSellDataSource = require('../../../infrastructure/external/dataSources/artSellDataSource');

module.exports = async (artSell, artSellDataSource = new ArtSellDataSource()) => {
  const newArtSell = await artSellDataSource.createArtSell(artSell);
  // Return new art sell instance
  return { status: HttpStatus.OK, data: { ok: 'ok' } };
};

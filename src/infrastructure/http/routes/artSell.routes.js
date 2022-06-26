const ArtSellController = require('../../../adapters/artSell.controller');
const ArtistDataSource = require('../../external/dataSources/artistDataSource');
const ArtSellDataSource = require('../../external/dataSources/artSellDataSource');
const CompanyDataSource = require('../../external/dataSources/companyDataSource');
const validateJWT = require('../middlewares/validateJWT');

const artSellRouter = (router) => {
  const controller = ArtSellController(new ArtSellDataSource(), new ArtistDataSource(), new CompanyDataSource());
  router.get('/art_sells', [validateJWT], controller.getArtSells);
};
module.exports = artSellRouter;

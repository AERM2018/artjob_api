const authController = require('../../../adapters/auth.controller');
const ArtistDataSource = require('../../external/dataSources/artistDataSource');
const CompanyDataSource = require('../../external/dataSources/companyDataSource');
const UserDataSource = require('../../external/dataSources/userDataSource');

const authRouter = (router) => {
  const controller = authController(new UserDataSource(), new CompanyDataSource(), new ArtistDataSource());
  router.post('/auth/login', controller.login);
  router.post('/auth/signup', controller.signup);
};
module.exports = authRouter;

const authController = require('../../../adapters/auth.controller');
const UserDataSource = require('../../external/dataSources/userDataSource');

const authRouter = (router) => {
  const controller = authController(new UserDataSource());
  router.post('/auth/login', controller.login);
  router.post('/auth/signup', controller.signup);
};
module.exports = authRouter;

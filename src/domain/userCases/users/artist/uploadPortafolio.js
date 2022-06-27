const { HttpStatus } = require('../../../../adapters/helpers/responseHandler');
const getUserExtraInfo = require('../../../common/getUserExtraInfo');
const serializeUser = require('../../../serializers/userSerializer');

module.exports = async (userId, image_url, userDataSource, artistDataSource) => {
  await artistDataSource.uploadPortafolioImage(userId, image_url);
  let user = await userDataSource.getUserById(userId);
  user.details = await getUserExtraInfo(user, artistDataSource);
  user = serializeUser(user);
  return { status: HttpStatus.OK, data: { user } };
};

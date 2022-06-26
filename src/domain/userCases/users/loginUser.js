const bcrypt = require('bcrypt');
const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const generateJwt = require('../../../infrastructure/external/JWT/generateJwt');
const getUserExtraInfo = require('../../common/getUserExtraInfo');
const serializeUser = require('../../serializers/userSerializer');

module.exports = async (email, password, userDataSource, artistDataSource, companyDataSource) => {
  let user = await userDataSource.getUserByEmail(email);
  if (!user) {
    return { status: HttpStatus.NOT_FOUND, error: null, msg: `The credentials are wrong!.` };
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return { status: HttpStatus.NOT_FOUND, error: null, msg: `The credentials are wrong.` };
  }
  user.details = await getUserExtraInfo(user, artistDataSource, companyDataSource);
  user = serializeUser(user);
  const { password: passwordDB, created_at, updated_at, rate, description, ...restUser } = user;
  return { status: HttpStatus.OK, error: null, data: { user: restUser, token: generateJwt(restUser) } };
};

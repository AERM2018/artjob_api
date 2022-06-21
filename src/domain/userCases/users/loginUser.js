const bcrypt = require('bcrypt');
const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const generateJwt = require('../../../infrastructure/external/JWT/generateJwt');

module.exports = async (email, password, userDataSource) => {
  const user = await userDataSource.getUserByEmail(email);
  if (!user) {
    return { status: HttpStatus.NOT_FOUND, error: null, msg: `The credentials are wrong.` };
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return { status: HttpStatus.NOT_FOUND, error: null, msg: `The credentials are wrong.` };
  }
  const { password: passwordDB, created_at, updated_at, rate, description, ...restUser } = user;
  return { status: HttpStatus.OK, error: null, data: { user: restUser, token: generateJwt(restUser) } };
};

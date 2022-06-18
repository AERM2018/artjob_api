const { HttpStatus } = require('../../../adapters/helpers/responseHandler');

module.exports = async (user, userDataSource) => {
  const newUser = await userDataSource.signUpUser(user);
  return { status: HttpStatus.CREATED, error: null, data: { user: newUser } };
};

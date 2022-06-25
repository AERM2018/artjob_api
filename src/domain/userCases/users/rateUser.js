const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const UserDataSource = require('../../../infrastructure/external/dataSources/userDataSource');

module.exports = async (rate, userIdRated, userDataSource = new UserDataSource()) => {
  let user;
  // The user id is from who is rated
  user = await userDataSource.getUserById(userIdRated);
  const newRate = parseFloat(((user.rate + rate) / 2).toFixed(2));
  await userDataSource.rateUser(newRate, userIdRated);
  // Return the user instance updated
  user = await userDataSource.getUserById(userIdRated);
  const { created_at, password, ...restUser } = user;
  return { status: HttpStatus.OK, data: { user: restUser } };
};

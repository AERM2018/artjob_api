const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const ArtistDataSource = require('../../../infrastructure/external/dataSources/artistDataSource');
const CompanyDataSource = require('../../../infrastructure/external/dataSources/companyDataSource');
const getUserExtraInfo = require('../../common/getUserExtraInfo');
const serializeUser = require('../../serializers/userSerializer');

module.exports = async (
  userId,
  user,
  userDataSource,
  companyDataSource = new CompanyDataSource(),
  artistDataSource = new ArtistDataSource(),
) => {
  console.log('user', user);
  const { address, experience, ...restUser } = user;
  const { type, id } = await userDataSource.updateUser(userId, restUser);
  if (type === 'artist') {
    // update artist instance with user id
    await artistDataSource.updateArtist(id, experience);
  } else {
    // update company instance with user id
    await companyDataSource.updateCompany(id, address);
  }
  let userUpdated = await userDataSource.getUserById(id);
  userUpdated.details = await getUserExtraInfo(userUpdated, artistDataSource, companyDataSource);
  const {
    password: passwordDB,
    created_at,
    updated_at,
    rate,
    description,
    ...restUserUpdated
  } = serializeUser(userUpdated);
  return { status: HttpStatus.CREATED, error: null, data: { user: restUserUpdated } };
};

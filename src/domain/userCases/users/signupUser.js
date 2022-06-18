const { HttpStatus } = require('../../../adapters/helpers/responseHandler');
const ArtistDataSource = require('../../../infrastructure/external/dataSources/artistDataSource');
const CompanyDataSource = require('../../../infrastructure/external/dataSources/companyDataSource');

module.exports = async (
  user,
  userDataSource,
  companyDataSource = new CompanyDataSource(),
  artistDataSource = new ArtistDataSource(),
) => {
  const { address, experience, ...restUser } = user;
  const userId = await userDataSource.signUpUser(restUser);
  if (user.type === 'artist') {
    // create artist instance with user id
    await artistDataSource.createArtist(userId, experience);
  } else {
    // create company instance with user id
    await companyDataSource.createCompany(userId, address);
  }
  // TODO: get new user with user id including the extra info depending on its type
  const newUser = await userDataSource.getUserById(userId);
  return { status: HttpStatus.CREATED, error: null, data: { user: newUser } };
};

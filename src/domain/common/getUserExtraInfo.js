module.exports = async (user, artistDataSource, companyDataSource) => {
  let userDetails;
  switch (user.type) {
    case 'artist':
      userDetails = await artistDataSource.getArtistInfo(user.id);
      break;
    case 'company':
      userDetails = await companyDataSource.getCompanyInfo(user.id);
      break;
  }
  return userDetails;
};

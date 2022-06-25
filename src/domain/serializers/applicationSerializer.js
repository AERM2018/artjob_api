const serializeUser = require('./userSerializer');

module.exports = (application) => {
  if (!application) return null;

  const { created_at, updated_at, password, type, id, ...restUser } = serializeUser(application.User);
  return {
    id: application.toJSON().id,
    is_hired: application.toJSON().is_hired,
    artist: { user_id: id, ...restUser },
    created_at: application.toJSON().created_at,
    updated_at: application.toJSON().updated_at,
  };
};

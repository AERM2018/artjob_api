const serializeUser = require('./userSerializer');

module.exports = (application) => {
  if (!application) return null;

  const { created_at, updated_at, password, type, ...restApplication } = serializeUser(application.User);
  return {
    id: application.toJSON().id,
    is_hired: application.toJSON().is_hired,
    user: restApplication,
    created_at: application.toJSON().created_at,
    updated_at: application.toJSON().updated_at,
  };
};

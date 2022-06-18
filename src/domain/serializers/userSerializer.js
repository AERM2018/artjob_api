module.exports = (user) => {
  if (!user) return null;
  return {
    id: user.toJSON().id,
    email: user.toJSON().email,
    description: user.toJSON().description,
    rate: user.toJSON().rate,
    phone_number: user.toJSON().phone_number,
    location: user.toJSON().location,
    password: user.toJSON().password,
    created_at: user.toJSON().created_at,
    updated_at: user.toJSON().updated_at,
  };
};

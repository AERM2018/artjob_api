const serializeUser = (user) => {
  if (!user) return null;

  const userDetails = serializeUserDetails(user.details);
  return {
    id: user.toJSON().id,
    type: user.toJSON().type,
    name: user.toJSON().name,
    email: user.toJSON().email,
    description: user.toJSON().description,
    rate: user.toJSON().rate,
    phone_number: user.toJSON().phone_number,
    location: user.toJSON().location,
    password: user.toJSON().password,
    ...userDetails,
    created_at: user.toJSON().created_at,
    updated_at: user.toJSON().updated_at,
  };
};

const serializeUserDetails = (details) => {
  if (!details) return null;
  let portafolioDetails;
  if (details.portafolio) {
    portafolioDetails = {
      id: portafolio.toJSON().id,
      image_url: portafolio.toJSON().image_url,
      created_at: user.toJSON().created_at,
      updated_at: user.toJSON().updated_at,
    };
  }
  return {
    address: details.toJSON().address,
    experience: details.toJSON().experience,
    portafolio: details.portafolio ? portafolioDetails : undefined,
  };
};

module.exports = serializeUser;

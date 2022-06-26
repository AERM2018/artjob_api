const serializeUser = require('./userSerializer');

const serializeBuyer = (buyer) => {
  if (!buyer) return null;
  const { created_at, updated_at, password, location, id, description, ...restUser } = serializeUser(buyer);
  return restUser;
};
module.exports = (artSell) => {
  console.log('artsell', artSell);
  const { created_at, updated_at, password, location, id, description, ...restUser } = serializeUser(artSell.seller);
  return {
    id: artSell.toJSON().id,
    description: artSell.toJSON().description,
    price: artSell.toJSON().price,
    is_sold: artSell.toJSON().is_sold,
    seller: { user_id: id, ...restUser },
    buyer: serializeBuyer(artSell.buyer),
    created_at: artSell.toJSON().created_at,
    updated_at: artSell.toJSON().updated_at,
    image_url: artSell.toJSON().image_url,
  };
};

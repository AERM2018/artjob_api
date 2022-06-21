const applicationSerializer = require('./applicationSerializer');
const serializeUser = require('./userSerializer');

const applicationJobOffer = (jobOffer) => {
  if (!jobOffer) return null;
  const companyInfo = serializeCompanyInfo(jobOffer.company);
  const artistInfo = jobOffer.has_prospect_chosen ? applicationSerializer(jobOffer.application).user : undefined;
  return {
    id: jobOffer.toJSON().id,
    description: jobOffer.toJSON().description,
    revenue: jobOffer.toJSON().revenue,
    has_prospect_chosen: jobOffer.toJSON().has_prospect_chosen,
    company: { ...companyInfo },
    artist: { ...artistInfo },
    created_at: jobOffer.toJSON().created_at,
    updated_at: jobOffer.toJSON().updated_at,
  };
};

const serializeCompanyInfo = (company) => {
  if (!company) return null;
  const { name, address, id: user_id } = serializeUser(company);
  return { name, address, user_id };
};
module.exports = applicationJobOffer;

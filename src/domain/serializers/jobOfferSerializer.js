const serializeUser = require('./userSerializer');

const serializeJobOffer = (jobOffer) => {
  if (!jobOffer) return null;
  const companyInfo = serializeCompanyInfo(jobOffer.company);
  return {
    id: jobOffer.toJSON().id,
    description: jobOffer.toJSON().description,
    revenue: jobOffer.toJSON().revenue,
    has_prospect_chosen: jobOffer.toJSON().has_prospect_chosen,
    company: { ...companyInfo },
    created_at: jobOffer.toJSON().created_at,
    updated_at: jobOffer.toJSON().updated_at,
  };
};

const serializeCompanyInfo = (company) => {
  if (!company) return null;
  const { name, address, id: user_id } = serializeUser(company);
  return { name, address, user_id };
};
module.exports = serializeJobOffer;

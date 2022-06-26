const db = require('../../storage/pgsql/models');
const fs = require('fs');
const path = require('path');
const { prepareAndSendResponse, HttpStatus } = require('../../../adapters/helpers/responseHandler');
const deleteArtSellImage = require('../../../domain/common/deleteArtSellImage');
const isSellerUserFromArtSell = async (req, res, next) => {
  try {
    const { sellerUserId, artSellId } = req.params;
    const { seller_user_id } = await db.Art_sell.findByPk(artSellId);
    if (sellerUserId !== seller_user_id) {
      return prepareAndSendResponse(
        res,
        HttpStatus.UNFORBBIDEN,
        null,
        'Only the user who is selling this art is able to modify it.',
      );
    }
    next();
  } catch (error) {
    return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
  }
};

const deleteOldArtSellImage = async (req, res, next) => {
  try {
    const { artSellId } = req.params;
    const { image_url } = await db.Art_sell.findByPk(artSellId);
    deleteArtSellImage(image_url);
    next();
  } catch (error) {
    return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
  }
};

const isArtSellSold = async (req, res, next) => {
  try {
    const { artSellId } = req.params;
    const { is_sold } = await db.Art_sell.findByPk(artSellId);
    if (is_sold) {
      return prepareAndSendResponse(
        res,
        HttpStatus.UNFORBBIDEN,
        null,
        "The art sell can't be deleted since it's currently sold.",
      );
    }
    next();
  } catch (error) {
    return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
  }
};

const isCompanyUserFromJobOffer = async (req, res, next) => {
  try {
    const { userId, jobOfferId } = req.params;
    const { company_user_id } = await db.Job_offer.findByPk(jobOfferId);
    if (company_user_id !== userId) {
      return prepareAndSendResponse(
        res,
        HttpStatus.UNFORBBIDEN,
        null,
        'Only the user who is made this job offer is able to modify it.',
      );
    }
    next();
  } catch (error) {
    return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
  }
};

const hasJobOfferProspectChosen = async (req, res, next) => {
  try {
    const { jobOfferId } = req.params;
    const { has_prospect_chosen } = await db.Job_offer.findByPk(jobOfferId);
    if (has_prospect_chosen) {
      return prepareAndSendResponse(
        res,
        HttpStatus.UNFORBBIDEN,
        null,
        "The job offer can't be deleted since it has prospect chosen already",
      );
    }
    next();
  } catch (error) {
    return prepareAndSendResponse(res, HttpStatus.SERVER_ERROR, error);
  }
};

module.exports = {
  isSellerUserFromArtSell,
  deleteOldArtSellImage,
  isArtSellSold,
  isCompanyUserFromJobOffer,
  hasJobOfferProspectChosen,
};

const asyncHandler = require('express-async-handler');
const { formattedValidationResult } = require('../utils/formatter.util');
const HTTP_STATUS = require('../enums/http-status.enum');
const responseUtil = require('../utils/response.util');
const donationService = require('../services/donation.service');

exports.listing = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    return responseUtil.getResponse(true);
});

exports.details = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true));
});

exports.create = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Donation created successfully'));
});

exports.update = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Donation updated successfully'));
});
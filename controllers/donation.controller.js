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

    const data = await donationService.getListing(req.params.pageNumber, req.query.keyword);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});

exports.details = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    const data = await donationService.getDetails(req.params.id);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});

exports.create = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    await donationService.createRecord(req.body);

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

    await donationService.updateRecord(req.params.id, req.body);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Donation updated successfully'));
});
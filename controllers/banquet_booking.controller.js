const asyncHandler = require('express-async-handler');
const banquetBookingService = require('../services/banquet_booking.service');
const HTTP_STATUS = require('../enums/http-status.enum');
const responseUtil = require('../utils/response.util');
const { formattedValidationResult } = require('../utils/formatter.util');

exports.listing = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    const data = await banquetBookingService.getListing(req.params.pageNumber, req.query.keyword);

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

    const data = await banquetBookingService.getDetails(req.params.id);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, null, data));
});
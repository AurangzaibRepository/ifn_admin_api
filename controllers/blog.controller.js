const asyncHandler = require('express-async-handler');
const HTTP_STATUS = require('../enums/http-status.enum');
const responseUtil = require('../utils/response.util');
const blogService = require('../services/blog.service');
const { formattedValidationResult } = require('../utils/formatter.util');

exports.listing = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    const data = await blogService.getListing(req.params.pageNumber, req.query.keyword);

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

    const data = await blogService.getDetails(req.params.id);

    return data;
});

exports.create = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }
    
    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Blog created successfully'));
});

exports.update = asyncHandler(async(req, res) => {
        // Check errors
        const errors = formattedValidationResult(req);

        if (! errors.isEmpty()) {
            return res.status(HTTP_STATUS.BAD_REQUEST)
                .json(responseUtil.getResponse(false, errors.array()));
        }
        
        return res.status(HTTP_STATUS.OK)
            .json(responseUtil.getResponse(true, 'Blog updated successfully'));
});
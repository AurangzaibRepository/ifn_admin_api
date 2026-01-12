const asyncHandler = require('express-async-handler');
const HTTP_STATUS = require('../enums/http-status.enum');
const responseUtil = require('../utils/response.util');
const pollingService = require('../services/polling.service');
const { formattedValidationResult } = require('../utils/formatter.util');

exports.listing = asyncHandler(async (req, res) => {
    // Check errors
    const errors = formattedValidationResult(req);

    if (! errors.isEmpty()) {
        return res.status(HTTP_STATUS.BAD_REQUEST)
            .json(responseUtil.getResponse(false, errors.array()));
    }

    const data = await pollingService.getListing(req.params.pageNumber, req.query.keyword);

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

    const data = await pollingService.getDetails(req.params.id);

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

    const data = await pollingService.createRecord(req.body);

    return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Polling created successfully', data));
});

exports.update = asyncHandler(async (req, res) => {
      // Check errors
      const errors = formattedValidationResult(req);

      if (! errors.isEmpty()) {
          return res.status(HTTP_STATUS.BAD_REQUEST)
              .json(responseUtil.getResponse(false, errors.array()));
      }

      await pollingService.updateRecord(req.params.id, req.body);

      return res.status(HTTP_STATUS.OK)
        .json(responseUtil.getResponse(true, 'Polling updated successfully'));
});
const { param, body } = require('express-validator');
const pollingService = require('../services/polling.service');

exports.listingValidator = [
    param('pageNumber', 'Page number must be numeric')
        .isInt()
];

exports.detailsValidator = [
    param('id', 'Id must numeric')
        .isInt().bail()
        .custom(async (value) => {
            const polling = await pollingService.findByAttribute('id', value);

            if (! polling) {
                throw new Error('Polling not found');
            }

            return true;
        })
];

exports.createValidator = [
    body('title', 'Title is required')
        .notEmpty(),
    body('description', 'Description is required')
        .notEmpty(),
    body('start_date', 'Start date is required')
        .notEmpty().bail()
        .isISO8601({ strict: true, strictSeparator: true})
        .withMessage('Invalid start date'),
    body('end_date', 'End date is required')
        .notEmpty().bail()
        .isISO8601({ strict: true, strictSeparator: true})
        .withMessage('Invalid end date'),
];

exports.updateValidator = [
    ...this.detailsValidator,
    ...this.createValidator
];
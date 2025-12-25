const { param, body } = require('express-validator');
const { USER_STATUS } = require('../enums/status.enum');
const donationService = require('../services/donation.service');

exports.listingValidator = [
    param('pageNumber', 'Page number must be numeric')
        .isInt()
];

exports.detailsValidator = [
    param('id', 'Id must be numeric')
        .isInt().bail()
        .custom(async (value) => {
            const donation = await donationService.findByAttribute('id', value);

            if (! donation) {
                throw new Error('Donation not found');
            }

            return true;
        })
];

exports.createValidator = [
    body('title', 'Title is required')
        .notEmpty(),
    body('description', 'Description is required')
        .notEmpty(),
    body('goal', 'Goal is required')
        .notEmpty().bail()
        .isInt().withMessage('Goal must be numeric'),
    body('start_date', 'Start date is required')
        .notEmpty().bail()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('Invalid start date'),
    body('end_date', 'End date is required')
        .notEmpty().bail()
        .isISO8601({ strict: true, strictSeparator: true})
        .withMessage('Invalid end date'),
    body('status', 'Status is required')
        .optional()
        .isIn(Object.values(USER_STATUS))
        .withMessage('Invalid status')
];

exports.updateValidator = [
    ...this.detailsValidator,
    ...this.createValidator
];
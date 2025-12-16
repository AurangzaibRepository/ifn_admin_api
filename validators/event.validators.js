const { param, body } = require('express-validator');
const eventService = require('../services/event.service');

exports.listingValidator = [
    param('pageNumber', 'Page number must be numeric')
        .isInt()
];

exports.detailsValidator = [
    param('id', 'Id must be numeric')
        .isInt().bail()
        .custom(async (value) => {
            const event = await eventService.findByAttribute('id', value);

            if (! event) {
                throw new Error('Event not found');
            }

            return true;
        })
];

exports.createValidator = [
    body('title', 'Title is required')
    .notEmpty(),
    body('start_date', 'Start date is required')
        .notEmpty().bail()
        .isISO8601({ strict: true, strictSeparator: true})
            .withMessage('Invalid start date'),
    body('end_date', 'End date is required')
        .notEmpty().bail()
        .isISO8601({ strict: true, strictSeparator: true})
            .withMessage('Invalid end date')
];

exports.updateValidator = [
    ...this.detailsValidator,
    ...this.createValidator
];
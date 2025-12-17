const { param, body } = require('express-validator');
const { BLOG_STATUS } = require('../enums/status.enum');
const blogService = require('../services/blog.service');

exports.listingValidator = [
    param('pageNumber', 'Page number must be numeric')
        .isInt()
];

exports.detailsValidator = [
    param('id', 'Id must be numeric')
        .isInt().bail()
        .custom(async (value) => {
            const blog = await blogService.findByAttribute('id', value);

            if (! blog) {
                throw new Error('Blog not found');
            }

            return  true;
        })
];

exports.createValidator = [
    body('title', 'Title is required')
        .notEmpty(),
    body('text', 'Text is required')
        .notEmpty(),
    body('status').optional()
        .isIn(BLOG_STATUS)
        .withMessage('Invalid status')
];

exports.updateValidator = [
    ...this.detailsValidator,
    ...this.createValidator
];
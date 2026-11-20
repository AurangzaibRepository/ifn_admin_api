const { param, body } = require('express-validator');
const { USER_ROLES } = require('../enums/roles.enum');
const memberService = require('../services/user.service');

exports.listingValidator = [
    /*param('role', 'Invalid role')
        .isIn(USER_ROLES),*/
    param('pageNumber', 'Page number must be numeric')
        .isInt()
];

exports.detailsValidator = [
    param('id', 'Id must be numeric')
        .isInt().bail()
        .custom(async (value) => {
            const user = await memberService.findByAttribute('id', value);

            if (! user) {
                throw new Error('User not found');
            }
        })
];

exports.createValidator = [
    body('first_name', 'First name is required')
        .notEmpty(),
    body('last_name', 'Last name is required')
        .notEmpty(),
    body('email', 'Email is required')
        .notEmpty()
        .isEmail(),
    body('role', 'Role is required')
];

exports.updateValidator = [
    ...this.detailsValidator,
    ...this.createValidator
];

exports.changeStatusValidator = [
    param('id', 'Id must be numeric')
        .isInt().bail(),
    body('status', 'Status must be Active or Inactive') .isIn(['Active', 'Inactive'])
];
const { param } = require('express-validator');
const { USER_ROLES } = require('../enums/roles.enum');
const memberService = require('../services/member.service');

exports.listingValidator = [
    param('role', 'Invalid role')
        .isIn(USER_ROLES),
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
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const memberService = require('../services/member.service');

exports.loginValidator = [
    body('email', 'Email is required').notEmpty().bail()
        .isEmail().withMessage('Invalid email').bail()
        .custom(async (value) => {
            const user = await memberService.findByAttribute('email', value);

            if (! user) {
                throw new Error('Email does not exist');
            }

            return true;
        }),
    body('password', 'Password is required')
        .notEmpty().bail()
        .if(body('email').notEmpty())
        .custom(async (value, {req }) => {
            const user = await memberService.findByAttribute('email', req.body.email);
            if (! user) return false;

            const isMatch = await bcrypt.compare(value, user.password);
            if (! isMatch) {
                throw new Error('Invalid credentials');
            }

            return true;
        })
];
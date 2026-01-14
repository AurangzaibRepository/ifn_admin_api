const jwt = require('jsonwebtoken');
const db = require('../models');
const memberService = require('../services/member.service');

exports.login = async (email) => {
    const user = await memberService.findByAttribute('email', email);

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET
    );

    return {
        id: user.id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
        picture: user.picture,
        token
    };
}
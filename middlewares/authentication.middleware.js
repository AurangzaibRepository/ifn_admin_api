const jwt = require('jsonwebtoken');
const HTTP_STATUS = require('../enums/http-status.enum');
const responseUtil = require('../utils/response.util');

module.exports = async (req, res, next) => {
    let authHeader = req.get('Authorization');

    if (! authHeader) {
        return res.status(HTTP_STATUS.UNAUTHORIZED)
            .json(responseUtil.getResponse(false, 'Unauthorized access'));
    }

    authHeader = authHeader.split(' ');
    if (authHeader.length == 1 || authHeader[0] != 'Bearer') {
        return res.status(HTTP_STATUS.UNAUTHORIZED)
            .json(responseUtil.getResponse(false, 'Invalid token format'));
    }

    try {
        jwt.verify(authHeader[1], process.env.JWT_SECRET);
    } catch (err) {
        return res.status(HTTP_STATUS.UNAUTHORIZED)
            .json(responseUtil.getResponse(false, 'Invalid token'));
    }

    next();
}
const express = require('express');
const members = require('../controllers/member.controller');
const { listingValidator, detailsValidator } = require('../validators/user.validators');
const router = express.Router();

module.exports = (app) => {
    router.get('/listing/:role/:pageNumber', listingValidator, members.listing);
    router.get('/:id', detailsValidator, members.details);

    app.use('/api/members', router);
}
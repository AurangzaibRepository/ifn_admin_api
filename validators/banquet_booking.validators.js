const { param } = require('express-validator');
const BanquetBookingService = require('../services/banquet_booking.service');

exports.detailsValidator = [
    param('id', 'Id must be numeric')
        .bail()
        .custom(async (value) => {
            const booking = await BanquetBookingService.findByAttribute('id', value);

            if (! booking)  {
                throw new Error('Banquet booking not found');
            }

            return true;
        })
];
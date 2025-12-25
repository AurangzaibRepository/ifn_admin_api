const { validationResult } = require('express-validator');

exports.formattedValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg
});

exports.formatListing = (pageNumber, totalRecords, records) => {
    return {
        records,
        page_number: pageNumber,
        total_records: totalRecords
    };
}
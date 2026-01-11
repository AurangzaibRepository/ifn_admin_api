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

exports.formatDate = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
}
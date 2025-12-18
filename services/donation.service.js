const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Donation.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber, keyword) => {

}

exports.getDetails = async (id) => {
    const data = await db.Donation.findByPk(id, {
        include: {
            model: db.DonationContribution
        }
    });

    return data;
}

exports.createRecord = async (data) => {

}

exports.updateRecord = async (id, data) => {
    
}
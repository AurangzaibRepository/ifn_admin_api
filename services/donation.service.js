const { Op, Sequelize } = require('sequelize');
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
    const where = {};
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);

    // Apply filters
    if (keyword) {
        where = {
            [Op.or]: [
                {
                    title: { [Op.like]: `%${keyword}%` }
                },
                Sequelize.literal(`Match(title) AGAINST (${Sequelize.escape(keyword)} IN BOOLEAN MODE)`)
            ]
        };
    }

    const data = await db.Donation.findAll({
            where,
            limit,
            offset
        });

    return data;
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
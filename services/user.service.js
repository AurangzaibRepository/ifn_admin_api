const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.User.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber, keyword, membersExpiring) => {
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);
    const conditions = [];

    if (keyword) {
        conditions.push({
            [Op.or]: [
                { first_name: { [Op.like]: `%${keyword}%` } },
                { last_name: { [Op.like]: `%${keyword}%` } },
                { email: { [Op.like]: `%${keyword}%` } }
            ]
        });
    }
    
    if (membersExpiring === '1') {
        const today = new Date();
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);
    
        conditions.push({
            role: 'Member',
            membership_expiry_date: {
                [Op.between]: [
                    today.toISOString().split('T')[0],
                    next30Days.toISOString().split('T')[0]
                ]
            }
        });
    }
    
    const where = conditions.length > 0
        ? { [Op.and]: conditions }
        : {};

    const data = await db.User.findAll({
        attributes: {
            include: [
                [
                    Sequelize.fn(
                        'CONCAT',
                        Sequelize.col('first_name'),
                        ' ',
                        Sequelize.col('last_name')
                    ),
                    'name'
                ]
            ]
        },
        where,
        order: [['first_name', 'ASC']],
        limit,
        offset
    });

    return data;
};

exports.getDetails = async (id) => {
    const data = await db.User.findByPk(id);

    return data;
}

exports.changeStatus = async (id, status) => {
    await db.User.update({ status }, {
        where: { id }
    });
}
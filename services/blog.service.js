const { Op, Sequelize } = require('express');
const db = require('../models');
const pageUtil = require('../utils/page.util');
const { formatListing } = require('../utils/formatter.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Blog.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber, keyword) => {
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);
    let where = {};

    if (keyword) {
        where = {
            [Op.or]: [
                {
                 title: {
                    [Op.like]: `%${keyword}%`
                    }
                },
                Sequelize.literal(`MATCH(text) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
            ]
        }
    }

    const { count, rows } = await db.Blog.findAndCountAll({
        where,
        limit,
        offset
    });
    
    return formatListing(pageNumber, count, rows);
}

exports.getDetails = async (id) => {
    const data = await db.Blog.findByPk(id);

    return data;
}

exports.createRecord = async (data, fileName) => {
    const blog = await db.Blog.create({
        ...data,
        banner: fileName
    });

    return blog;
}

exports.updateRecord = async (id, data, fileName) => {
    if (fileName) {
        data.fileName = fileName;
    }

    await db.Donation.update(data, {
        where: { id}
    });
}
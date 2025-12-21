const { Op, Sequelize } = require('express');
const db = require('../models');
const pageUtil = require('../utils/page.util');

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
    where = {};

    if (keyword) {
        where = {
            [Op.or]: [
                {
                 title: {
                    [Op.like]: `%${keyword}%`
                    }
                },
                Sequelize.literal(`MATCH(text) AGAINST (${Sequelize.escape(keyword)} IN BOOLEAN MODE)`)
            ]
        }
    }

    const data = await db.Blog.findAll({
        where,
        limit,
        offset
    });
    
    return data;
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
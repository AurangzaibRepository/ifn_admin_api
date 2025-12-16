const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const pageUtil = require('../utils/page.util');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Event.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.getListing = async (pageNumber, keyword) => {
    const { limit, offset } = pageUtil.getLimitOffset(pageNumber);
    const where = {}

    // Add filter for full text search
    if (keyword) {
        where = {
            [Op.or]: [
                {
                    title: { [Op.like]: `%${keyword}%` }
                },
                Sequelize.literal(`MATCH(text) AGAINST (${Sequelize.escape(keyword)} IN BOOLEAN MODE)`)
            ]
        };
    }

    const data = await db.Event.findAll({
        where,
        limit,
        offset
    });

    return data;
}

exports.getDetails = async (id) => {
    let data = await db.Event.findByPk(id, {
        include: {
            model: db.EventRegistration
        }
    });
    data = data.toJSON();

    data.registrations = data.EventRegistrations.map((registration) => ({
        first_name: registration.User.first_name,
        last_name: registration.User.last_name,
        email: registration.User.email,
        picture: registration.User.picture
    }));
    delete data.EventRegistrations;

    return data;
}

exports.createRecord = async (data, fileName) => {
    const event = await db.Event.create({
        ...data,
        picture: fileName,
        createdBy: 1,
    });

    return event;
}

exports.updateRecord = async (id, data, fileName) => {
    if (fileName) {
        data.picture = fileName;
    }

    await db.Event.update(data, {
        where: { id }
    });
}
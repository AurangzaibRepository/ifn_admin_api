const db = require('../models');

exports.findByAttribute = async (attribute, value) => {
    const data = await db.Polling.findOne({
        where: {
            [attribute]: value
        }
    });

    return data;
}

exports.createRecord = async (data) => {
    const polling = await db.Polling.create(data);

    return polling;
}

exports.updateRecord = async (id, data) => {
    await db.Polling.update(data, {
        where: { id }
    });
}
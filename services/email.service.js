const { SendEmailCommand } = require('@aws-sdk/client-ses');
const sesClient = require('../libs/ses_client');

exports.send = async (data) => {
    const params = {
        Source: process.env.SES_FROM_EMAIL,
        Destination: {
            ToAddresses: [data.to_email],
        },
        Message: {
            Subject: { Data: data.subject, Charset: process.env.EMAIL_CHARSET },
            Body: {
                Html: { Data: data.html, Charset: process.env.EMAIL_CHARSET }
            }
        }
    };

    const command = new SendEmailCommand(params);
    return await sesClient.send(command);
}
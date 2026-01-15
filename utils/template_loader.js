const fs = require('fs');
const path = require('path');

exports.loadTemplate = (template, variables = {}) => {
    const filePath = path.join(
        process.cwd(),
        'email_templates',
        template
    );
    let html = fs.readFileSync(filePath, process.env.EMAIL_CHARSET);

    return html;
}
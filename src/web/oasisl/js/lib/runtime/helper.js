var template = require('./runtime');
template.helper('oasTimelineGetKey', function (obj) {
    return _.keys(obj)[0];
});

module.exports = template;
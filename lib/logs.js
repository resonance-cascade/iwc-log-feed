var microformats = require('microformat-node'),
    options = {};

exports.update = function (baseUrl, date, callback) {
  var url = baseUrl + date.format('YYYY-MM-DD');
  microformats.parseUrl(url, options, function (err, data) {
    if (err) callback(err);
    data.updated = date;
    data.url = url;
    callback(null, data);
  });
};
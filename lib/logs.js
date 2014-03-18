var microformats = require('microformat-node'),
    options = {};

exports.update = function (callback) {
  microformats.parseUrl('http://indiewebcamp.com/irc/today', options, function (err, data) {
    if (err) callback(err);
    callback(null, data);
  });
}
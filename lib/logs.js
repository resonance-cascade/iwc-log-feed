var microformats = require('microformat-node'),
    options = {};
var jade = require('jade');
var xml = require('xml');

exports.update = function (baseUrl, date, callback) {
  var url = baseUrl + date.format('YYYY-MM-DD');
  microformats.parseUrl(url, options, function (err, data) {
    if (err) callback(err);
    data.updated = date;
    data.url = url;
    jade.renderFile('./views/content.jade', {
      pretty: true,
      log: data
    }, function (err, html) {
      if (err) callback (err);
      data.encoded = xml({content: { _attr: { type:'html'}, _cdata: html }});
      callback(null, data);
    });
  });
};
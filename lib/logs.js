var microformats = require('microformat-node'),
    options = {};
var jade = require('jade');
var xmlEscape = require('xml-escape');

exports.update = function (baseUrl, date, callback) {
  var url = baseUrl + date.format('YYYY-MM-DD');
  microformats.parseUrl(url, options, function (err, data) {
    if (err) callback(err);
    data.updated = date;
    data.url = url;
    jade.renderFile('./views/content.jade', {
      pretty: true ,
      log: data
    }, function (err, html) {
      if (err) callback (err);
      //data.encoded = xml({content: { _attr: { type:'html'}, _cdata: html }});
      data.encoded = xmlEscape(html);
      callback(null, data);
    });
  });
};
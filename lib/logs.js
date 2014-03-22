var microformats = require('microformat-node'),
    options = {};
var jade = require('jade');
var xmlEscape = require('xml-escape');
var async = require('async');
var moment  = require('moment');
//var sanitize = require('sanitize-html');

exports.update = function (baseUrl, date, callback) {
  var url = baseUrl + date.format('YYYY-MM-DD');
  microformats.parseUrl(url, options, function (err, data) {
    if (err) callback(err);
    data.updated = date;
    data.url = url;
    async.map(data.items, scrubHTML, function (err, results) {
      data.items = results;
      renderJade (data, callback);
    });
  });
};

function scrubHTML (mfObject, callback) {
  // This sanitizes the html
  //mfObject.properties.content[0].html = sanitize(mfObject.properties.content[0].html);

  // This gets rid of crap that creeps into the logs
  mfObject.properties.content[0].html = mfObject.properties.content[0].html.replace(/\u0002/g, ' ');
  mfObject.properties.published[0] = moment(mfObject.properties.published[0]);
  callback(null, mfObject);

}

function renderJade (data, callback) {
  jade.renderFile('./views/content.jade', {
      pretty: true ,
      log: data
    }, function (err, html) {
      if (err) {
       console.log(err);
       callback(err);
      }
      data.encoded = xmlEscape(html);
      callback(null, data);
    });
}

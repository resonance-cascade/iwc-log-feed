var microformats = require("microformat-node"),
    options = {};

microformats.parseUrl('http://glennjones.net/about', options, function(err, data){
    console.log(data)
});
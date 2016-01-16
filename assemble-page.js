var fs = require("fs");

exports.sendJS = function (url, res) {

    var data = fs.readFileSync(url);
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
};
		
exports.sendWebapp = function (url, res) {

    console.log("sendWebapp url:"+url+" type: application/x-web-app-manifest+json");
    var data = fs.readFileSync(url);
    res.writeHead(200, "OK", {'Content-Type': 'application/x-web-app-manifest+json'});
    res.write(data);
    res.end();
};

exports.sendAppcache = function (url, res) {

    console.log("sendManifest url:"+url+" type: text/cache-manifest");
    var data = fs.readFileSync(url);
    res.writeHead(200, "OK", {'Content-Type': 'text/cache-manifest'});
    res.write(data);
    res.end();
};



var express = require('express');
var app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var assemblePage = require('./assemble-page.js');
var fs = require("fs");


/******* Requests *******/

/**** Front Page ****/
app.get('/', function (req, res) {
    assemblePage.sendJS("private/templates/index.html", res);
});
app.get('/index.html', function (req, res) {
    assemblePage.sendJS("private/templates/index.html", res);
});


/**** Assets ****/
app.get('/lib/*', function (req, res) {
    assemblePage.sendJS("public" + req.url, res);
});

app.get('/images/*', function (req, res) {
    assemblePage.sendJS("public" + req.url, res);
});

app.get('/css/*', function (req, res) {
    assemblePage.sendJS("public" + req.url, res);
});

app.get('/js/*', function (req, res) {
    assemblePage.sendJS("public" + req.url, res);
});

app.get('/templates/*', function (req, res) {
    assemblePage.sendJS("private" + req.url, res);
});

app.get('/calc.webapp', function (req, res) {
    assemblePage.sendWebapp("./" + req.url, res);
});

app.get('/calc.appcache', function (req, res) {
    assemblePage.sendAppcache("./" + req.url, res);
});


var server = app.listen(4002, function () {

    console.log('Listening on port ' + server.address().port);
});
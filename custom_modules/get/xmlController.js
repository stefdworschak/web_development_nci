// HTML produced by XSL Transformation
//https://www.npmjs.com/package/xml2js
var parseString = require('xml2js').parseString,
    filter = require('./../filter'),
    js2xmlparser = require('js2xmlparser'),
    fs=require('fs'),
    libxslt = require('libxslt');

module.exports = function(req, res) {
    
    if(!req.session.user) {
    res.redirect('/');
    } else {
    
      res.writeHead(200, { 'Content-Type': 'text/html' });

      var docSource = fs.readFileSync('Appointments.xml', 'utf8');
      var stylesheetSource = fs.readFileSync('Appointments.xsl', 'utf8');

      var doc = libxslt.libxmljs.parseXml(docSource);
      var json = parseString(doc, function (err, response) {
          var json = JSON.parse(JSON.stringify(response.appointments));

          json = filter.filter(json, req.session.user);

          var XMLformated = js2xmlparser.parse("appointments", json);

          var stylesheet = libxslt.parse(stylesheetSource);

          var result = stylesheet.apply(doc);
          //console.log(result.toString());
          res.end(result.toString());

      });
    }
};
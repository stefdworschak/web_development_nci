// HTML produced by XSL Transformation
module.exports = function(req, res) {
    
    var fs=require('fs'),
        libxslt = require('libxslt');
    
    res.writeHead(200, { 'Content-Type': 'text/html' });

    var docSource = fs.readFileSync('Appointments.xml', 'utf8');
    var stylesheetSource = fs.readFileSync('Appointments.xsl', 'utf8');

    var doc = libxslt.libxmljs.parseXml(docSource);
    var stylesheet = libxslt.parse(stylesheetSource);

    var result = stylesheet.apply(doc);

    res.end(result.toString());

};
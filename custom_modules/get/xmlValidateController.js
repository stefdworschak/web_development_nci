var fs = require('fs'),
    x = require('libxmljs');

module.exports = function(req,res){
  if(!req.session.user) {
    res.render('login');
  } else {
    var xsd = fs.readFileSync('Appointments.xsd', 'utf8')
    var xsdDoc = x.parseXmlString(xsd.toString());
    var xml0 = fs.readFileSync('Appointments.xml','utf8')
    var xmlDoc0 = x.parseXmlString(xml0);
    var result0 = xmlDoc0.validate(xsdDoc);
    //console.log("result0:", result0);
    res.end(result0.toString());
  }
}
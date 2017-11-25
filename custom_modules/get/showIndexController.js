var fs = require('fs'),
    filter = require('./../filter');

module.exports = function(req, res) {
  
  if(!req.session.user) {
    res.render('login');
  } else {
    var json = fs.readFileSync('Appointments.json','utf8');
    var jsonParsed = JSON.parse(json);
    
    jsonParsed = filter.filter(jsonParsed, req.session.user);
    
    var jsonStringified = JSON.stringify(jsonParsed);
    
    res.render('index', {'data': {'cal':jsonParsed,'user':req.session.user}});
  }
}
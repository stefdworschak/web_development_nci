var fs = require('fs'),
    filter = require('./../filter');
module.exports = function(req, res) {
    var userid = parseInt(JSON.parse(JSON.stringify(req.body)).userid);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    var JSONfile = fs.readFileSync('Appointments.json', 'utf8');
    var JSONparsed = JSON.parse(JSONfile);
    
    JSONparsed = filter.filter(JSONparsed,req.session.user);
    
   // console.log(JSONparsed.length)
    res.end(JSON.stringify(JSONparsed));

}
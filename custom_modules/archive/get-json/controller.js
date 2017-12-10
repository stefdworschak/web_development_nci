var fs = require('fs');
module.exports = function(req, res) {

    res.writeHead(200, { 'Content-Type': 'application/json' });

    var JSONfile = fs.readFileSync('Appointments.json', 'utf8');
    var JSONparsed = JSON.parse(JSONfile);
   
    res.end(JSON.stringify(JSONparsed));

}
var fs = require('fs');
module.exports = function(req, res) {
    var userid = parseInt(JSON.parse(JSON.stringify(req.body)).userid);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    var JSONfile = fs.readFileSync('Appointments.json', 'utf8');
    var JSONparsed = JSON.parse(JSONfile);
    
    for(i=JSONparsed.appointment.length-1;i>=0; i--) {
      if(JSONparsed.appointment[i].who !== userid) {
        JSONparsed.appointment.splice(i,1);
      }
    }
    console.log(JSONparsed.length)
    res.end(JSON.stringify(JSONparsed));

}
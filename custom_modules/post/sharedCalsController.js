var fs = require('fs'),
    filter = require('./../filter');
module.exports = function(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    var JSONfile = fs.readFileSync('users.json', 'utf8');
    var JSONparsed = JSON.parse(JSONfile);
    
    JSONparsed = filter.filterUsr(JSONparsed,req.session.user.userid);
    
   // console.log(JSONparsed.length)
    res.end(JSON.stringify(JSONparsed));

}
var fs = require('fs'),
    filter = require('./../filter');

module.exports = function(req, res) {
    if(!req.session.user) {
      res.render('login');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      var JSONfile = fs.readFileSync('users.json', 'utf8');
      var JSONparsed = JSON.parse(JSONfile);

      JSONparsed = filter.filterUsr(JSONparsed,req.session.user.userid);

     // console.log(JSONparsed.length)
      res.end(JSON.stringify(JSONparsed));
    }
}
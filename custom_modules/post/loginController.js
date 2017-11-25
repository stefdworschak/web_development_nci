var fs = require('fs');
var key = 'lqw5nco8123kas01ms810-12dl';
var encryptor = require('simple-encryptor')(key);

module.exports = function(req,res) {
   
    var file = fs.readFileSync("users.json","utf-8");
    var loggedin = false;
    console.log(file[4098]+file[4099]+file[4100]+file[4101]+file[4102]+file[4103]+file[4104]+file[4105])
    var users = JSON.parse(file).users;
    var username = req.body.username;
    var password = req.body.password;
    for(i=0;i<users.length;i++){
        if(users[i].username == username) {
          if(encryptor.decrypt(users[i].password) == password) {
            loggedin=true;
            delete users[i].password;
            var details = users[i];
            // Display loggedin user details
            // console.log(details);
            req.session.user=details;
            res.redirect('/?q=loggedin');
          }
        }
    }
    if(!loggedin) {res.redirect('/?q=login-error');}

}
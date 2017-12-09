var fs = require('fs');
var key = 'lqw5nco8123kas01ms810-12dl';
var encryptor = require('simple-encryptor')(key);

module.exports = function(req,res) {
   
    var file = fs.readFileSync("users.json","utf-8");
    var loggedin = false;
    var users = JSON.parse(file).users;
    var username = req.body.username;
    var password = req.body.password;
    for(i=0;i<users.length;i++){
        if(users[i].username == username) {
          if(encryptor.decrypt(users[i].password) == password) {
            loggedin=true;
            delete users[i].password;
            delete users[i].username;
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
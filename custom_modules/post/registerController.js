var fs = require('fs');
var key = 'lqw5nco8123kas01ms810-12dl';
var encryptor = require('simple-encryptor')(key);

module.exports = function(req,res) {

    function writeToFile(obj) {
        var json =JSON.parse(fs.readFileSync('users.json','utf-8'));

        var user = {};
        user.userid = json.users.length+1;
        user.username = obj.username;
        user.first_name = obj.first_name;
        user.last_name = obj.last_name;
        //https://www.npmjs.com/package/simple-encryptor
        user.password = encryptor.encrypt(obj.passw);
        user.shared = [];
        user.shared.push({"received":[], "sent":[]});
      
        json.users.push(user);
        fs.writeFileSync('users.json',JSON.stringify(json));
        
        req.session.user = user;
        res.redirect('/');
    }

    writeToFile(req.body);
}
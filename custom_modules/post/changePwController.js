var fs = require('fs');
var key = 'lqw5nco8123kas01ms810-12dl';
var encryptor = require('simple-encryptor')(key);

module.exports = function(req,res){
  
  function changePw(obj){
    
    var reStr = "success";
    var checkFound = 0;
    var password = obj.current_password;
    var new_password = obj.new_password;
    var UsersFile = fs.readFileSync('users.json', 'utf8');
    var users = JSON.parse(UsersFile);
    var userid = req.session.user.userid-1;
    if(encryptor.decrypt(users.users[userid].password) === password){
      users.users[userid].password = encryptor.encrypt(new_password);
      fs.writeFileSync('users.json',JSON.stringify(users));
      checkFound = 1;
    } else {
      reStr = "wrong password";
    }
    
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(reStr);
    
  }

  changePw(req.body);
  
}
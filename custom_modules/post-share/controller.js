var fs = require('fs');

module.exports = function(req,res){
  
  function appendJSON(obj){

    var reStr = "success";
    var UsersFile = fs.readFileSync('users.json', 'utf8');
    var users = JSON.parse(UsersFile);
    var sharedUserid = 0;
    var sharedAlready = false;
    //obj.username to be shared with
       //req.session.user.userid
    //first write userid who shared calendar into the person it was shared with
    //console.log(obj.sharemail.toString());
    for(i = 0; i < users.users.length;i++){
      
      if(users.users[i].username.toString() === obj.sharemail.toString()) {
        var shared = users.users[i].shared[0].received;
        var arr = shared.join(',').split(',');
        console.log(arr);
        for(k =0; k<shared.received.length; k++){
          //console.log('Received'+received[k]);
          //conosl.log('Userid'+req.session.user.userid);
          if(shared.received[k] === req.session.user.userid) {
            //console.log("shared already");
            sharedAlready = true;
          } else {
            //console.log(received[k])
            //console.log(req.session.user.userid)
          }
        } 
        console.log('already shared: '+sharedAlready);
        if(sharedAlready === false) {
            users.users[i].shared[0].sent.push(req.session.user.userid);
            console.log(users.users[i].userid)
            sharedUserid = users.users[i].userid; 
        } else {reStr="shared_already"; sharedUserid = -1;}
      } 
    }
    console.log(sharedUserid);
    
    for(j = 0; j < users.users.length;j++){
      if(users.users[j].userid == req.session.user.userid) {
          if(sharedUserid !== 0) {
            if(sharedAlready === false) {
              users.users[j].shared[0].sent.push(sharedUserid);
            }
          } else if(sharedUserid === 0) {
             reStr = "no_user";
          }
      }
    }
    fs.writeFileSync('users.json',"");
    fs.writeFileSync('users.json',JSON.stringify(users));
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(reStr);
    
  }
  appendJSON(req.body);
  
}
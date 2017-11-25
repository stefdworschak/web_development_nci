exports.filter = function (json, user){
  
  var jsonParsed = json;
  var user_obj = user;
  
  for(i = jsonParsed.appointment.length-1; i >= 0;i--){
      if(jsonParsed.appointment[i].who !== user_obj.userid){  
        var shared = 0;
        for(j = 0; j < user_obj.shared[0].received.length; j++){    
          if(user_obj.shared[0].received[j] === jsonParsed.appointment[i].who){
            shared = 1;
          }
        }  
        if(shared !== 1) {
          jsonParsed.appointment.splice(i,1);
        } 
      } 
    }
    return jsonParsed;
}
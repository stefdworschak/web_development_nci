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

exports.filterUsr = function (jsonParsed, user_obj){
  
  var json = jsonParsed.users;
  var user = user_obj;
  var received = [];
  var sent = [];
  var receivedCals = [];
  var sentCals = [];
  //console.log(json[0].userid + "  "+user);
  for(i = 0; i < json.length; i++){
      if(json[i].userid === user){
          received = json[i].shared[0].received;
          sent = json[i].shared[0].sent;
      }
  }
  
  for(j = 0; j < json.length;j++){
    for(k = 0; k < sent.length;k++){
      if(json[j].userid === sent[k]){
        sentCals.push(json[j].first_name + " " + json[j].last_name)
      }
    }
  }  
  
  for(l = 0; l < json.length;l++){
    for(m = 0; m < received.length;m++){
      if(json[l].userid === received[m]){
        receivedCals.push(json[l].first_name + " " + json[l].last_name)
      }
    }
  }  
  
  var cals = {};
  cals.received = receivedCals;
  cals.sent = sentCals;
  return cals;
}
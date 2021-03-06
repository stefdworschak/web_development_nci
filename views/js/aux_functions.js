function load(user) {
  $.ajax({
    url: "/get/html",
    cache: false,
    success: function(html) {
      $("#results").append(html);
      
      $("#appointmentsTable tbody tr").click( function () {
            $(document).off('keyup');
            var $row=$(this).attr("id").replace("trId","");
            var $name = $(this)[0].children[3].innerText;
            $(".selected").removeClass("selected");
            $(".selected_other").removeClass("selected_other");
        
            if($name === user.first_name + " " + user.last_name) {
                $(this).addClass("selected");
            } else {
                $(this).addClass("selected_other");
            }

        $(document).keyup((evt)=>{
          if(evt.key === 'Delete' || evt.key === 'Backspace'){
            if($name === user.first_name + " " + user.last_name) {
              deleteRecord($row);
            }
          }
        })
      });
    }
  });
} 

function filter_JSON(json, keywords) {
  var count;
  for(i=json.length-1;i >=0 ;i--) {
    //https://stackoverflow.com/questions/7866275/access-non-numeric-object-properties-by-index
    count = 0;
    for(var item in json[i]) {
        for (var keyword in keywords) {
            if(keywords[keyword] !== '') {
                if(json[i][item].toString().indexOf(keywords[keyword]) != -1) {
                    count++;
                }
            }
        }
    }
    if(count === 0){
        json.splice(i,1);
    }
  }
  return json;
}

function deleteRecord(id){
    $.ajax({
             url: '/post/delete_record',
             method: 'post',
             data: {'record_id':id}
           }).done((res)=>{
              console.log(res);
             if(res === 'success'){
               console.log('success');
               window.location = '/'
             } else {
               //Add error handling!!
               /*
               $('#change-pw-error').css('display','block');
               $('#change-pw-error').text(res);
               $('changePwForm').on('hidden.bs.modal', function () {
                    $('#share-error').css('display','none');
                })
               $('#change-pw-error').blur(()=>{$('#change-pw-error').css('display','block')})
               */
               console.log("error"+res);
                
             }
           });
  }

function setMarkers(userid){
  $.ajax({
    url: "/get/json",
    data: {'userid':userid},
    method: 'POST',
    cache: false
  }).done((resp)=>{
      var json = JSON.parse(JSON.stringify(resp)).appointment;
      home={lat: 53.33873579999999,lng: -6.2385966};
      var keywords = $('input[name=search]').val().trim().split(',').join(' ').split(' ');
      if(keywords.toString() !== '') {
        json=filter_JSON(json, keywords);
      }       
      initMap(home,json);
  })
}

function preloadSharedCals(usr){
  var user = usr;
  $.ajax({
    url: "/post/sharedCals",
    data: {'userid':user.userid},
    method: 'POST',
    cache: false
  }).done((resp)=>{
      var sent = resp.sent;
      var received = resp.received;
      var len = sent.length > received.length ? sent.length : received.length
      $('#sharedCals').append('<tr><th>Shared with me:</th><th width="20px;">&nbsp;</th><th>Shared by me:</th></tr>');
      for(i=0;i<len;i++){
          var tmpSent = sent[i] === undefined ? "" : sent[i];
          var tmpReceived = received[i] === undefined ? "" : received[i];
          $('#sharedCals').append('<tr><td>'+tmpSent+'</td><td>&nbsp;</td><td>'+tmpReceived+'</td></tr>');
      }
  });
}
function load(user) {
  $.ajax({
    url: "/get/html",
    cache: false,
    success: function(html) {
      $("#results").append(html);
      
      $("#appointmentsTable tbody tr").click( function () {
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
            var $row=$(this).attr("id").replace("trId","");
            var $name = $(this)[0].children[3].innerText;
           // console.log($name);
           // console.log(user.first_name + " " + user.last_name);
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
  console.log(id);
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

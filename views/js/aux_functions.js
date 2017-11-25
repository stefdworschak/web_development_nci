function load() {
  $.ajax({
    url: "/get/html",
    cache: false,
    success: function(html) {
      $("#results").append(html);
      $('#appointmentsTable tbody tr').click((event)=>{
        var $el = event.target.parentNode;
        //$(this).removeClass('selected');
        $('.selected').removeClass('selected');
        $el.classList.add('selected');
        console.log("hey")
       // var $row = $(this).attr('id');
      //  var $td = 'thisTd'+$row.replace("thisTr","");
       // $($td).unhide();
        
      })
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

function load() {
  $.ajax({
    url: "/get/html",
    cache: false,
    success: function(html) {
      $("#results").append(html);
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

function setMarkers(){
  $.ajax({
    url: "/get/json",
    cache: false,
    success: function(json) {
      json=JSON.parse(JSON.stringify(json.appointment));
      home={lat: 53.33873579999999,lng: -6.2385966};
      var keywords = $('input[name=search]').val().trim().split(',').join(' ').split(' ');
      console.log(keywords)
      if(keywords.toString() !== '') {
        console.log(true);
        json=filter_JSON(json, keywords);
        console.log(json);
      } else {
        //json=JSON.stringify(json);
        //console.log(json);
      }
      
      initMap(home,json);
    }
  });
}

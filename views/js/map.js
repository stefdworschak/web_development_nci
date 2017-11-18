function initMap(home = {lat: 53.348335, lng:-6.255683}, coords) {

          //Info for multiple markers
          //Google: https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
          //Stackoverflow: https://stackoverflow.com/questions/11106671/google-maps-api-multiple-markers-with-infowindows
          if(coords == undefined) {
             var data = <%- JSON.stringify(data.cal.appointment) %>
             console.log(data);
          } else {
            var data = coords;
          }
         
          var myLatLng = home;
          var myCoords =data;
          //Red, blue, green, yellow, white,
          var colors = ['d62d20','008744','0057e7','ffa700','ffffff','551a8b']
          var pinUrl = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|';
          //console.log(myCoords.appointment.length);
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: myLatLng
          });

          if(myCoords) {
           
            var marker;
            var pinImg;
            var info;
            var contStr;
            var people = [];
            var colCount = 0;

            for(j=0;j<myCoords.length; j++) {
              if(people.indexOf(myCoords[j].who) == -1) {
                  people.push(myCoords[j].who)
              }
            }

            for(i=0; i < myCoords.length; i++){
              var pid = people.indexOf(myCoords[i].who);
              contStr = '<div><h3>'+myCoords[i].what+'</h3>'
              +'<p>Date: '+myCoords[i].date+'<br />'
              +'<p>Time: '+myCoords[i].time+'<br />'
              +'<p>Address: '+myCoords[i].where+'<br />'
              +'</p></div>'
              info = new google.maps.InfoWindow({
                  content: contStr
              });

              pinImg = new google.maps.MarkerImage(pinUrl+colors[pid]);
              marker = new google.maps.Marker({
                position: myCoords[i].coords,
                map: map,
                icon: pinImg,
                title: myCoords[i].what
              });

              google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
                  return function() {
                     infowindow.setContent(content);
                     infowindow.open(map,marker);
                  };
              })(marker,contStr,info));


            }
        } else {console.log("error")}

        }

       /* function addMarker(para) {

            var marker = new google.maps.Marker({
              position: para,
              map: map,
              title: 'Hello World!'
            });

        }*/
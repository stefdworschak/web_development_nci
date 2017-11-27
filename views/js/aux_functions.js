<!DOCTYPE html>
<html lang="en" ng-app>
<head>
  <title>My Calendar</title>
  <link rel="icon" type="image/png" href="/img/icon3.png">
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- jQuery library -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></script>
  <!--
      Replaced with the below to display modals properly
      <link rel="stylesheet" href="/css/bootstrap.min.css">
      <link rel="stylesheet" href="/css/bootstrap-responsive.min.css">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  -->
    <!-- Latest compiled and minified CSS -->
      <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" />

      <!-- Latest compiled JavaScript -->
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <!-- https://jqueryvalidation.org/ -->
      <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
      <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>

  <style>
    body {
      /*padding-top: 60px    ;*/
      padding-bottom: 60px;
    }
    hr {
      border-top:1px solid lightgray;
    }
    h4 {
      margin-top:0px;
      padding-top:0px;
      color:gray;
    }
    .selected{background:lightgray;}
      
    table,
    th,
    td {
      
      border-collapse: collapse;
      border: 1px solid black;
      text-align: center;
      min-width:90%;
   
    }
    
    .dropdown-item {
      display:block
    }
   
    .dropdown-menu {
      position:absolute;
      
    }
    
    #map {
      margin-left:10px;
      min-width:90%;
      min-height:600px;
      border-style:solid;
    }
    #results {
     float:centre; 
     margin-left:10%;
      width:80%;
      height:65%;
      margin-top:10px;
           }
    
     #enterForm {
     float:centre; 
     margin-left:30%;
      width:80%;
      height:65%;
       margin-top:10px;}
    
    .container-fluid {
      
    }     
    
    #search, #reset {
      margin-top:-10px;
      
    }
    #logo {
      height:inherit;
      width:50px;
    }
    
   .AddButton {
        margin:10px;
        height:100%;
        border:1px solid gray;
          }
  
    .Update {
     float:centre;
     margin-left:17%;
      width:65%;
      height:65%;
       
          }
    
    .modal-dialog{
     float:centre;   
      margin-left:17%;
      width:65%;
      height:85%;
      overflow:auto;
    }
    .modal-content{
     float:centre;   
      margin-left:17%;
      width:80%;
      height:80%;
       overflow:auto;
    }
    
    
    
    .myNav {
      margin-bottom:20px;
    }
    h1 {margin:0px;}
    .page-header {
      margin:10px;
      padding:0px;
    }
    input[name='search'] {
      height:auto;
    }
    .btn-sm {
      
    }
    #userdisplay{
      color:white;
      margin:0px;
      padding:0px;
      margin-right:20px;
      vertical-align:middle;
      line-height:16px;
      min-height:100%;
    }
    input[type="date"],input[type="time"] {
      line-height:inherit;
      width:default;
    }
    #share-error, #change-pw-error {display:none;}
      
  </style>
  <link rel="stylesheet" href="/css/dropdown_menu.css" />
  <script src="/js/jquery.min.js"></script>
  <script src="/js/bootstrap.min.js"></script>
  <script src="/js/aux_functions.js"></script>
  <script src="/js/index_functions.js"></script>
  <script>
    var api_key = "AIzaSyBF2VwTjDiUFzvdA3IuQw_8H5JYq803bHs";
    var marker;
 
   $(document).ready(function() {
      load();
      $('#searchBtn').on('click',function(){
        var userid = <%- data.user.userid %>
        setMarkers(userid);
      });
      $('input[name=search]').keyup((evt)=>{
          if(evt.key === 'Enter') {
            var userid = <%- data.user.userid %>
            setMarkers(userid);
          }
      });
      $('#resetBtn').on('click',function(){
        $('input[name=search]').val('');
        var userid = <%- data.user.userid %>
        setMarkers(1);
      });
      
      $('#enterEventModal').blur(()=>{
       hideMod('#enterEventModal');
      })
     
     $('input[name=sharemail]').keyup((evt)=>{
       if(evt.key === 'Enter') {
            shareCal();
          }
     })
     
     $('#shareBtn').click(()=>{
       shareCal();
     })
     
     $('#logoutBtn').click(()=>{
          window.location = '/logout';
      })
     
     $('.dropdown-toggle').dropdown()
     $('#changePwBtn').click(()=>{
       changePw();
     });
     
     var user = <%- JSON.stringify(data.user) %>;
    console.log(user);
      //$('#userdisplay').text(user.first_name);  
     
});
   function deleteElement(event){
       var el=event.target.id;
       var record=Number(el.replace("delete",""));
       deleteRecord(record);
    }
  </script>
</head>

<body>
  
  <div class="container-fluid">
  <!-- container-fluid start -->
    
    <!-- nav start -->
    <div class="row myNav"> 
      
      <div class="col-md-12" style="min-height:45px; background:#212121; text-align:right; padding-top:5px;padding-bottom:5px;">
       
        <span id="userdisplay">Hi, <%= data.user.first_name %>!</span>
        <!--<button type="button" class="btn btn-danger" style="min-height:45; display:inline;" id="logoutBtn">Log Out</button>-->
        <div class="btn-group" id="dropMenu">
          <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="glyphicon glyphicon-user"></span>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">View Shared Calendars</a>
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#changePwForm">Change Password</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/logout">Logout</a>
          </div>
        </div>
        
      </div>
      
    </div>
    <!-- nav end --> 
    
    <!-- row start --> 
    <div class="row"> 
     
        <!-- col width 7 start --> 
        <div class="col-sm-7 col-md-7 pull-left">
          <div class="page-header">
              <h1 style="display:inline-blockstyle;"><img src="/img/icon3.png" id="logo" />My Calendar</h1>
          </div>
        </div>
        <!-- col width 7 end --> 
     
        <!-- col width 3 start --> 
        <div class="col-sm-3 col-md-3">

          <div class="input-group">
            <input type="text" class="form-control" aria-label="..." style="min-height:35px" name="search" />
            <div class="input-group-btn" >
              <button class="btn btn-default btn-md" type="button" id="searchBtn"><span class="glyphicon glyphicon-search"></button>
                <button class="btn btn-default btn-md" type="button" id="resetBtn"><span class="glyphicon glyphicon-fast-backward"></button>
            </div>
          </div>

       </div>
       <!-- col width 3 start -->      
       
       <!-- col width 2 start --> 
       <div class="col-sm-2 col-md-2 pull-right"> 
          <!-- Search button -->
          <button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#enterEventModal"><span class="glyphicon glyphicon-calendar"></button>
         &nbsp; <button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#DataModal"><span class="glyphicon glyphicon-list-alt"></button>
         &nbsp; <button type="button" class="btn btn-info btn-md"  data-toggle="modal" data-target="#shareForm"><span class="glyphicon glyphicon-share"></span></button>
      </div>
    </div>
          
          
    <div class="row">
        <div class="col-md-12">
          
          <div id="map"></div>

          
        </div>
    </div>
      

     
     
  <script>
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
      </script>
      <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBF2VwTjDiUFzvdA3IuQw_8H5JYq803bHs&callback=initMap">
      </script>

      
      <%- include('includes/modals/enterEvent-modal') %>
      <%- include('includes/modals/shareCalendar-modal') %>
      <%- include('includes/modals/changePw-modal') %>
      <%- include('includes/modals/Data-modal') %>    
          
          
<!-- container-fluid end -->      
</div>
<!-- container-fluid end -->
          
</body>
</html>
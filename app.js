var http = require('http'),
    https = require('https'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    ejs = require('ejs'),
    js2xmlparser = require('js2xmlparser'),
    libxslt = require('libxslt'),
    //Source: https://github.com/googlemaps/google-maps-services-js
    googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyBF2VwTjDiUFzvdA3IuQw_8H5JYq803bHs'
    }),
    session=require('express-session');

//https://www.npmjs.com/package/simple-encryptor
// Specify a string key:
var key = 'lqw5nco8123kas01ms810-12dl';
var encryptor = require('simple-encryptor')(key);

var router = express();
var server = http.createServer(router);

router.set('view engine', 'ejs');
router.use(express.static(path.resolve(__dirname, 'views')));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// https://www.npmjs.com/package/express-session
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// GET request to dislay index.html located inside /views folder
router.get('/', function(req, res) {
  
  if(!req.session.user) {
    res.render('login');
  } else {
    var json = fs.readFileSync('Appointments.json','utf8');
    var jsonParsed = JSON.parse(json);
    
    for(i = jsonParsed.appointment.length-1; i >= 0;i--){
      if(jsonParsed.appointment[i].who !== req.session.user.userid){  
        var shared = 0;
        for(j = 0; j < req.session.user.shared[0].received.length; j++){    
         // console.log(req.session.user.shared[0].received[j]);
          if(req.session.user.shared[0].received[j] === jsonParsed.appointment[i].who){
            //console.log('Received'+req.session.user.shared[0].received[j]);
            shared = 1;
          }
        }  
        if(shared !== 1) {
          // console.log('splice');
          jsonParsed.appointment.splice(i,1);
        } else {
          console.log('dont splice '+jsonParsed.appointment[i].who);
        }
      } 
    }
    var jsonStringified = JSON.stringify(jsonParsed);
    
    res.render('index', {'data': {'cal':jsonParsed,'user':req.session.user}});
  }
});
/*
var getXml = require('./custom_modules/get-xml');
router.get('/get/html', getXml.controller);

var getJson = require('.custom_modules/get-json');
router.get('/get/json', getJson.controller);*/

var getData = require('./custom_modules/get');

router.post('/get/json', getData.jsonCtrl);
router.get('/get/html', getData.xmlCtrl);

var postShare = require('./custom_modules/post-share');
router.post('/post/share',postShare.controller);



// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {
  
  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {

    // Read in a JSON file
    var JSONfile = fs.readFileSync('Appointments.json', 'utf8');

    // Parse the JSON file in order to be able to edit it
    var JSONparsed = JSON.parse(JSONfile);

    //Geolocation
    //var address = obj.where.toString().split(' ').join('+');

    googleMapsClient.geocode({
        address: obj.where
    }, function(err, response) {
        if (!err) {
          //Getting the longitude and latitude object and add it to the object
          obj.coords = response.json.results[0].geometry.location;
          obj.who = parseInt(obj.who);
          // Add a new record into country array within the JSON file
          JSONparsed.appointment.push(obj);

          // Beautify the resulting JSON file
          var JSONformated = JSON.stringify(JSONparsed, null, 4);

          // Write the updated JSON file back to the system
          fs.writeFileSync('Appointments.json', JSONformated);

          // Convert the updated JSON file to XML
          var XMLformated = js2xmlparser.parse("appointments", JSON.parse(JSONformated));

          // Write the resulting XML back to the system
          fs.writeFileSync('Appointments.xml', XMLformated);

        } else {console.log('Error:'+err)}
        return res.redirect('/');
    });
  }
  // Call appendJSON function and pass in body of the current POST request
  if(req.body.date.length > 0 && req.body.time.length > 0 && req.body.what.length > 0 && req.body.who.length > 0
      && req.body.where.length > 0) {
    appendJSON(req.body);
  } else {console.log("Details missing: "+req.body.date.length+", "+req.body.time.length+", "+req.body.what.length
  +", "+req.body.who.length+", "+req.body.where.length+", "+req.body.coords.length);}
  // Re-direct the browser back to the page, where the POST request came from
});

router.post('/login',(req,res)=>{
   
    var file = fs.readFileSync("users.json","utf-8");
    var loggedin = false;
    var users = JSON.parse(file).users;
    var username = req.body.username;
    var password = req.body.password;
    
    for(i=0;i<users.length;i++){
        if(users[i].username == username) {
          if(encryptor.decrypt(users[i].password) == password) {
            loggedin=true;
            delete users[i].password;
            var details = users[i];
            // Display loggedin user details
            // console.log(details);
            req.session.user=details;
            res.redirect('/?q=loggedin');
          }
        }
    }
    if(!loggedin) {res.redirect('/?q=login-error');}

});

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{

    });
    res.redirect('/')
})

router.post('/register',(req,res)=>{

    function writeToFile(obj) {
        var json =JSON.parse(fs.readFileSync('users.json','utf-8'));

        var user = {};
        user.userid = json.users.length+1;
        user.username = obj.username;
        user.first_name = obj.first_name;
        user.last_name = obj.last_name;
        //https://www.npmjs.com/package/simple-encryptor
        user.password = encryptor.encrypt(obj.passw);
        user.shared = [];
        user.shared.push({"received":[], "sent":[]});
      
        json.users.push(user);
        fs.writeFileSync('users.json',JSON.stringify(json));
        
        req.session.user = user;
        res.redirect('/');
    }

    writeToFile(req.body);

})


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

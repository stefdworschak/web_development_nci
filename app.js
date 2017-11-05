var http = require('http'),
    https = require('https'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    js2xmlparser = require('js2xmlparser'),
    libxslt = require('libxslt'),
    //Source: https://github.com/googlemaps/google-maps-services-js
    googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyBF2VwTjDiUFzvdA3IuQw_8H5JYq803bHs'
    });

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// GET request to dislay index.html located inside /views folder
router.get('/', function(req, res) {
  res.render('index');
});

// HTML produced by XSL Transformation
router.get('/get/html', function(req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });

    var docSource = fs.readFileSync('Appointments.xml', 'utf8');
    var stylesheetSource = fs.readFileSync('Appointments.xsl', 'utf8');

    var doc = libxslt.libxmljs.parseXml(docSource);
    var stylesheet = libxslt.parse(stylesheetSource);

    var result = stylesheet.apply(doc);

    res.end(result.toString());

});

router.get('/get/json', function(req, res) {

    res.writeHead(200, { 'Content-Type': 'application/json' });

    var JSONfile = fs.readFileSync('Appointments.json', 'utf8');
    var JSONparsed = JSON.parse(JSONfile);

    res.end(JSON.stringify(JSONparsed));

});

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

    /*console.log(address);
    var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyBF2VwTjDiUFzvdA3IuQw_8H5JYq803bHs'
    var latlong = https.get(geoUrl, (resp)=> {
      console.log(resp.results);
      obj.coords = resp;
    })*/
  }
  // Call appendJSON function and pass in body of the current POST request

  if(req.body.date.length > 0 && req.body.time.length > 0 && req.body.what.length > 0 && req.body.who.length > 0
      && req.body.where.length > 0) {
    appendJSON(req.body);
  } else {console.log("Details missing: "+req.body.date.length+", "+req.body.time.length+", "+req.body.what.length
  +", "+req.body.who.length+", "+req.body.where.length+", "+req.body.coords.length);}
  // Re-direct the browser back to the page, where the POST request came from


});
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

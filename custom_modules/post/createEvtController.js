var fs = require('fs'),
    js2xmlparser = require('js2xmlparser'),
    googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyBF2VwTjDiUFzvdA3IuQw_8H5JYq803bHs'
    });


module.exports = function(req, res) {
  
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
          obj.id = JSONparsed.appointment.length+1;
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
  if(req.body.date.length > 0 && req.body.time.length > 0 && req.body.what.length > 0 && req.body.who.length > 0 && req.body.where.length > 0) {
    appendJSON(req.body);
  } else {console.log("Details missing: "+req.body.date.length+", "+req.body.time.length+", "+req.body.what.length +", "+req.body.who.length+", "+req.body.where.length+", "+req.body.coords.length);}
  // Re-direct the browser back to the page, where the POST request came from
}
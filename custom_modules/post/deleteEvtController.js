var fs = require('fs'),
    js2xmlparser = require('js2xmlparser');

module.exports = function(req,res){
  
  function deleteRecord(record_id) {
    
    //try{
      record_id = Number(record_id) - 1;
      var retStr = "success";
      var JSONfile = fs.readFileSync('Appointments.json', 'utf8');
      var JSONparsed = JSON.parse(JSONfile);
      JSONparsed.appointment.splice(record_id,1);

      // Beautify the resulting JSON file
      var JSONformated = JSON.stringify(JSONparsed, null, 4);
      
      fs.writeFileSync('Appointments.json', JSONformated);

      // Convert the updated JSON file to XML
      var XMLformated = js2xmlparser.parse("appointments", JSON.parse(JSONformated));
  
      // Write the resulting XML back to the system
      fs.writeFileSync('Appointments.xml', XMLformated);
   // } catch(err) {
   //  retStr = "Not deleted";
   // }
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(retStr);
  }
  
  //Check if user is logged in
  if(!req.session.user) {
    res.render('login');
  } else { 
    deleteRecord(req.body.record_id);
  }
}
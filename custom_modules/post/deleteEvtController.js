var fs = require('fs');

module.exports = function(req,res){
  
  function deleteRecord(record_id) {
    
    try{
      var retStr = "success";
      var JSONfile = fs.readFileSync('Appointments.json', 'utf8');
      var JSONparsed = JSON.parse(JSONfile);
      var id = (record_id - 1); 
      JSONparsed.splice(id,1);

      fs.writeFileSync('Appointments.json', JSONformated);

      // Convert the updated JSON file to XML
      var XMLformated = js2xmlparser.parse("appointments", JSON.parse(JSONformated));

      // Write the resulting XML back to the system
      fs.writeFileSync('Appointments.xml', XMLformated);
    } catch(err) {
      
    }
  }
   
  deleteRecord(req.body.record_id);
}
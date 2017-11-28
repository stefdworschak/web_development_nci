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
    var x = require('libxmljs');

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

router.get('/Test', function(req,res){
var xsd = fs.readFileSync('Appointments.xsd', 'utf8')
var xsdDoc = x.parseXmlString(xsd.toString());
var xml0 = fs.readFileSync('Appointments.xml','utf8')
var xmlDoc0 = x.parseXmlString(xml0);
var result0 = xmlDoc0.validate(xsdDoc);
console.log("result0:", result0);
  res.end(result0.toString());
})


// GET request to dislay index.html located inside /views folder
var _get = require('./custom_modules/get');

router.get('/', _get.showIndex);
router.post('/get/json', _get.jsonCtrl);
router.get('/get/html', _get.xmlCtrl);
router.get('/logout',_get.logoutCtrl);


var _post = require('./custom_modules/post');

router.post('/login',_post.loginCtrl);
router.post('/register',_post.registerCtrl);
// POST request to add to JSON & XML files
router.post('/post/json', _post.createEvtCtrl);
router.post('/post/share', _post.shareCalCtrl);
router.post('/post/change_password', _post.changePwCtrl);
router.post('/post/delete_record',_post.deleteEvtCtrl);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

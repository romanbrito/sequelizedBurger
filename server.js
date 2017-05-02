var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
app.set('port', process.env.PORT || 8080);

// database models for syncing
var db = require("./models");

// Serve static content
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({extended: false}));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// set handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// require Routes with app.use
app.use(require('./controllers/burgers_controller.js'));

// Syncing our sequelize models and then starting our express app
// force: true to allow structure modifications in our database,
// this is the case with associations

 db.sequelize.sync({ force: true }).then(function () {
     var server = app.listen(app.get('port'), function () {
         console.log('Listening on port ' + app.get('port'));
     });
 });


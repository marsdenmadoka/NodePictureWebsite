var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler');
    moment = require('moment');
   // multer = require('multer');
    //upload = multer({ dest:path.join(__dirname,'public/upload/temp')})

module.exports = function(app) { //moving the routes to the routes folder

    app.use(morgan('dev'));
     //app.use(bodyParser({ uploadDir:path.join(__dirname, 'public/upload/temp')}));
    //app.use(multer({ dest: path.join(__dirname,'public/upload/temp')}));
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));

    routes(app);//moving the routes to routes folder.
     app.use('/public/', express.static(path.join(__dirname,'../public')));    
     
     if ('development' === app.get('env')) {
           app.use(errorHandler());
            }
            
    app.engine('handlebars', exphbs.create({ //setting our views as handlebars
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],

        helpers: { //helpers used to format a timestamp so that it is worded according to how long ago the event occurred.it uses moment npm
            timeago: function(timestamp) { //we can define any function we need i the helpers in our case here our function is timeago
            return moment(timestamp).startOf('minute').fromNow();
            }
            }
        }).engine);

     app.set('view engine', 'handlebars');
        
     return app;
    };
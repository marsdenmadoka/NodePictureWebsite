var express = require('express'),
mongoose = require('mongoose');

config = require('./server/configure'),
app = express();
app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);


mongoose.connect("mongodb://localhost/imgPloadr",{useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true}); 
mongoose.connection.on('open', function() {
console.log('Mongoose connected.');
});

app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
    });
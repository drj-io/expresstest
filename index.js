var express = require('express');
var app = express();


app.set('view engine', 'ejs');



app.get('/', function(req, res) {
  res.render('login', { title: 'The index page!', body: "" })
});







app.use('/', express.static(__dirname + '/public'));




// Start that server, baby
app.listen(1337, "localhost");
console.log("Server running at http://localhost:1337/"); 
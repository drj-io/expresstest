var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var users = 
    [
        {
            username: 'david',
            password: 'qwerty'
        },
        {
            username: 'joe',
            password: 'password'
        }
    ];







app.set('view engine', 'ejs');

app.get('/user', function(req, res) {
  res.render('login', { title: 'The index page!', body: "" })
});

app.post('/user/login',function(req,res){
    console.log( req.body.username, req.body.password);


    var validUser = false;

    users.forEach(function(user ,index){
        console.log(user.username);

        if((user.username == req.body.username) && (user.password == req.body.password)){
            console.log('found a valid user');
            validUser = user.username;


        }
    });
    
    if(validUser){
        res.send('you are authenticated!')
    }
    else{
        res.send('incorrect username and password!')
    }


});



app.use('/', express.static(__dirname + '/public'));




// Start that server, baby
app.listen(1337, "localhost");
console.log("Server running at http://localhost:1337/"); 
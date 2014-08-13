var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser')
var session = require('express-session');

//app.use(express.cookieParser);


app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat'
}));

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

app.get('/', function(req,res){
        if(checkUser(req,res)){ 

            res.send("you're good!");

        }
        else{
            res.send("you're not logged in");
        }

   
})


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
        
        req.session.user = validUser;
        
        res.send('you are authenticated, '+ validUser)
    }
    else{
        res.redirect('/user')
    }


});



app.use('/', express.static(__dirname + '/public'));




// Start that server, baby
app.listen(1337, "localhost");
console.log("Server running at http://localhost:1337/"); 


// Check to see if the user session is active on the user's browser
function checkUser(req,res){

     if (req.session.user) {
        return req.session.user;
    }
    else{
        return false;
    }
}
/*
    needed:
 

    GET  /user = login page
    POST /user/login = process login

    AUTHENTICATED

    GET / = home page 
    GET /properties/list           [html]
    GET /properties/view/#         [html]
    get /properties/delete/#       [form process]
    GET /properties/edit/#         [html]
    POST /properties/edit/#         [form process]

    GET /properties/create         [create html]
    POST /properties/create         [create process]

    GET /user/list
    GET /user/edit/#
    POST /user/edit/#
    get /user/delete/#


*/


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


var properties = [
        {
            address: '504 E Eisenhower Blvd, Loveland, CO 80513',
            phone: '800-541-3278',
            rating: 5,

        },
        {
            address: '4616 S Shields St, Fort Collins, CO 80526',
            phone: '970-226-2500',
            rating: 5
        }



];


app.set('view engine', 'ejs');

app.get('/', function(req,res){

        checkUser(req,res) 

        res.render('home',{ user:req.session.user});
   
});

/*

######  ######  ####### ######  ####### ######  ####### #     # 
#     # #     # #     # #     # #       #     #    #     #   #  
#     # #     # #     # #     # #       #     #    #      # #   
######  ######  #     # ######  #####   ######     #       #    
#       #   #   #     # #       #       #   #      #       #    
#       #    #  #     # #       #       #    #     #       #    
#       #     # ####### #       ####### #     #    #       #    

*/

app.get('/properties/list', function(req,res){
    user = checkUser(req,res);
    res.render('properties-list', {properties: properties } )
})


app.get('/properties/create', function(req,res){
    user = checkUser(req,res);
    res.render('properties-form', {type: 'create'})
})

app.post('/properties/create',function(req,res){
    user = checkUser(req,res);
    properties.push({
         address: req.body.address,
            phone: req.body.phone,
            rating: req.body.rating,
    });

    res.redirect('/properties/list');
})


app.get('/properties/edit/:id', function(req,res){
    user = checkUser(req,res);
    res.render('properties-form', {type: 'update', propertyId: req.params.id, properties: properties });
})

app.post('/properties/edit/:id', function(req, res){
    user = checkUser(req,res);
    properties[req.params.id] = {
            address: req.body.address,
            phone: req.body.phone,
            rating: req.body.rating,
    }

    res.redirect('/properties/list')
})

app.get('/properties/delete/:id', function(req,res){
    user = checkUser(req,res);
    properties.splice(req.params.id,1);
    res.redirect('/properties/list');
})


app.get('/properties/view/:id', function(req,res){
    user = checkUser(req,res);
    res.render('properties-view',{property: properties[req.params.id]})
})
 
/*



#     #  #####  ####### ######  
#     # #     # #       #     # 
#     # #       #       #     # 
#     #  #####  #####   ######  
#     #       # #       #   #   
#     # #     # #       #    #  
 #####   #####  ####### #     # 



*/

app.get('/user', function(req, res) {
  res.render('login', { title: 'The index page!' })
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
        
        res.redirect('/');
    }
    else{
        res.redirect('/user?error=401')
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
        res.redirect('/user');
        res.end();
    }
}
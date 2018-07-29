var express = require('express');
var app = new express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var user = require('./models/users');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static('images'));
app.use(express.static('models'));
app.use(express.static('views'));

app.listen(3000, function(){
  console.log("Server started at 3000");
});

app.get('/', function(req,res){
  res.sendFile("index.html");
});

app.get('/signup', function(req,res){
  res.sendFile(__dirname +"/views/signup.html");
});

app.get('/login', function(req,res){
  res.sendFile(__dirname + "/views/login.html");
});

app.post('/submit', function(req,res){
    var userObject = new user();
    userObject.fname = req.body.fname;
    userObject.lname = req.body.lname;
    userObject.email = req.body.email;
    userObject.mobile = req.body.mobile;
    userObject.dob = req.body.dob;
 
    var saltRounds = 13;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.pass, salt);
    userObject.pass = hash;

    userObject.save(function(err){
      if(err)
      {
       res.send("Error while saving");
      }
      else{
       res.send("Saved successfully");

      }

    });
});

app.post('/login', function(req,res){
    user.findOne({email: req.body.email}, function(err, user)
    { 
      if (err)
      {
        console.log("Error from Find query");
      }
      else if(!user)
      {
        console.log(" No match found for email", req.body.email);
      }
      else
      {
        console.log(user);
        valide_login = bcrypt.compareSync(req.body.pass, user.pass);
        if (valide_login)
          res.send("Authenticated");
        else
          res.send("Invalid authentication");
      }
    });
})
const express= require ('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=> res.sendFile('index.html',{root:__dirname}));

const port = process.env.PORT || 8080;
app.listen(port,()=> console.log('App listening on port',+port));




/* MONGOOSE SETUP */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MyDatabase');

const Schema= mongoose.Schema;

const UserDetail = new Schema({

	username : String ,
	password : String
});

const UserDetails = mongoose.model('userInfo',UserDetail,'userInfo');
/* PASSPORT SETUP */

const passport = require('Passport');

app.use(passport.initialize());
app.use(passport.session());

app.get('/success',(req,res)=> res.send("Welcome "+req.query.username+"!!"));
app.get('/error',(req,res)=> res.send("Error loging in"));
 
passport.serializeUser(function(id,cb){

	UserDetails.findById(id,function(err,user){

		cb(err,user);
	});
});


/* Passport local authentication */

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(

function(username,password,done){

UserDetails.findOne({

	username:username
},function(err,user){

	if(err){
		return done(err);
	}
	if(!user){
		return done(null,false);
	}
	if(user.password!=password)
	{
		return done(null,false);
	}
	return done(null, user);
}

);
}
	));

// Staff Login //
app.post('/login',
passport.authenticate('local',{failureRedirect:'/error'}),
function(req,res){

	res.sendfile('./courses.html');
}
	);


app.get('/login',function(req,res){

    res.sendfile("./student.html");
});


//Admin Login // 

app.post('/adminLogin',
passport.authenticate('local',{failureRedirect:'/error'}),
function(req,res){

	res.sendfile('./admin_fast.html');
}
	);


app.get('/adminLogin',function(req,res){

    res.sendfile("./adminLogin.html");
});


app.route({
    method: 'GET',
    path: '/1.png',
    handler: {
        file: '1.png'
    }
});


app.get('/adminDashboard',function(req,res){

    res.sendfile("./courses.html");
});

// user resgitration fusntion . new users are added here 
app.post('/adminDashboard',
	passport.authenticate('local',{failureRedirect:'/error'}),
	function(req,res){
    //var newUser = new UserDetails();
    var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        UserDetails.rollno = req.body.uname; 
        // Hash the password using SHA1 algorithm.
        UserDetails.password = req.body.pwd;
        


        console.log(UserDetails);

		//md5(non_existant); // This variable does not exist
       // sha1(non_existant);                  
       UserDetails.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        console.log("did u get fuckedup");
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added go check ur data "};
        }
        res.sendfile('./courses.html');

    });
   });
const express= require ('express');

const app = express();
var session = require('express-session');
var sess;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=> res.sendFile('index.html',{root:__dirname}));



const port = process.env.PORT || 4000;
app.listen(port,()=> console.log('App listening on port',+port));

app.set('view engine','jade');
app.use(express.static('Login_v13'));

app.use("/css", express.static(__dirname + '/public/css'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect to bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS for jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); //redirect to css bootstrap
app.use(express.static(__dirname +'Login_v2'));// used to acess the files in a directory

 
/* MONGOOSE SETUP */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MyDatabase');

const Schema= mongoose.Schema;
const Schema2=mongoose.Schema;

const UserDetail = new Schema({

	username:String,
	password:String,
	name:String,
	last_name:String,
	Gender:String,
	DOJoining: String,
	Department:String,
	Post_Held:String,
	Place:String,
	Casual_leave_credits:{
		n:String,
		active_now:String
	},
	Half_Pay_Credits:{
		n:String,
		active_now:String
	},
	earned_leave:{
		n:String,
		active_now:String
	},
	comuted_earned_left:String,
	earned_left:String,
	vacation_leave_count:String,
	leave_not_due_left:String,
	Children:[{name:String,age:String,DOB:String}],
	Num_Children:String,
	miscarriage_leaves_left:String,
	Maternity_leave_credit:String,
	Paternity_leave:{credit:String,max_num:String},
	Child_Adop_Leave:String,
	Child_care_leave:{credit:String,max_num:String},
	Extraordinary_leave:{active_now:String,Years_left:String}
});


const UserDetails = mongoose.model('employee',UserDetail,'employee');
//const UserCredentails = mongoose.model('staffInfo',UserCred,'staffInfo');
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
passport.authenticate('local'),
function(req,res){
	var User=new UserDetails();
	// confirm that user typed same password twice
		if (User.password !== req.body.passwordConf) {
				var err = new Error('Password Wrong');
				err.status = 400;
				res.send("password wrong");
				return next(err);
		}
		else if(User.username !==req.body.Username){
			var err = new Error('Usernames wrong');
				err.status = 400;
				res.send("Username wrong");
				return next(err);

		}

	else{	
	UserDetails.distinct().find({username:req.body.username},function(err,user){
			if(err){
                response = {"error" : true , "message" : "No courses found under the given rollno"};
            }else{
                response = {"error" : false , "message" : "data found"};
            }
            res.render('details',{"employee":user})

	});
}

	//res.sendfile('./login_v13/index.html');
	
} 
	);


app.get('/login',function(req,res){

    res.sendfile("./student.html");
});
app.get('/leave',function(req,res){

    res.sendfile("./leave.html");
});

app.post('/leave', function(req,res){
	var leave = UserDetails();
	var a = req.body.leavetype;
	var startdate = new Date (req.body.startdate);
	var enddate = new Date (req.body.enddate);
	var num_days = parseInt((enddate - startdate) / (24 * 3600 * 1000));
	console.log(num_days);
	switch (a) {
		case 'casual':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				if (doc.casual.credits - req.body.number < 0) {
					// show a pop-up
				}
				doc.Casual_leave_credits.n -= req.body.number;
				doc.save();
			});
			break;
		case 'halfpay':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.Half_Pay_Credits.n -= req.body.number;
				doc.save();
			});
			break;
		case 'commute':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.comuted_earned_left -= req.body.number;
				doc.save();
			});
			break;
		case 'earned':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.earned_left -= req.body.number;
				doc.save();
			});
			break;
		case 'vacation':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.earned_left -= req.body.number;
				doc.save();
			});
			break;
		case 'no_due':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.leave_not_due_left -= req.body.number;
				doc.save();
			});
			break;
		case 'maternity':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.Maternity_leave_credit -= req.body.number;
				doc.save();
			});
			break;
		case 'paternity':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.Paternity_leave.credit -= req.body.number;
				doc.save();
			});
			break;
		case 'adoption':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.Child_Adop_Leave -= req.body.number;
				doc.save();
			});
			break;
		case 'child_care':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.Child_care_leave.credit -= req.body.number;
				doc.save();
			});
			break;
		case 'extraordinary':
			UserDetails.findOne ({username:'Priya'}, function (err, doc) {
				doc.Extraordinary_leave.active_now -= req.body.number;
				doc.save();
			});
			break;
		default:
			console.log ('Invalid Leave Type');

	}
});

//Admin Login // 
var path = require('path');// This is used to resolve the path issues as we can not use ../ in node


app.post('/adminLogin',
passport.authenticate('local',{failureRedirect:'/error'}),
function(req,res){

	res.sendfile(path.resolve('admin_fast.html'));// using path to connec to the required fille 
}
	);


app.get('/adminLogin',function(req,res){

    res.sendfile("login_v2/index.html");
});


// Update User Information ***************************

app.get('/updateUser',function(req,res){

	res.sendfile("./Login_v13/index.html");

});

app.post('/updateUser',function(req,res){

	var addCred = new UserCredentails();

	var response = {};

	addCred.username = req.body.username;
	addCred.firstname= req.body.firstname;
	addCred.lastname= req.body.lastname;
	addCred.email= req.body.email;
	addCred.phone= req.body.phone;
	addCred.department= req.body.department;


	
	addCred.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        console.log("did u get fuckedup");
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added go check ur data "};
        }
         res.redirect('/userDetails')

    });


});

app.get('/userDetails',function(req,res){
	var addCred = new UserCredentails();

	var response = {};

UserCredentails.find({username:"prasanth"},function(err,staffIn){

		if(err){

			response = {"error" : true , "message" : "No courses found under the given rollno"};
		}
		else{
                response = {"error" : false , "message" : "data found"};
            }

            res.render('details',{staffInfo:staffIn})

	});
});

//  Admin Area User adding and other approvals 

app.get('/adminDashboard',function(req,res){

    res.sendfile("./courses.html");
});

// user resgitration fusntion . new users are added here 
app.post('/adminDashboard',function(req,res){
    //var newUser = new UserDetails();
    var response = {};
    var newUser = new UserDetails();

    // confirm that user typed same password twice
		if (newUser.username !== req.body.username) {
				var err = new Error('Username already Exists');
				err.status = 400;
				res.send("Please try again username already exists");
				return next(err);
		}

else{
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        newUser.username = req.body.uname;
        console.log("Please etop"+req.body.uname);
        // Hash the password using SHA1 algorithm.
        newUser.password = req.body.psw;
        newUser.name="Praaa";
        newUser.Gender="M";
        newUser.DOJoining="19-2-2016";
        newUser.Department="CSE",
        newUser.Post_Held="Assistant Prof",
        newUser.Place="F402",
        newUser.Casual_leave_credits.n="5";
        newUser.Casual_leave_credits.active_now="0";
        newUser.Half_Pay_Credits.n="10";
        newUser.Half_Pay_Credits.active_now="0";
        newUser.earned_leave.n="15";
        newUser.earned_leave.active_now="0";
        newUser.comuted_earned_left="240";
        newUser.earned_left="180";
        newUser.vacation_leave_count="0";
        newUser.leave_not_due_left="0";
        children=[{"name":"priya","age":"20","DOB":"Sat May 05 2018 21:12:30 GMT+0530 (IST)"}]
        newUser.Children=children;
        newUser.Num_Children="1";
        newUser.miscarriage_leaves_left="45";
        newUser.Maternity_leave_credit="180";
        newUser.Paternity_leave.credit="15";
        newUser.Paternity_leave.max_num="3";
        newUser.Child_Adop_Leave="180";
        newUser.Child_care_leave.credit="730";
        newUser.Child_care_leave.max_num="6";
        newUser.Extraordinary_leave.active_now="0";
        newUser.Extraordinary_leave.Years_left="5";
        console.log(newUser.username);

        console.log(newUser.password);

		//md5(non_existant); // This variable does not exist
       // sha1(non_existant);                  
       newUser.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        console.log("did u get fuckedup");
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added go check ur data "};
            console.log("data added ");
        }
        res.sendfile('./courses.html');

    });
}


   });
   
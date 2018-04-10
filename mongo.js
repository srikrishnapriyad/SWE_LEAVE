/* MONGOOSE SETUP */

const mongoose = require('mongoose');

var db=mongoose.connect('mongodb://localhost/MyDatabase');

const Schema= mongoose.Schema;

const UserDetail = new Schema({

	username : String ,
	password : String
});

const UserDetails = db.model('userInfo',UserDetail);
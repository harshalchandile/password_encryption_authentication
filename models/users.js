var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
fname: {type: String, required: true},
lname: {type: String, required: true},
mobile: {type: Number, required: true},
email: {type: String, required: true},
dob: {type: Date, required: true},
pass: {type: String, required: true}
}, {strict: true });


var User = mongoose.model('User', UserSchema);

mongoose.connect("mongodb://localhost:27017/user_db");


module.exports = User;
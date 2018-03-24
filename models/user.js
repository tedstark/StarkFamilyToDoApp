const mongoose = require('mongoose');

//User Schema
const UserSchema = mongoose.Schema({
  fullname: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  active: {type: Boolean, required: true}
});

//Export statement
const User = module.exports = mongoose.model('User', UserSchema);

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in models
let Task = require('../models/task');
let User = require('../models/user');

// Routes
  // DOM: Show 'Add a User' Page
  router.get('/add', function(req,res){
    res.render('page_useradd')
    title: "User Registration"
  })

  // POST: Add a User to DB
  router.post('/add', function(req,res){
    req.checkBody('input_fullname', 'Name is required').notEmpty();
    req.checkBody('input_username', 'User name is required').notEmpty();
    req.checkBody('input_email', 'Email address is required').notEmpty();
    req.checkBody('input_password', 'A password is required').notEmpty();
    req.checkBody('input_email', 'Email is not valid').isEmail();
    req.checkBody('input_password2', 'Passwords do not match').equals(req.body.input_password);

    // Error check and handling
    let errors = req.validationErrors();
    if(errors){
        res.render('page_useradd',{
            errors:errors
        });
    } else {
      // If no errors, create new user in DB
      let user = new User();
        user.fullname = req.body.input_fullname,
        user.username = req.body.input_username,
        user.email = req.body.input_email,
        user.password = req.body.input_password,
        user.openpwd = req.body.input_password,
        user.active = true,
        user.role = "guest"
      bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(user.password, salt, function (err, hash) {
              if (err) {
                  console.log(err);
              }
              user.password = hash;
              user.save(function(err){
                if(err){
                  console.log(err);
                  return;
                } else {
                    req.flash('success', 'User '+user.username+' added!');
                    res.redirect('/');
                  }
              });
          });
      })
    }
  });

  //DOM: Show 'User List' Page
  router.get('/view', function(req,res){
    User.find({}, function(err, users){
      if(err){
        console.log(err);
      } else {
        res.render('page_userlist', {
          users: users
        });
      }
    })
  });

  // DELETE: Removes user from database
  router.delete('/delete/:id', function (req,res) {
    let query = {_id:req.params.id}
    User.remove(query, function (err) {
      if(err){
        console.log(err);
      } else {
        res.send('Success');
        req.flash('success', 'Task deleted!');
      }
    });
  });

  // DOM: Show User Login Page
  router.get('/login',function (req,res) {
      res.render('page_userlogin');
  });

  // POST: User Login process
  router.post('/login', function (req,res,next){
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      badRequestMessage: 'Please enter username and password.', //Default: Missing credentials
      failureFlash: true
    })
    (req,res,next);
  })

  // DOM: Logout and show Login page_home
  router.get('/logout', function (req,res) {
      req.logout();
      req.flash('success', 'You are logged out!');
      res.redirect('/');
  });



// Export statement
module.exports=router;

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
require('dotenv').config();

//For Timestamp messages in console
require('console-stamp')(console, 'HH:MM:ss');

//Initialize statements
const app = express();
let Task = require('./models/task');
let env = process.env;
let db = mongoose.connection;

//Set Public folder path
app.use(express.static(path.join(__dirname, 'public')));

//Database related
  //DB Connection
  mongoose.connect(env.db_string);

  //Check DB connection
  db.once('open', function(err){
    console.log('Connection made to Database: '+env.db_name);
  })

  //Check for DB errors
  db.on('error', function(err){
    console.log(err);
  })

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');

//Middleware
  //Body Parser Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

//Routes
  //DOM: Show 'Home' Page
  app.get('/', function(req,res){
    res.render('page_home', {
      title: 'This is the app home page!'
    });
  });

  //DOM: Show 'Task List' Page
  app.get('/view/tasks', function(req,res){
    Task.find({}, function(err, tasks){
      if(err){
        console.log(err);
      } else {
        res.render('page_tasklist', {
          title: 'View Current Tasks',
          tasks: tasks
        });
      }
    })
  });

  //DOM: Show 'Add a Task' Page
  app.get('/add/task', function(req,res){
    res.render('page_taskadd', {
      title: 'Add a New Task'
    });
  });

  //POST: Add a Task to DB
  app.post('/add/task', function(req,res){
    let task = new Task();
    task.creator = req.body.input_Creator
    task.assignedTo = req.body.input_Assigned
    task.dueDate = req.body.input_DueDate
    task.tasktitle = req.body.input_Task
    task.taskbody = req.body.input_Body
    task.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
          // req.flash('success', 'Article added!');
          res.redirect('/view/tasks');
      }
    })
  });

  //DOM: Show a single Task page
  app.get('/view/task/:id', function (req,res) {
      Task.findById(req.params.id, function (err, task) {
          res.render('page_task', {
              task:task,
              tasktitle:task.tasktitle,
              assignedTo:task.assignedTo,
              dueDate:task.dueDate,
              taskbody:task.taskbody,
              creator:task.creator
          })
      });
  });

  //DOM: Show 'Edit a Task' Page
  app.get('/edit/task/:id', function(req,res){
    Task.findById(req.params.id, function(err, task){
      res.render('page_taskedit', {
        title: 'Edit a Task:',
        task:task
      });
    });
  });

  //POST: Edit a task in database
  app.post('/edit/task/:id', function(req,res){
      let task = {};
      task.assignedTo = req.body.input_Assigned
      task.dueDate = req.body.input_DueDate
      task.tasktitle = req.body.input_Task
      task.taskbody = req.body.input_Body
      let query = {_id:req.params.id};
      Task.update(query, task, function (err) {
          if(err){
              console.log(err);
              return;
          } else {
              // req.flash('success', 'Task updated!');
              res.redirect('/view/tasks');
          }
      })
  });

  // Delete article route, performs database delete
  app.delete('/delete/task/:id', function (req,res) {
    let query = {_id:req.params.id}
    Task.remove(query, function (err) {
      if(err){
        console.log(err);
      }
      res.send('Success');
    });
  });

//Start App Server
app.listen((process.env.PORT || 3000), function(){
  console.log('Server started on port 3000 (local) or '+process.env.PORT+'(heroku).');
});

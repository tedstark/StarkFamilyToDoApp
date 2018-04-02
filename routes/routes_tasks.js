const express = require('express');
const router = express.Router();
const dateformat = require('dateformat');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const moment = require('moment-timezone');

// Bring in models
let Task = require('../models/task');
let User = require('../models/user');

// Routes
  //DOM: Show 'Task List' Page
  router.get('/view', function(req,res){
    Task.find({}, function(err, tasks){
      if(err){
        console.log(err);
      } else {
        res.render('page_tasklist', {
          title: 'View All Tasks',
          tasks: tasks,
          moment:moment
        });
      }
    })
  });

  //DOM: Show 'My Task List' Page
  router.get('/view/mine', function(req,res){
    Task.find({}, function(err, tasks){
      if(err){
        console.log(err);
      } else {
        res.render('page_tasklist-self', {
          title: 'Tasks Assigned to Me',
          tasks: tasks,
          moment:moment
        });
      }
    })
  });

  //DOM: Show 'Sean's Task List' Page
  router.get('/view/sean', function(req,res){
    Task.find({}, function(err, tasks){
      if(err){
        console.log(err);
      } else {
        res.render('page_tasklist-sean', {
          tasks: tasks,
          moment:moment
        });
      }
    })
  });

  //DOM: Show 'Ryan's Task List' Page
  router.get('/view/ryan', function(req,res){
    Task.find({}, function(err, tasks){
      if(err){
        console.log(err);
      } else {
        res.render('page_tasklist-ryan', {
          tasks: tasks,
          moment: moment
        });

      }
    })
  });

  //DOM: Show 'Add a Task' Page
  //router.get('/add', ensureAuthenticated, function(req,res){
  router.get('/add', function(req,res){
      res.render('page_taskadd', {
      title: 'Add a New Task'
    });
  });

  //POST: Add a Task to DB
  router.post('/add', function(req,res){
    // req.checkBody('input_Creator', 'Creator is required').notEmpty();
    if (req.user.role!='child') {
      req.checkBody('input_Assigned', 'Assigned To is required').notEmpty();
    }
    req.checkBody('input_DueDate', 'Due Date is required').notEmpty();
    req.checkBody('input_Task', 'Task Title is required').notEmpty();
    // Get Errors and handle
    let errors = req.validationErrors();
    if(errors){
        res.render('page_taskadd',{
            title: 'Add a New Task',
            errors:errors
        });
    } else {
      let task = new Task();
      task.creator = req.user.fullname;
      console.log(req.user.role);
      if (req.user.role=='child') {
        task.assignedto = req.user.fullname
      } else {
        task.assignedto = req.body.input_Assigned
      }
      task.duedate = moment.tz(req.body.input_DueDate, 'America/Phoenix')
      task.tasktitle = req.body.input_Task
      task.taskbody = req.body.input_Body
      task.complete = false
      task.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
            console.log(task);
            req.flash('success', 'Task added!');
            res.redirect('/tasks/view');
          }
      });
      }
    });

    //DOM: Show 'Edit a Task' Page
    router.get('/edit/:id', function(req,res){
      Task.findById(req.params.id, function(err, task){
        res.render('page_taskedit', {
          task:task,
          edittask:task.tasktitle,
          moment:moment
        });
      });
    });

  //POST: Edit a task in database
  router.post('/edit/:id', function(req,res){
      let task = {};
      task.assignedto = req.body.input_Assigned
      task.duedate = moment.tz(req.body.input_DueDate, 'America/Phoenix')
      task.tasktitle = req.body.input_Task
      task.taskbody = req.body.input_Body
      if (req.body.input_Checked=='completed') {
        task.complete=true
      } else {
        task.complete=false
      }
      console.log(task.duedate);
      let query = {_id:req.params.id};
      Task.update(query, task, function (err) {
          if(err){
              console.log(err);
              return;
          } else {
              console.log(task);
              req.flash('success', 'Task updated!');
              res.redirect('/tasks/view/mine');
          }
      })
  });

  // DELETE: Removes task from database
  router.delete('/delete/:id', function (req,res) {
    let query = {_id:req.params.id}
    Task.remove(query, function (err) {
      if(err){
        console.log(err);
      } else {
      res.send('Success');
      req.flash('success', 'Task deleted!');
      }
    });
  });

  //DOM: Show a single Task page
  router.get('/view/:id', function (req,res) {
      Task.findById(req.params.id, function (err, task) {
        User.findById(task.creator, function(err,user){
          res.render('page_task', {
              task:task,
              tasktitle:task.tasktitle,
              assignedto:task.assignedto,
              duedate:dateformat(task.duedate, 'fullDate'),
              taskbody:task.taskbody,
              creator:task.creator,
              created:dateformat(task.created, 'fullDate'),
              complete:task.complete
          });
        })
      });
  });

  //POST: Mark a task complete in database via form
  router.post('/complete/:id', function(req,res){
    let task = {};
    if (req.body.input_Checked=='completed') {
      task.complete=true
    } else {
      task.complete=false
    }
    let query = {_id:req.params.id};
    Task.update(query, task, function (err) {
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Task Completed!');
            res.redirect('/tasks/view/:id');
        }
      })
  });

  //POST: Mark a task complete in database via list button
  router.post('/clickcomp/:id', function(req,res){
    let task = {};
    task.complete=true
    let query = {_id:req.params.id};
    Task.update(query, task, function (err) {
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Task Completed!');
            res.redirect('/tasks/view/');
        }
      })
  });

  // Access control
  // User Authentication scheme to prevent manual add/edit url entry not working; app hangs on authenticated user access.
  function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
      return next;
    } else {
      req.flash('danger', 'Please login.');
      res.redirect('/');
    }
  }

module.exports = router;

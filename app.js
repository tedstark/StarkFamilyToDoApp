const express = require('express');
const path = require('path')
//Initialize app
const app = express();

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');

//Home Route
app.get('/', function(req,res){
  res.render('index', {
    title: 'To Do App Coming Soon!'
  });
});

//Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000')
});

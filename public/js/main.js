$(document).ready(function () {
  init();
});

function init(){
  deleteTask();
  deleteUser();
  completeTask();
}

function deleteTask () {
$('.delete-task').on('click', function (task) {
      $target = $(task.target);
      var id = $target.attr('data-id');
      $.ajax({
          type:'DELETE',
          url: '/tasks/delete/'+id,
          success: function (response) {
            location.reload(true);
            // window.location.href='/tasks/view/mine';
            req.flash('success', 'Task deleted!');
          },
          error: function (err) {
              console.log(err);
          }
      });
  });
}

function deleteUser () {
$('.delete-user').on('click', function (user) {
      console.log('Click!');
      $target = $(user.target);
      var id = $target.attr('data-id');
      $.ajax({
          type:'DELETE',
          url: '/users/delete/'+id,
          success: function (response) {
            location.reload(true);
            req.flash('success', 'User deleted!');
          },
          error: function (err) {
              console.log(err);
          }
      });
  });
}
function completeTask () {
$('.complete-task').on('click', function (task) {
      $target = $(task.target);
      var id = $target.attr('data-id');
      $.ajax({
          type:'POST',
          url: '/tasks/clickcomp/'+id,
          success: function (req,res) {
            location.reload(true);
            req.flash('success', 'Task completed!');
          },
          error: function (err) {
              console.log(err);
          }
      });
  });
}

function skelNavBar() {
    var navId = document.getElementById("myNavBar");
    if (navId.className === "navbar") {
        navId.className += " responsive";
    } else {
        navId.className = "navbar";
    }
    var iconId = document.getElementById("iconId");
    if (iconId.className === "navbar-item-icon") {
        iconId.className += " responsive";
    } else {
        iconId.className = "navbar-item-icon";
    }
    var homeId = document.getElementById("homeId");
    if (homeId.className === "navbar-item-home") {
        homeId.className += " responsive";
    } else {
        homeId.className = "navbar-item-home";
    }
    var tasksId = document.getElementById("tasksId");
    if (tasksId.className === "navbar-item-left") {
        tasksId.className += " responsive";
    } else {
        tasksId.className = "navbar-item-left";
    }
    var usersId = document.getElementById("usersId");
    if (usersId.className === "navbar-item-left") {
        usersId.className += " responsive";
    } else {
        usersId.className = "navbar-item-left";
    }
    var logId = document.getElementById("logId");
    if (logId.className === "navbar-item-right") {
        logId.className = "navbar-item-left responsive";
        logId.firstChild.className = "navbar-link";
    } else {
        logId.className = "navbar-item-right";
    }
}
$(document).ready(function () {
  init();
});

function init(){
  deleteTask();
  deleteUser();
  completeTask();
};

function deleteTask () {
$('.delete-task').on('click', function (task) {
      $target = $(task.target);
      var id = $target.attr('data-id');
      $.ajax({
          type:'DELETE',
          url: '/tasks/delete/'+id,
          success: function (response) {
            location.reload(true)
            // window.location.href='/tasks/view/mine';
            req.flash('success', 'Task deleted!');
          },
          error: function (err) {
              console.log(err);
          }
      });
  });
};

function deleteUser () {
$('.delete-user').on('click', function (user) {
      console.log('Click!');
      $target = $(user.target);
      var id = $target.attr('data-id');
      $.ajax({
          type:'DELETE',
          url: '/users/delete/'+id,
          success: function (response) {
            location.reload(true)
            req.flash('success', 'User deleted!');
          },
          error: function (err) {
              console.log(err);
          }
      });
  });
};
function completeTask () {
$('.complete-task').on('click', function (task) {
      $target = $(task.target);
      var id = $target.attr('data-id');
      $.ajax({
          type:'POST',
          url: '/tasks/clickcomp/'+id,
          success: function (req,res) {
            location.reload(true)
            req.flash('success', 'Task completed!');
          },
          error: function (err) {
              console.log(err);
          }
      });
  });
};

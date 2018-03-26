$(document).ready(function () {
  init();
});

function init(){
  deleteTask();
  deleteUser();
};

function deleteTask () {
$('.delete-task').on('click', function (e) {
      $target = $(e.target);
      var id = $target.attr('data-id');
      $.ajax({
          type:'DELETE',
          url: '/tasks/delete/'+id,
          success: function (response) {
            window.location.href='/tasks/view'; //Why can't I make this a different location in the views?
            req.flash('success', 'Task deleted!');
          },
          error: function (err) {
              console.log(err);
          }
      });
  });
};

function deleteUser () {
$('.delete-user').on('click', function (e) {
      console.log('Click!');
      $target = $(e.target);
      var id = $target.attr('data-id');
      $.ajax({
          type:'DELETE',
          url: '/users/delete/'+id,
          success: function (response) {
            window.location.href='/users/view'; //Why can't I make this a different location in the views?
          },
          error: function (err) {
              console.log(err);
          }
      });
  });
};

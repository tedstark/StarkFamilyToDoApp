$(document).ready(function () {
  init();
});

function init(){
  deleteButton();
};

function deleteButton () {
$('.delete-task').on('click', function (e) {
    $target = $(e.target);
    // console.log($target.attr('data-id'));
    var id = $target.attr('data-id');
    $.ajax({
        type:'DELETE',
        url: '/delete/task/'+id,
        success: function (response) {
          console.log(response);
          window.location.href='/'; //Why can't I make this a different location in the views?
        },
        error: function (err) {
            console.log(err);
        }
    });
  });
};

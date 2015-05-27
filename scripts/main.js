$('nav li').on('click', function() {
  $('section').removeClass('show');
  $('this').addClass('show');
});



// Additional way to do this below:

// $('section').addClass('show');
// $('section:first').removeClass('hidden');

// $('nav li').on('click', function() {
//   $(section).first().addClass('show');
//   $(this).removeClass('show');

// });

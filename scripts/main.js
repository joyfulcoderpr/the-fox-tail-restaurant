$('#home').on('click', function() {
  $('section').removeClass('show');
  $('.home').addClass('show');
});

$('#menu').on('click', function() {
  $('section').removeClass('show');
  $('.menu').addClass('show');
});

$('#reservation').on('click', function() {
  $('section').removeClass('show');
  $('.reservations').addClass('show');
});

$('#gallery').on('click', function() {
  $('section').removeClass('show');
  $('.gallery').addClass('show');
});

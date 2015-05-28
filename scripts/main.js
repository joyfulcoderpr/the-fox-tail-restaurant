$('#home').on('click', function() {
  $('section').removeClass('show');
  $('.home').addClass('show');
  $('.jumbotron').html('<img src="http://placekitten.com/1438/500">');
});

$('#menu').on('click', function() {
  $('section').removeClass('show');
  $('.menu').addClass('show');
  $('.jumbotron').html('<img src="https://placeimg.com/1438/500/any">');
});

$('#reservation').on('click', function() {
  $('section').removeClass('show');
  $('.reservations').addClass('show');
  $('.jumbotron').html('<img src="http://dummyimage.com/1438x500">');
});

$('#gallery').on('click', function() {
  $('section').removeClass('show');
  $('.gallery').addClass('show');
  $('.jumbotron').html('<img src="http://placehold.it/1438x500">');
});

// Tabs working to change visibility of content divs

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

// Get restaurant API information

var getMenu = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/menu-1');

var appTemplate = $('#appTemplate').text();
var appFunction = _.template(appTemplate);

getMenu.done(function (data) {
  var appArray = data.appetizers;
  console.log(appArray);

  appArray.forEach( function(d) {

    $('.appetizers').append(appFunction(d));

  });

});

var entreeTemplate = $('#entreeTemplate').text();
var entreeFunction = _.template(entreeTemplate);

getMenu.done(function (data) {
  var entreeArray = data.entrees;
  console.log(entreeArray);

  entreeArray.forEach( function(d) {

    $('.entrees').append(entreeFunction(d));

  });

});

var sidesTemplate = $('#sidesTemplate').text();
var sidesFunction = _.template(sidesTemplate);

getMenu.done(function (data) {
  var sidesArray = data.sides;
  console.log(sidesArray);

  sidesArray.forEach( function(d) {

    $('.sides').append(sidesFunction(d));

  });

});


// getMenu.done(function (apps) {
//   var appArray = apps.appetizers;
//   console.log(appArray.description);
// });

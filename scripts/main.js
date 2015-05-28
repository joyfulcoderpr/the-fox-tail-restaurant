// Tabs working to change visibility of content divs
// --------------------------------------------------

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

// Get menu API information
// ----------------------------------------------------

var getMenu = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/menu-1');

var appTemplate = $('#appTemplate').html();
var appFunction = _.template(appTemplate);
var entreeTemplate = $('#entreeTemplate').html();
var entreeFunction = _.template(entreeTemplate);
var sidesTemplate = $('#sidesTemplate').html();
var sidesFunction = _.template(sidesTemplate);

getMenu.done(function (data) {

  var appArray = data.appetizers;
  appArray.forEach( function(d) {
    $('.appetizers').append(appFunction(d));
  });

  var entreeArray = data.entrees;
  entreeArray.forEach( function(d) {
    $('.entrees').append(entreeFunction(d));
  });

  var sidesArray = data.sides;
  sidesArray.forEach( function(d) {
    $('.sides').append(sidesFunction(d));
  });

});

// Get Photos
//---------------------------------------------------

//Jumbotron:





// var getPhotos = $getJSON('https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&' + key + '&user_id=' + id + '&format=json');


// Get today's news JSON data
// --------------------------------------------------


var getNews = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/news/latest');

// Drop today's news into DOM

var newsTemplate = $('#latestNews').html();
var newsFunction = _.template(newsTemplate);

getNews.done(function (data) {
  $('.left').append(newsFunction(data));
});


// Get daily special JSON data
// --------------------------------------------------


var getSpecial = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/menu/special');

// Drop daily special into DOM

// var specialTemplate = $('#todaySpecial').html();
// var specialFunction = _.template(specialTemplate);

// getSpecial.done(function (data) {
//   $('.center').append(specialFunction(data));
// });


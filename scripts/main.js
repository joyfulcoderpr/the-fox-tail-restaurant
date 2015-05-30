// Tabs working to change visibility of content divs
// --------------------------------------------------

$('#home').on('click', function() {
  $('section').removeClass('show');
  $('.home').addClass('show');
  $('.jumboPhoto').html('<img src="' + jumboPhoto[0] + '" alt="interior">');
  $('.jumbotron').removeClass('jumbotronhide');

});

$('#menu').on('click', function() {
  $('section').removeClass('show');
  $('.menu').addClass('show');
  $('.jumbotron').html('<img src="' + jumboPhoto[2] + '" alt="interior">');
  $('.jumbotron').removeClass('jumbotronhide');
});

$('#reservation').on('click', function() {
  $('section').removeClass('show');
  $('.reservations').addClass('show');
  $('.jumbotron').html('<img src="' + jumboPhoto[1] + '" alt="interior">');
  $('.jumbotron').removeClass('jumbotronhide');
});

$('#gallery').on('click', function() {
  $('section').removeClass('show');
  $('.gallery').addClass('show');
  $('.jumbotron').addClass('jumbotronhide');
});

// Get menu API information & Today's Special Information
// ----------------------------------------------------

var getMenu = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/menu-1');

var getSpecial = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/menu/special');


var appFunction = _.template($('#appTemplate').html());
var entreeFunction = _.template($('#entreeTemplate').html());
var sidesFunction = _.template($('#sidesTemplate').html());


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

  getSpecial.done(function (data) {
    entreeArray.forEach (function(n) {
      if (n.id === data.menu_item_id) {
        $('.center').html('<h3>Today\'s Special</h3>' + '<h4>' + n.item + '</h4>' + '<span>' + '$' + n.price + '</span>' + '<p>' + n.description + '</p>');
      }
    });
  });
});


// Get Photos
//---------------------------------------------------

//Jumbotron:
var getPhotos = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f79a18a2e0ac49a0f6a51f3e70979e93&gallery_id=5704-72157653610526022&format=json&nojsoncallback=1&auth_token=72157653702578331-fefccb385a023355&api_sig=2b8e0732d1beaedd881251f8bee94a41');

var jumboTemplate = _.template($('#loadImage').text());
var jumboPhoto = [];

getPhotos.done(function (data){
  var photoArray = data.photos.photo;
  console.log(photoArray);

_.each(photoArray, function(x){
  photoUrl = 'https://farm' + x.farm + '.staticflickr.com/' + x.server + '/' + x.id + '_' + x.secret + '_b.jpg';
  jumboPhoto.push(photoUrl);
});

// $('.jumboPhoto').append('<img src="' + jumboPhoto[0] + '" alt="interior fox tail">');

  });

// Get today's news JSON data
// --------------------------------------------------


var getNews = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/news/latest');

// Drop today's news into DOM
// ----------------------------------------------------


var newsTemplate = $('#latestNews').html();
var newsFunction = _.template(newsTemplate);

getNews.done(function (data) {
  $('.left').append(newsFunction(data));
});


// Send off reservation request and return thank you
// ----------------------------------------------------


$('#reserveBtn').on('click', function () {
  $('form').replaceWith('<div class="thankyou">' + '<h4>Thank you for your reservation request!</h4>' + '<p>You will receive an email once your reservation is confirmed.</p>' + '<div class=thankyouimg><img src="images/foxtail_sm_notag.png"></div>' + '</div>');
});

// Datepicker
// ----------------------------------------------------


$(function() {
    $( "#datepicker" ).datepicker();
  });

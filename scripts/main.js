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

// Get menu API information & Today's Special Information
// ----------------------------------------------------

var getMenu = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/menu-1');

var getSpecial = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/menu/special');

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







// $('#slide').append(jumboTemplate(photoUrl));

  });



// Get today's news JSON data
// --------------------------------------------------


var getNews = $.getJSON('http://private-anon-a6cb7aa40-restaurantapi.apiary-mock.com/news/latest');

// Drop today's news into DOM

var newsTemplate = $('#latestNews').html();
var newsFunction = _.template(newsTemplate);

getNews.done(function (data) {
  $('.left').append(newsFunction(data));
});



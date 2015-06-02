// Get Photos
//---------------------------------------------------

//Jumbotron:
var getPhotos = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=45429579e7f11356e93d8ebd381ea7e8&gallery_id=133510446-72157653610526022&format=json&nojsoncallback=1&auth_token=72157651559562774-45f2447a2b19a07b&api_sig=d59cc4f5de3fcc82e5f9d67a8ae69708');
var jumboPhoto = [];

getPhotos.done(function (data){
  var photoArray = data.photos.photo;
  // console.log(photoArray);

  _.each(photoArray, function(x){
    photoUrl = 'https://farm' + x.farm + '.staticflickr.com/' + x.server + '/' + x.id + '_' + x.secret + '_b.jpg';
    jumboPhoto.push(photoUrl);

  });

  $('.jumbotron').html('<img src="' + jumboPhoto[0] + '" alt="interior">');

});

// Tabs to change visibility of content divs on click
// ---------------------------------------------------

$('#home').on('click', function() {
  $('section').removeClass('show');
  $('.home').addClass('show');
  $('.jumbotron').html('<img src="' + jumboPhoto[0] + '" alt="interior">');
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


// Sticky Nav script
// --------------------------------------------

var nav = $('.main-nav');
    navS = 'nav-scrolled';
    hdr = $('header').height();

$(window).scroll(function(){
  if( $(this).scrollTop() > hdr) {
    nav.addClass(navS);
  } else {
    nav.removeClass(navS);
  }
});


// Get menu API & Today's Special and drop into DOM
// ---------------------------------------------------------

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
        $('.specialText').html('<h3>Today\'s Special</h3>' + '<h4>' + n.item + '</h4>' + '<span>' + '$' + n.price + '</span>' + '<p>' + n.description + '</p>');
      }
    });
  });


  // Menu icon hovers
  // ----------------------------------------------------

  $('.iconallergy')
    .mouseover( function() {
      $(this).addClass('allergyhover');
    })
    .mouseout(function() {
      $(this).removeClass('allergyhover');
    });

  $('.iconspicy')
    .mouseover( function() {
      $(this).addClass('allergyhover');
    })
    .mouseout(function() {
      $(this).removeClass('allergyhover');
    });

  $('.iconvegan')
    .mouseover( function() {
      $(this).addClass('allergyhover');
    })
    .mouseout(function() {
      $(this).removeClass('allergyhover');
    });

  $('.iconfav')
    .mouseover( function() {
      $(this).addClass('allergyhover');
    })
    .mouseout(function() {
      $(this).removeClass('allergyhover');
    });

});


// Gallery photos from API and drop into DOM
// ----------------------------------------------------

var galleryPhotos = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=45429579e7f11356e93d8ebd381ea7e8&gallery_id=133510446-72157653252100120&format=json&nojsoncallback=1&auth_token=72157651559562774-45f2447a2b19a07b&api_sig=43a3d85b3145fb62cd01b44244584b56');

galleryPhotos.done(function (data){
  var picArray = data.photos.photo;

  _.each(picArray, function(x){
    flickrUrl = 'https://farm' + x.farm + '.staticflickr.com/' + x.server + '/' + x.id + '_' + x.secret + '_m.jpg';
    item = '<li><img src="' + flickrUrl + '"></li>';
    $('.gallerypics').append(item);
  });

  // .bottom photos into DOM
  var scallopPhoto = galleryPhotos.responseJSON.photos.photo[12];

  var scallopUrl = 'https://farm' + scallopPhoto.farm + '.staticflickr.com/' + scallopPhoto.server + '/' + scallopPhoto.id + '_' + scallopPhoto.secret + '_m.jpg';

  var scallop = '<img src="' + scallopUrl + '">';

  $('.specialPhoto').append(scallop);
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


// Send off reservation request and return thank you with reservation details
// ----------------------------------------------------------------------------

$('#reserveBtn').on('click', function () {
  var fullName = $('#fullName').val();
  var guestCount = $('#guestCount').val();
  var date = $('#datepicker').val();
  var time = $('#time').val();
  var seatPreference = $('#seatPreference').val();
  var email = $('#email').val();

  $('form').replaceWith('<div class="thankyou">' + '<h4>Thank you for your reservation request, ' + fullName + '!</h4>' + '<p>You will receive an email at ' + email + ' once your reservation is confirmed.</p>' + '<div class=thankyouimg><img src="images/foxtail_sm_notag.png"></div>' + '</div>' + '<div class="details"><h5>Your reservation request details</h5><ul><li>Full Name: ' + fullName + '</li><li>Number of Guests: ' + guestCount + '</li><li>Date: ' + date + '</li><li>Time: ' + time + '</li><li>Seating Preference: ' + seatPreference + '</li><li>Email address: ' + email + '</li><p>Please contact us at <a href="#">contact@thefoxtail.co</a> if you have any changes to your reservation.</p></ul></div>');
});


// Datepicker script for reservations page
// ----------------------------------------------------

$(function() {
    $( "#datepicker" ).datepicker();
  });




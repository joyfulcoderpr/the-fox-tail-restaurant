// Get Photos
//---------------------------------------------------

//Jumbotron:
var getPhotos = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ce4c4ab1f01efa66fe9fa6bc41aadf31&gallery_id=5704-72157653610526022&format=json&nojsoncallback=1&auth_token=72157653385845390-dcac529a9c9805e9&api_sig=ffce53b912142536032f4359b9b45535');
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

// Tabs working to change visibility of content divs
// --------------------------------------------------

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
// ------------------

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

  // Menu hovers

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


//Gallery:
var galleryPhotos = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ce4c4ab1f01efa66fe9fa6bc41aadf31&gallery_id=5704-72157653252100120&format=json&nojsoncallback=1&auth_token=72157653385845390-dcac529a9c9805e9&api_sig=bf2695962c68c070d401531327f31e64');

galleryPhotos.done(function (data){
  var picArray = data.photos.photo;
  // console.log(picArray);

  _.each(picArray, function(x){
    flickrUrl = 'https://farm' + x.farm + '.staticflickr.com/' + x.server + '/' + x.id + '_' + x.secret + '_m.jpg';
    item = '<li><img src="' + flickrUrl + '"></li>';
    $('.gallerypics').append(item);
  });

});

// .bottom photos

// var scallopId = galleryPhotos.getJSON.photos.photo[12].id;

// console.log(scallopId);

// var scallopPhoto = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=3239914f679fa2d80b51c024c204c603&gallery_id=5704-72157653252100120&format=json&nojsoncallback=1&auth_token=72157653361381008-aee496a7304e7beb&api_sig=c682db5d762abb745b9830aaff4d311b');

// scallopPhoto.done(function (scallop) {
//   scallopId = scallop.responseJSON.photos.photo[12].id;
// });


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



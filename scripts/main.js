// Tabs working to change visibility of content divs
// --------------------------------------------------

$('#home').on('click', function() {
  $('section').removeClass('show');
  $('.home').addClass('show');
  // $('.jumboPhoto').html('<img src="' + jumboPhoto[0] + '" alt="interior">');
  $('.jumbotron').removeClass('jumbotronhide');

});

$('#menu').on('click', function() {
  $('section').removeClass('show');
  $('.menu').addClass('show');
  // $('.jumbotron').html('<img src="' + jumboPhoto[2] + '" alt="interior">');
  $('.jumbotron').removeClass('jumbotronhide');
});

$('#reservation').on('click', function() {
  $('section').removeClass('show');
  $('.reservations').addClass('show');
  // $('.jumbotron').html('<img src="' + jumboPhoto[1] + '" alt="interior">');
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
      $('.iconhoverspicy').addClass('allergyhover');
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




// Get Photos
//---------------------------------------------------

// //Jumbotron:
// var getPhotos = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=7aac400281b1bc0bff4bc7a81a09b057&gallery_id=5704-72157653610526022&format=json&nojsoncallback=1&auth_token=72157653650521746-4e55ac60f0f23e94&api_sig=dab45a9ec106d13a772c176c0858dcb6');
// var jumboPhoto = [];

// getPhotos.done(function (data){
//   var photoArray = data.photos.photo;
//   console.log(photoArray);

//   _.each(photoArray, function(x){
//     photoUrl = 'https://farm' + x.farm + '.staticflickr.com/' + x.server + '/' + x.id + '_' + x.secret + '_b.jpg';
//     jumboPhoto.push(photoUrl);
//   });
// });

// //Gallery:
// var galleryPhotos = $.getJSON('https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=7aac400281b1bc0bff4bc7a81a09b057&gallery_id=5704-72157653252100120&format=json&nojsoncallback=1&auth_token=72157653650521746-4e55ac60f0f23e94&api_sig=300f81251a0e71d06e0ad80c22a4f849');
// var galleryArr = [];

// galleryPhotos.done(function (data){
//   var picArray = data.photos.photo;
//   console.log(picArray);

//   _.each(picArray, function(x){
//     flickrUrl = 'https://farm' + x.farm + '.staticflickr.com/' + x.server + '/' + x.id + '_' + x.secret + '_m.jpg';
//     galleryArr.push(flickrUrl);
//   });

// galleryArr.forEach(function(item){
//   item = '<li><img src="' + galleryArr[0] + '"></li>'

//   $('.gallerypics').append(item)});
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



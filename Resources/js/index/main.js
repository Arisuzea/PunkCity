(function () {
  'use strict';

  // Slideshow paths
  var CREDIT = '@unilluminatedsideofthesun on Instagram';

  var SS_SLIDES = [
    { src: '/static/screenshots/01.png', caption: 'Enhanced Graphics'              },
    { src: '/static/screenshots/02.png', caption: 'An immersive experience'         },
    { src: '/static/screenshots/03.png', caption: 'Explore Night City your way'     },
    { src: '/static/screenshots/04.png', caption: 'The world reacts to your actions'},
    { src: '/static/screenshots/05.jpg', caption: 'Deep connections in a shallow city — ' + CREDIT },
    { src: '/static/screenshots/06.jpg', caption: 'Night City, breathing and bleeding — ' + CREDIT },
    { src: '/static/screenshots/07.jpg', caption: 'Prime merc work: messy, loud, and lucrative — ' + CREDIT },
    { src: '/static/screenshots/08.jpg', caption: 'Brutal takedowns have never felt this good — ' + CREDIT },
    { src: '/static/screenshots/09.jpg', caption: "MaxTac isn't your only problem anymore — " + CREDIT },
    { src: '/static/screenshots/10.jpg', caption: 'Total narrative freedom. Your V, your rules — ' + CREDIT },
    { src: '/static/screenshots/11.jpg', caption: 'Build your squad. Survive together — ' + CREDIT },
    { src: '/static/screenshots/12.jpg', caption: 'Beauty in the decay. — ' + CREDIT },
    { src: '/static/screenshots/13.jpg', caption: "Some gigs are just pest control. Jotaro's reign ends tonight — " + CREDIT },
    { src: '/static/screenshots/14.jpg', caption: "What you can't see will kill you — " + CREDIT },
    { src: '/static/screenshots/15.jpg', caption: 'Night City is yours for the taking — ' + CREDIT },
  ];


  Navigation.init();
  Slideshow.init('slideshow', SS_SLIDES);

})();

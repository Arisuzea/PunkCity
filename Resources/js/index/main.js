(function () {
  'use strict';

  // Slideshow paths
  var CREDIT = '@unilluminatedsideofthesun on Instagram';

  var SS_SLIDES = [
    { src: '/Resources/screenshots/01.png', caption: 'Enhanced Graphics'              },
    { src: '/Resources/screenshots/02.png', caption: 'An immersive experience'         },
    { src: '/Resources/screenshots/03.png', caption: 'Explore Night City your way'     },
    { src: '/Resources/screenshots/04.png', caption: 'The world reacts to your actions'},
    { src: '/Resources/screenshots/05.jpg', caption: 'Deep connections in a shallow city — ' + CREDIT },
    { src: '/Resources/screenshots/06.jpg', caption: 'Night City, breathing and bleeding — ' + CREDIT },
    { src: '/Resources/screenshots/07.jpg', caption: 'Prime merc work: messy, loud, and lucrative — ' + CREDIT },
    { src: '/Resources/screenshots/08.jpg', caption: 'Brutal takedowns have never felt this good — ' + CREDIT },
    { src: '/Resources/screenshots/09.jpg', caption: "MaxTac isn't your only problem anymore — " + CREDIT },
    { src: '/Resources/screenshots/10.jpg', caption: 'Total narrative freedom. Your V, your rules — ' + CREDIT },
    { src: '/Resources/screenshots/11.jpg', caption: 'Build your squad. Survive together — ' + CREDIT },
    { src: '/Resources/screenshots/12.jpg', caption: 'Beauty in the decay. — ' + CREDIT },
    { src: '/Resources/screenshots/13.jpg', caption: "Some gigs are just pest control. Jotaro's reign ends tonight — " + CREDIT },
    { src: '/Resources/screenshots/14.jpg', caption: "What you can't see will kill you — " + CREDIT },
    { src: '/Resources/screenshots/15.jpg', caption: 'Night City is yours for the taking — ' + CREDIT },
  ];


  Navigation.init();
  Slideshow.init('slideshow', SS_SLIDES);

})();

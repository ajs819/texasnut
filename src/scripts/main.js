(function($) {
  "use strict";

  // PRELOAD
  $(window).on('load', function() {
    $('#container').show();
  })

  // PARALLAX
  // align first section top
  if ($('.section:first-child .rellax').length) {
    var rellax = new Rellax('.section:first-child .rellax');
  }
    
  // align other sections center
  if ($('.section:not(:first-child) .rellax').length) {
    var rellax = new Rellax('.section:not(:first-child) .rellax', {
      center: true
    });
  }

  // ANIMATE ON SCROLL
  $(window).on('load', function() {
    AOS.init();
  });

})( jQuery );
(function($) {
  "use strict";

  /*
   * PARALLAX
   */

  // align first section top
  var rellax = new Rellax('.section:first-child .rellax');
  
  // align other sections center
  var rellax = new Rellax('.section:not(:first-child) .rellax', {
    center: true
  });

})( jQuery );
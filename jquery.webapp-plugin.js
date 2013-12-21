(function($) {

  var settings = {
    common : {
    }
  };

  // define current app container
  var app = null;

  var apps = {

    // common init function
    // 'this' is app container
    //
    commonInit : function( opts ) {
      var self = app = this;

      // extends default settings
      //
      settings.common = $.extend( settings.common, {} );
      settings = $.extend( settings, opts );

      // run dynamic bind events for broswer events
      //
      $(document).ready( function(evt){

        // get custom onready events
        var onready = $._data( $(app).get(0), 'events' );
        if( undefined !== onready && undefined !== onready.onready ) {
          $(app).trigger('onready');
        }

      } );

      $(window).resize( function(evt){

        // get custom onresize events
        var onresize = $._data( $(app).get(0), 'events' );
        if( undefined !== onresize && undefined !== onresize.onresize ) {
          $(app).trigger('onresize');
        }

      });

      return app;
    },

    // homepage init function
    // 'this' is app container
    //
    homepageInit : function( opts ) {

      // extends default settings
      //
      settings.homepage = $.extend( settings.homepage, {} );
      settings = $.extend( settings, opts );

      // define global app obj is current app container
      //
      app = this;

      // if selector get more than one dom nodes, here will run multi times
      return this.each(function() {
        var self = this;
        $(this).on('onready', function(evt){ console.log(this, evt); });
      });

    }

  };

  // some common functions
  var libs = {

    // get image's real size
    // 'this' is a img DOM object
    // return array()
    // [ width, height ] px
    //
    imgRealSize : function( opts ) {
      var img = new Image();
      img.src = this.src;
      return [img.width, img.height];
    }
  };

  // define jquery plugin
  //
  $.fn.webapp = function( opts ) {
    if( typeof opts == 'string' && apps[opts+'Init'] ) {
      apps.commonInit.apply( this, Array.prototype.slice.call(arguments, 1) );
      return apps[opts+'Init'].apply( this, Array.prototype.slice.call(arguments, 1) );
    } else if ( typeof opts === 'object' || !opts ) {
      return apps.commonInit.apply( this, Array.prototype.slice.call(arguments, 0) );
    } else {
      $.error( 'Application ' + opts + ' does not exist.' );
    }
  };

})(jQuery);

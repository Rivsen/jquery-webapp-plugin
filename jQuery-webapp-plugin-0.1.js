(function($) {

  var settings = {
    common : {
    }
  };

  var apps = {

    // common init function
    // 'this' is app container
    //
    commonInit : function( opts ) {
      var self = this;

      settings.common = $.extend( settings.common, {} );
      settings = $.extend( settings, opts );

      // run dynamic bind events for broswer events
      //
      $(window).resize( function(){ libs.onResize.run.apply( self, {} ); } );
      $(document).ready( function(){ libs.onDocumentReady.run.apply( self, {} ); } );

      return this;
    },

    // example init function
    // 'this' is app container
    //
    exampleInit : function( opts ) {

      settings.example = $.extend( settings.example, {} );
      settings = $.extend( settings, opts );

      return this.each(function() {
        var self = this;
        // ...
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

  // some events
  //
  var events = {

    // call this function when window resize
    // 'this' is app container
    //
    onResize : {
      run : function() {
        for( i in libs.onResize.callbackList ) {
          if( typeof libs.onResize.callbackList[i] === 'function' ) {
            libs.onResize.callbackList[i].apply( this, {} );
            console.log('Resize event run ' + i);
          }
        }
      },
      callbackList : {}
    },

    // call this function when document is ready
    // 'this' is app container
    //
    onDocumentReady : {
      run : function() {
        for( i in libs.onDocumentReady.callbackList ) {
          if( typeof libs.onDocumentReady.callbackList[i] === 'function' ) {
            libs.onDocumentReady.callbackList[i].apply( this, {} );
            console.log('Document ready event run ' + i);
          }
        }
      },
      callbackList : {}
    }

  };

  // define jquery plugin
  //
  $.fn.webapp = function( opts ) {

    if( apps[opts] ) {

      apps.commonInit.apply( this, Array.prototype.slice.call(arguments, 1) );
      return apps[opts].apply( this, Array.prototype.slice.call(arguments, 1) );

    } else if ( typeof opts === 'object' || !opts ) {

      apps.commonInit.apply( this, Array.prototype.slice.call(arguments, 0) );
      return apps.exampleInit.apply( this, Array.prototype.slice.call(arguments, 0) );

    } else {

      $.error( 'Application ' + opts + ' does not exist.' );

    }
  };

})(jQuery);

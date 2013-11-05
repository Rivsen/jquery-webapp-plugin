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
      var self = this;

      // extends default settings
      //
      settings.common = $.extend( settings.common, {} );
      settings = $.extend( settings, opts );

      // run dynamic bind events for broswer events
      //
      $(document).ready( function(){ events.run.apply( self, ['onDocumentReady'] ); } );
      $(window).resize( function(){ events.run.apply( self, ['onResize'] ); } );

      return this;
    },

    // example init function
    // 'this' is app container
    //
    exampleInit : function( opts ) {

      // extends default settings
      //
      settings.example = $.extend( settings.example, {} );
      settings = $.extend( settings, opts );

      // define global app obj is current app container
      //
      app = this;

      return this.each(function() {
        var self = this;
        // ...

        // bind custom event here
        // you can do this in any where
        //
        events.run.apply( self, ['onExample'] );
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
    },

    // example lib, just print a message in js console
    //
    exampleLib : function( opts ) {
      console.log( this );
      return true;
    }
  };

  // some events
  //
  var events = {

    // run a event
    //
    run : function( evt ) {
      if( events[evt] ) {
        for( i in events[evt] ) {
          if( typeof events[evt].callbackList[i] === 'function' ) {
            events[evt].callbackList[i].apply( this, {} );
            console.log(events[evt].title + ' event run ' + i);
          }
        }
      }
    },

    // call this function when window resize
    // 'this' is app container
    //
    onResize : {
      title : 'Window Resize',
      callbackList : {}
    },

    // call this function when document is ready
    // 'this' is app container
    //
    onDocumentReady : {
      title : 'Document Ready',
      callbackList : {}
    },

    // on example event
    // 'this' is app container
    //
    onExample : {
      title : 'Example',
      callbackList : {
        example : libs.exampleLib.apply( app, [{}] );
      }
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

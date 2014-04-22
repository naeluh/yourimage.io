/*overlay.js*/

$(document).ready(function () {
    $("#load_overlay").on("click", function () {
        $('.main-container').css('background-image', '');
        $('#main_overlay').css('opacity', '1');
        $('#main_overlay').css('display', 'block');
        $('#main_overlay').css('visibility', 'visible');

         $.ajax({
              url: '/layout_modal/loadOne.html',
              cache: true
            })
              .done(function( html ) {
                $('#main_overlay').append( html );
              });


    });
});

/*
                  jQuery.cachedScript = function( url, options ) {

              // Allow user to set any option except for dataType, cache, and url
              options = $.extend( options || {}, {
                dataType: "script",
                cache: true,
                url: url
              });

              // Use $.ajax() since it is more flexible than $.getScript
              // Return the jqXHR object so we can chain callbacks
              return jQuery.ajax( options );
            };

                 $.cachedScript( "js/paper.js" ).done(function( script, textStatus ) {
              console.log( textStatus );
            });
        $.cachedScript( "js/paper_splat.js" ).done(function( script, textStatus ) {
              console.log( textStatus );
            });
        $.cachedScript( "js/vid.js" ).done(function( script, textStatus ) {
              console.log( textStatus );
            });


         $.ajax({
              url: '/layout_modal/loadOne.html',
              cache: true
            })
              .done(function( html ) {
                $('#main_overlay').append( html );
              });


            $.ajax({
              url: '/layout_modal/loadOne.html',
              data: 'foo',
              success: function(data){
                $('#main_overlay').append(data);
              },
              cache: true
            });


         $.get('/layout_modal/loadOne.html', { "_": $.now() } , function(data) {
           $('#main_overlay').append(data);
        });
*/





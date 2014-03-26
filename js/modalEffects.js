/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var ModalEffects = (function() {

	function init() {

		var overlay = document.querySelector( '.md_overlay' );

		[].slice.call( document.querySelectorAll( '.md_trigger' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				close = modal.querySelector( '.md_close' );

			function removeModal( hasPerspective ) {
				classie.remove( modal, 'md_show' );

				if( hasPerspective ) {
					classie.remove( document.documentElement, 'md_perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( classie.has( el, 'md_setperspective' ) );
			}

			el.addEventListener( 'click', function( ev ) {
				classie.add( modal, 'md_show' );
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );

				if( classie.has( el, 'md_setperspective' ) ) {
					setTimeout( function() {
						classie.add( document.documentElement, 'md_perspective' );
					}, 25 );
				}
			});

			close.addEventListener( 'click', function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			});

		} );

	}

	init();

})();

                        /* FileSaver.js demo script
                         * 2012-01-23
                         *
                         * By Eli Grey, http://eligrey.com
                         * License: X11/MIT
                         *   See LICENSE.md
                         */

                        /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/demo/demo.js */


                        var canvas = document.getElementById("mycanvas");
                        var canvas_options_form = document.getElementById("canvas-options");
                        var canvas_filename = document.getElementById("canvas-filename");

                        canvas_options_form.addEventListener("submit", function(event) {
                                event.preventDefault();
                                       canvas.toBlob(function (blob) {
                                        saveAs(
                                        blob, (canvas_filename.value || canvas_filename.placeholder) + ".png");
                                    }, "image/png");
                            }, false);



     

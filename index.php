<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7">
  <![endif]-->
  <!--[if IE 7]>
  <html class="no-js lt-ie9 lt-ie8">
    <![endif]-->
    <!--[if IE 8]>
    <html class="no-js lt-ie9">
      <![endif]-->
      <!--[if gt IE 8]><!-->
      <html class="no-js">
        <!--<![endif]-->
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
          <title>yourimage.io</title>
          <meta name="description" content="click and move your mouse to paint and collage with random images from the internet"/>
          <meta name = "viewport" content = "user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta property="og:url" content="http://yourimage.io/"/>
          <meta property="og:title" content="YourImage - paint with images from the internet"/>
          <meta property="og:image" content="http://yourimage.io/53325eb219b87.png"/>
          <meta property="og:site_name" content="yourimage.io by nick hulea"/>
          <meta property="og:description" content="click and move your mouse to paint and collage with random images from the internet"/>
          <link rel="stylesheet" href="css/normalize.min.css"/>
          <link rel="stylesheet" href="css/main.min.css"/>
        </head>
        <body>
          <div id="contain">
            <div id="preloader" style="display:none;">
            <div id="bar"></div>
            <div id="status">
            <span id="percentage"></span>
              <b>Instructions:</b><br><br>
              <b>Mouse Move</b> = painting (speed effects the weight of the stroke)<br><br>
              <b>Mouse Click</b> = new image from the Internet<br><br>
              <b>Spacebar</b> = opens a window where you see and save your image<br><br>
            </div>
            </div>
            <div id="outerTools" class="flip-container" style="display:none;font-family:monospace;">
              <div class="flipper">
                <div id="innerTools" class="front">
                  <div class="centerImage">
                    <img id="myImg" style="background-color:#fff;max-width:100%;margin:0auto;" src="">
                    </div>
                    <div id="saveImage">save</div>
                    <form xmlns="http://www.w3.org/1999/xhtml" id="canvas-options">
                      <div id="name_download">
                        <input type="hidden" class="filename" id="canvas-filename" placeholder="yourimage">
                      </div>
                    </form>
                  </div>
                <div id="info">2014 v1.0 <em><a href="mailto:naeluh@gmail.com" target="_blank">nick hulea</a></em></div>
                </div>
              </div>
              <canvas resize="true" id="mycanvas" ></canvas>
          <?php //} ?>
          </div>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
            <script src="http://files.hulea.org/paperjs-v0.9.18/dist/paper-full.min.js"></script>
            <?php require_once 'Mobile_Detect.php'; $detect = new Mobile_Detect; if ( $detect->isMobile() ) { ?>
            <script type="text/paperscript" src="js/yourimage.mobi.min.js" canvas="mycanvas"></script>
            <?php } else { ?>
            <script type="text/paperscript" src="js/yourimage.min.js" canvas="mycanvas"></script>
            <?php } ?>
            <script src="js/plugins.js"></script>
            <script> 
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
              ga('create', 'UA-49368313-1', 'yourimage.io');
              ga('send', 'pageview');   
            </script>
        </body>
      </html>

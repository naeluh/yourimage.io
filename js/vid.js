
var video;
var n = navigator;

var viewportWidth = $(window).width();
var viewportHeight = $(window).height();




var $vidCanvas = $("<canvas width="+viewportWidth+" height="+viewportHeight+"></canvas>");
var vidCanvas = $vidCanvas[0];
var ctx = vidCanvas.getContext("2d");

//vidCanvas.width = 300;
//vidCanvas.height = 150;
//vidCanvas.style.cssText = 'width:100%;z-index:1000000000;';
console.log(vidCanvas.width);
console.log(vidCanvas.height);
console.log(vidCanvas);
console.log($vidCanvas);


function onSuccess(stream) {
    video = document.createElement('video');
    var source;

    /*
    if (stream) {
        var url = window.URL || window.webkitURL;
        if (url) {
            source = url.createObjectURL(stream);
        } else {
            source = stream;
        }
    } else {
        source = "http://eyahuska.com/vid/IMG_2240.webm";
    }
    */

    source = "http://eyahuska.com/vid/IMG_2240.webm";


    video.src = source;
    video.loop = true;
    video.load();
    video.play();

    console.log(source);
    console.log(video.width);
    console.log(video.height);
}

    onSuccess(null);
/*
function onError(e) {
    console.log("Error getting video cam");
    console.log(arguments);
    onSuccess(null);
}


n.getUserMedia_ = n.getUserMedia ||
                    n.webkitGetUserMedia ||
                    n.mozGetUserMedia ||
                    n.msGetUserMedia;


if (n.getUserMedia_) {
    try {
        n.getUserMedia_({video: true, audio: false}, onSuccess, onError);
    } catch (e) {
        n.webkitGetUserMedia('video', onSuccess, onError);
    }
} else {
    onSuccess(null);
}
*/




/*
var video;
var n = navigator;
var $vidCanvas = $('<canvas></canvas>');
//var $vidCanvas = $('<canvas id="vid" width='+(viewportwidth / 5.25)+' height='+ (viewportheight / 5.25)+'></canvas>');
var vidCanvas = $vidCanvas[0];
//vidCanvas.width = 300;
//$($vidCanvas).css('width','10%');

var ctx = vidCanvas.getContext("2d");
function onSuccess(stream) {
    video = document.createElement('video');
    var source;

    if (stream) {
        var url = window.URL || window.webkitURL;
        if (url) {
            source = url.createObjectURL(stream);
        } else {
            source = stream;
        }
    } else {
                source = "http://eyahuska.com/vid/IMG_2240.webm";
    }

    video.src = source;
    video.width = 100;
    video.height = 100;
    video.loop = true;
    video.load();
    video.play();

    //console.log(vidCanvas.width);
    console.log($vidCanvas);
    console.log($vidCanvas[0].style['width']);

    //console.log("Video dimensions");
    //console.log(video.width);
    //console.log(video.height);
}

function onError(e) {
    console.log("Error getting video cam");
    console.log(arguments);
    onSuccess(null);
}

n.getUserMedia_ = n.getUserMedia ||
                    n.webkitGetUserMedia ||
                    n.mozGetUserMedia ||
                    n.msGetUserMedia;

if (n.getUserMedia_) {
    try {
        n.getUserMedia_({video: true, audio: false}, onSuccess, onError);
    } catch (e) {
        n.webkitGetUserMedia('video', onSuccess, onError);
    }
} else {
    onSuccess(null);
}
*/

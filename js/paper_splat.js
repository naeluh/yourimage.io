var r, path, raster, background, imagesrc;
var preloadAmount = 10;
var cache = [];
var imgurcache = [];
var rArray = [];
var convertedArray = [];
var ajaxlength = [];
var autoShowNext = false;
var loaded = false;
var value = isNaN(value) ? 0 : value;
var valueajax = isNaN(valueajax) ? 0 : valueajax;
var press = isNaN(press) ? 0 : press;
var cvs = document.getElementById("mycanvas");
var canvas_options_form = document.getElementById("canvas-options");
var canvas_filename = document.getElementById("canvas-filename");   
var clearCanvas = false;

/*
var components = {
    size: {
        type: "slider",
        label: "Thickness",
        min: 1,
        max: 100,
        onChange: function (value) {
            tool.maxDistance = 200 / value
        }
    }
};
var palette = new Palette("Drawing", components);
*/

function base64(url) {
        var dataURL;
        var img = new Image(),
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            src = url; // insert image url here

        img.crossOrigin = "Anonymous";

        img.onload = function() {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            canvas = null;
            preload(dataURL);
        };
        img.src = url;
}

/*
function convertImgToBase64(url, callback, outputFormat) {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    var img = new Image;
    img.crossOrigin = "Anonymous";
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || "image/png");
        dude = dataURL;
        callback.call(this, dataURL);
        canvas = null
    };
    img.src = url
}
function convertImages(urlList) {
    var promiseList = [];
    promiseList = urlList.map(function (url) {
        var dfd = new $.Deferred;
        convertImgToBase64(url, function (img) {
            dfd.resolve(img)
        });
        return dfd.promise()
    });
    return $.when.apply(this, promiseList)
}
*/

function extractToken(hash) {
    var match = hash.match(/access_token=(\w+)/);
        return !!match && match[1]
}

var num = Math.floor(Math.random() * 50);
var token = extractToken(document.location.hash);
var clientId = "b144351ffb05838";
var auth;

if (token) authorization = "Bearer " + token;
else authorization = "Client-ID " + clientId;

$.ajax({
    url: "https://api.imgur.com/3/gallery/random/random/page=" + num,
    method: "GET",
    headers: {
        Authorization: authorization,
        Accept: "application/json"
    },
    crossDomain: true,
    data: {
        image: localStorage.dataBase64,
        type: "base64"
    },
    beforeSend: function () {
        $("#preloader").css("display", "block")
    },
    success: handleData
});

function handleData(result) {
        $.each(result.data, function (idx, image) {
            if (result.data[idx].animated === false) {
                if (result.data[idx].is_album === false) {
                var rimgur = image.link;

                console.log(rimgur);

                ajaxlength.push({
                imageamount: valueajax++
                });

                var newimage = base64(rimgur);
            }
        }
    });
}

init();
var carryLength = 0;

function onFrame(event){
    if(clearCanvas && project.activeLayer.hasChildren()){
        project.activeLayer.removeChildren();
        clearCanvas = false;
    }
}

function onMouseDown(event) {
    console.log(press);
    if (press === 0) {
    if (!loaded) return;
    init();
    path.position = event.point;
    path2.position = event.point;
    }
    if (press === 1) {
    }
}

function onMouseMove(event) {
    console.log(press);
    if (press === 0) {
    if (!loaded) return;
    var step = event.delta;
    step.angle = step.angle + 270;
    stepReci = step.normalize() * 200 * (1 / step.length);
    var top = event.middlePoint + stepReci;
    var bottom = event.middlePoint - stepReci;
    carryLength = carryLength + step.length;
    if (carryLength > stepReci.length) {
        path.add(top);
        path.insert(0, bottom);
        path.smooth();
        path2.add(top);
        path2.insert(0, bottom);
        path2.smooth();
        carryLength = 0;
    }
    }
    if (press === 1) {
    }
}



function init() {
    if (cache.length) {
        var numberofclicks = value++;
        var clearCanvas = true;

        console.log('imgurcache: ' + imgurcache.length);
        console.log('numberofclicks: ' + numberofclicks);
        console.log(numberofclicks == (imgurcache.length - 15));

        if (numberofclicks == (imgurcache.length - 15)) {
        console.log('new');
        getMoreImages();
        }

        var img = cache.shift();

        //console.log(img);
        autoShowNext = false;
        r = new Raster(img.source);
        r.position = view.center;
        r.size = view.bounds;
        r.on("load", function () {
            onResize()
        });
        rArray.push(r);
        path = new Path.Circle;
        path2 = new Path.Circle({
            fillColor: "black",
            shadowColor: "black",
            shadowBlur: 32
        });
        path.position = view.center;
        path2.position = view.center;
        g = new Group([path, r]);
        g.clipped = true;

    } else autoShowNext = true
}

function preload(dataURL) {
        imgurcache.push({
            image: dataURL
        });

        if (ajaxlength.length == imgurcache.length) {
            $('#preloader').fadeOut('slow');
            console.log('done');
        }

        var img = new Image();
        img.onload = function() {
            cache.push({
                source: img,
                position: view.center,
                size: view.bounds
            });
            if (cache.length < preloadAmount) {
                preload();
            }
            if (autoShowNext) {
                init();
            }
        };

        imgun = (dataURL === undefined);
        if(!imgun){
        img.src = dataURL;
        }

        if (imgurcache.length == 2){
            start();
        }
}

/*
function preload() {
    var imagesrc = imgurcache[value++];
    console.log((imagesrc === undefined));
    if (imagesrc === undefined){
    getMoreImages();
    }
    convertImages([imagesrc.source]).done(function () {
        convertedArray.push(arguments);
        var img = new Image;
        img.onload = function () {
            cache.push({
                source: img,
                position: view.center,
                size: view.bounds
            });
            if (cache.length < preloadAmount) preload();
            if (autoShowNext) init()
        };
        var valuearr = isNaN(valuearr) ? 0 : valuearr;
        var i = 0;

        if (1 < cache.length < 1) if (1 < convertedArray.length < 1) {
            raster = new Raster(arguments[0]);
            raster.position = view.center;
            raster.size = view.bounds;
            raster.on("load", function () {
                loaded = true;
                onResize()
            });
            path = new Path.Circle;
            path2 = new Path.Circle({
                fillColor: "red",
                shadowColor: "red",
                shadowBlur: 32
            });
            path.position = view.center;
            path2.position = view.center;
            g = new Group([path, raster]);
            g.clipped = true;
            $("#preloader").fadeOut("slow");
        }

        img.src = arguments[0]
    })
}
*/

function start() {
        /*
        background = new Raster('http://eyahuska.com/draw_image_v2/css/img/back.png');
        background.position = view.center;
        background.size = view.bounds;
        background.on("load", function () {
            loaded = true;
            onResize()
        });
        */

        raster = new Raster(imgurcache[0].image);
        raster.position = view.center;
        raster.size = view.bounds;
        raster.on("load", function () {
            loaded = true;
            onResize()
        });
        path = new Path.Circle;
        path2 = new Path.Circle({
            fillColor: "black",
            shadowColor: "black",
            shadowBlur: 12
        });
        g = new Group([path, raster]);
        g.clipped = true;
}

function onResize(event) {
    if (background) background.fitBounds(view.bounds, true);
    if (raster) raster.fitBounds(view.bounds, true);
    if (rArray.length) rArray.forEach(function (el) {
        el.fitBounds(view.bounds, true);
        el.position = view.center;
    })
}

function getMoreImages(){
    function extractToken(hash) {
    var match = hash.match(/access_token=(\w+)/);
        return !!match && match[1]
    }
    var num = Math.floor(Math.random() * 50);
    var token = extractToken(document.location.hash);
    var clientId = "b144351ffb05838";
    var auth;
    if (token) authorization = "Bearer " + token;
    else authorization = "Client-ID " + clientId;
    $.ajax({
        url: "https://api.imgur.com/3/gallery/random/random/page=" + num,
        method: "GET",
        headers: {
            Authorization: authorization,
            Accept: "application/json"
        },
        crossDomain: true,
        data: {
            image: localStorage.dataBase64,
            type: "base64"
        },
        beforeSend: function () {
            $("#preloader").css("display", "block")
        },
        success: handleData
    });

    function handleData(result) {
        $.each(result.data, function (idx, image) {
            if (result.data[idx].animated === false) if (result.data[idx].is_album === false) {
                var rimgur = image.link;

                ajaxlength.push({
                imageamount: valueajax++
                });

                var newimage = base64(rimgur);
            }
        });
    }
}

$(document).keyup(function (evt) {
        var $outside = $("#outerTools");
        var $inside = $("#innerTools");   
        if (evt.keyCode == 32) {
            press++;
            if (press === 1) {
                var imgtosave = cvs.toDataURL("image/png");
                document.getElementById("myImg").src = imgtosave;

                    /* console.log(fd) */

                
                $outside.show();
                //$inside.show();

            }
            if (press === 2) {
                $outside.hide();
                //$inside.hide();
                press = 0;
            }
    }   
});

$("#saveImage").on("click",function(){
    var imgtosave = cvs.toDataURL("image/png");
    document.getElementById("myImg").src = imgtosave;
    cvs.toBlob(function (blob) {
    saveAs(
    blob, (canvas_filename.value || canvas_filename.placeholder) + ".png");
    console.log(blob);

    $.ajax({
        type: "POST",
        data: {imagetosave : imgtosave},
        url:"saveimage.php",
        success:function(data){
        //alert(data);
        }
    });

    }, "image/png");
    return false;
});


//btnStop.addEventListener("click", function () {
    //project.clear();
    //alert('clear');
    //tool.onMouseDown = null;
    //tool.onMouseMove = null;
//});


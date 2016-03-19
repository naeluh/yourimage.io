
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
var pre = document.getElementById("preloader");
var clearCanvas = false;

function base64(url) {
    var dataURL;
    var img = new Image,
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        src = url;
    img.crossOrigin = "Anonymous";
    img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        canvas = null;
        preload(dataURL)
    };
    img.src = url
}
function extractToken(hash) {
    var match = hash.match(/access_token=(\w+)/);
    return !!match && match[1]
}
var num = Math.floor(Math.random() * 50);
var token = extractToken(document.location.hash);
var clientId = "clientId";
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
            ajaxlength.push({
                imageamount: valueajax++
            });
            var rimgur = image.link;
            var newimage = base64(rimgur);
            $("#percentage").html('<b>0%</b>');

        }
    })
}
init();
var carryLength = 0;

function onFrame(event) {
    if (clearCanvas && project.activeLayer.hasChildren()) {
        project.activeLayer.removeChildren();
        clearCanvas = false
    }
}

function onMouseDown(event) {
    if (press === 0) {
        if (!loaded) return;
        init();
        path.position = event.point;
        path2.position = event.point
    }
}

function onMouseMove(event) {
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
            carryLength = 0
        }
    }
}

function init() {
    if (cache.length) {
        var numberofclicks = value++;
        var clearCanvas = true;
        if (numberofclicks == imgurcache.length - 15) getMoreImages();
        var img = cache.shift();
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
        g.clipped = true
    } else autoShowNext = true
}

function preload(dataURL) {
    imgun = dataURL === undefined;
    imgurcache.push({
        image: dataURL
    });
    var percent = Math.round(Number(imgurcache.length) / Number(ajaxlength.length) * 100);
    var ic = Number(imgurcache.length);
    var ac = Number(ajaxlength.length);
    if (percent >= 0 && percent <= 100) {
        $("#bar").css("width", percent + "%");
        $("#percentage").html('<b>'+percent + "%</b>");
    }
    if (percent >= 100) {
        $("#percentage").html('<b>Finishing Up...</b>');
    }
    if (ic == ac) setTimeout(function () {
        $("#preloader").fadeOut(250);
        $("#bar").fadeOut(250);
        $("#bar").css("width", 0);
        percent = 0;
    }, 1E3);
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
    if (!imgun) img.src = dataURL;
    if (imgurcache.length == 2) start()
}
function start() {
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
    g.clipped = true
}

function onResize(event) {
    if (background) background.fitBounds(view.bounds, true);
    if (raster) raster.fitBounds(view.bounds, true);
    if (rArray.length) rArray.forEach(function (el) {
        el.fitBounds(view.bounds, true);
        el.position = view.center
    })
}

function getMoreImages() {
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
                ajaxlength.push({
                    imageamount: valueajax++
                });
                var rimgur = image.link;
                var newimage = base64(rimgur);
                $("#percentage").html('<b>0%</b>');
            }
        })
    }
}
$(document).keyup(function (evt) {
    if (pre.style.display == "none") {
        var $outside = $("#outerTools");
        var $inside = $("#innerTools");
        if (evt.keyCode == 32) {
            press++;
            if (press === 1) {
                var imgtosave = cvs.toDataURL("image/png");
                document.getElementById("myImg").src = imgtosave;
                $outside.show()
            }
            if (press === 2) {
                $outside.hide();
                press = 0
            }
            $("#outerTools").on("click", function (e) {
                press = 0;
                $outside.hide();
                return false
            });
            $("#info").bind("click", function (e) {
                e.stopPropagation()
            });
            $("#saveImage").bind("click", function (e) {
                e.stopPropagation()
            });
            $(".centerImage").bind("click", function (e) {
                e.stopPropagation()
            })
        }
    }
});
$("#saveImage").on("click", function () {
    var imgtosave = cvs.toDataURL("image/png");
    document.getElementById("myImg").src = imgtosave;
    cvs.toBlob(function (blob) {
        saveAs(blob, (canvas_filename.value || canvas_filename.placeholder) + ".png");
        $.ajax({
            type: "POST",
            data: {
                imagetosave: imgtosave
            },
            url: "saveimage.php",
            success: function (data) {}
        })
    }, "image/png");
    return false
});

   var r, background;
    var rArray = [];
    var imagesArray = ['one.jpg', 'two.jpg', 'three.jpg', 'four.jpg', 'five.jpg'];

    var background = new Raster({
        source: './img/six.jpg',
        position: view.center,
        size: view.bounds
    });
    background.on('load', function() {
        loaded = true;
        onResize();
    });
    var r = new Raster({
        source: './img/five.jpg',
        position: view.center,
        size: view.bounds
    });
    r.on('load', function() {
        loaded = true;
        onResize();
    });
    path = new Path();
    g = new Group([path, r]);
    g.clipped = true;

    tool.fixedDistance = 30;

    var strokeEnds = 6;

    function onMouseDown(event) {
        init();
        path.position = event.point;
    }

    var lastPoint;

    var path2 = new Path.Circle({
        center: view.center,
        radius: 0,
        fillColor: 'red'
    });

    function onFrame(event) {
        path2.fillColor.hue += 1;
    }


    function onMouseDrag(event) {
        // If this is the first drag event,
        // add the strokes at the start:
        if (event.count == 1) {
            addStrokes(event.middlePoint, event.delta * -1);
        } else {
            var step = event.delta / 1;
            step.angle += 90;

            var top = event.middlePoint + step;
            var bottom = event.middlePoint - step;

            path.add(top);
            path.insert(0, bottom);
        }
        path.smooth();
        lastPoint = event.middlePoint;
    }

    function onMouseUp(event) {
        var delta = event.point - lastPoint;
        delta.length = tool.maxDistance;
        addStrokes(event.point, delta);
        path.closed = true;
        path.smooth();
    }

    function addStrokes(point, delta) {
        var step = delta.rotate(90);
        var strokePoints = strokeEnds * 2 + 1;
        point -= step / 2;
        step /= strokePoints - 1;
        for (var i = 0; i < strokePoints; i++) {
            var strokePoint = point + step * i;
            var offset = delta * (Math.random() * 0.3 + 0.1);
            if (i % 2) {
                offset *= -1;
            }
            strokePoint += offset;
            path.insert(0, strokePoint);
        }
    }

    function init() {
        var num = Math.floor(Math.random() * 5); // 0...6
        imagesrc = './img/' + imagesArray[num];
        var r = new Raster({
            source: imagesrc,
            position: view.center,
            size: view.bounds
        });
        r.on('load', function() {
            loaded = true;
            onResize();
        });
        rArray.push(r);
        path = new Path();
        g = new Group([path, r]);
        g.clipped = true;
    }

    function onResize(event) {
        r.fitBounds(view.bounds, true);
        background.fitBounds(view.bounds, true);
        if (rArray.length) {
            rArray.forEach(function(el) {
                el.fitBounds(view.bounds, true);
            });
        }
    }

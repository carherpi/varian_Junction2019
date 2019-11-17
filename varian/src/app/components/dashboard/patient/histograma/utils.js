export default class Utils {
    curveArea(curve) {
        var start = true;
        var area = 0;
        var x_0 = 0;
        var y_0 = 0;
        curve.forEach(point => {
            if (start) {
                x_0 = point.x;
                y_0 = point.y;
                start = false;
            } else {
                var dx = point.x - x_0;
                var dy = point.y - y_0;
                area = area + dx*point.y -(dx*dy)/2;
                x_0 = point.x;
                y_0 = point.y;
            }
        })
        return(area)
    }
    
    minDistCurves(top,bottom) {
        var trueTop = top.filter(function(point){
            return point.y != 100
        })
        var minDist2 = 10000;
        var minDistVector = {x: 1, y:1};
        for (var i in trueTop){
            var pointTop = trueTop[i];
            for (var j in bottom) {
                var pointBottom = bottom[j];
                var distVector = {
                    x: pointTop.x - pointBottom.x,
                    y: pointTop.y - pointBottom.y,
                }
                var dist2 = distVector.x*distVector.x + distVector.y*distVector.y;
                if (dist2 < minDist2) {
                    minDist2 = dist2;
                    minDistVector = distVector;
                }
            }
        }
        if (minDistVector.x < 0 || minDistVector.y < 0) {
            var isProtocol = false;
        } else {
            var isProtocol = true;
        }
        return({dist:Math.sqrt(minDist2),isProtocol:isProtocol})
    }

}
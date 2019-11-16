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
        return(true)
    }

}
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
        trueTop = trueTop.filter(function(point){
            return point.y != 0
        })
        var MinDist = 100;
        for (var i in trueTop){
            var MinDistX = 100;
            var closestBottomJ = 0;
            for (var j in bottom) {
                var pointTop = trueTop[i];
                var pointBottom = bottom[j];
                var DistX = Math.abs(pointTop.x-pointBottom.x)
                if (DistX < MinDistX){
                    closestBottomJ = j;
                    MinDistX = DistX;
                    }
                }
                if (i>0 && closestBottomJ>0){
                    var p0 = bottom[closestBottomJ-1];
                    var p1 = bottom[closestBottomJ];
                    var m = (p0.y-p1.y)/(p0.x-p1.x);
                    var b = p1.y-m*p1.x;
                    var Dist = trueTop[i].y - (m*trueTop[i].x+b)
                    if ( Dist < 0 ) {
                        return({dist:0,isProtocol:false})
                        }
                    }
                    if ( Dist < MinDist) {
                        MinDist = Dist;
                    }
            }
        return({dist:MinDist,isProtocol:true})
        }

    // minDistCurves(top,bottom) {
    //     // var trueTop = top.filter(function(point){
    //     //     return point.y != 100
    //     // })
    //     // trueTop = trueTop.filter(function(point){
    //     //     return point.y != 0
    //     // })
    //     var trueTop = top;
    //     var minDist2 = 10000;
    //     var minDistI = 0;
    //     var minDistJ = 0;
    //     var trueMinDist = 100;
    //     // var trueMinDist_temp = 0;
    //     // var testMinDist = 0;
    //     var isProtocol = true;
    //     // var minDistTop = {x:1,y:1};
    //     // var minDistTop_0 = {x:1,y:1};
    //     for (var j in bottom){
    //         for (var i in trueTop) {
    //             var pointTop = trueTop[i];
    //             var pointBottom = bottom[j];
    //             var distVector = {
    //                 x: pointTop.x - pointBottom.x,
    //                 y: pointTop.y - pointBottom.y,
    //             }
    //             var dist2 = distVector.x*distVector.x + distVector.y*distVector.y;
    //             if (dist2 < minDist2) {
    //                 if (i>0 && j>0){
    //                     minDistJ = j;
    //                     minDistI = i;
    //                     minDist2 = dist2;
    //                     var p0 = bottom[j-1];
    //                     var p1 = bottom[j];
    //                     var m = (p0.y-p1.y)/(p0.x-p1.x);
    //                     var b = p1.y-m*p1.x;
    //                     if ( (m*trueTop[minDistI].x+b) < trueTop[minDistI].y ) {
    //                         isProtocol = false;
    //                     }
    //                     }
    //                 // minDistVector = distVector;
    //                 }
    //             }
    //         // console.log(minDistI)
    //         // minDistTop = trueTop[minDistI];
    //         // minDistTop_0 = trueTop[minDistI-1];
    //         // if (minDistI > 0) {
    //         //     var dx = trueTop[minDistI-1].x - trueTop[minDistI].x;
    //         //     var dy = trueTop[minDistI-1].y - trueTop[minDistI].y;
    //         // } else {
    //         //     var dx = trueTop[minDistI].x - trueTop[minDistI+1].x;
    //         //     var dy = trueTop[minDistI].y - trueTop[minDistI+1].y;
    //         // }
    //         // var tanA = dx/dy;
    //         // var sinA = dx/(Math.sqrt(dx*dx+dy*dy));
    //         // var minDist = Math.sqrt(minDist2);
    //         // var cosA = sinA/tanA;
    //         // trueMinDist_temp = Math.abs(cosA*minDist);
    //         // if (trueMinDist_temp < trueMinDist) {
    //         //     trueMinDist = trueMinDist_temp;
    //         //     testMinDist = cosA*minDist;
    //         // }
    //         }
    //     console.log((m*trueTop[minDistI].x+b),p0)
    //     console.log(trueTop[minDistI])
    //     trueMinDist = Math.sqrt(minDist2)
    //     if (!isProtocol) {
    //         return({dist:0,isProtocol:false})
    //     } else {
    //         return({dist:trueMinDist,isProtocol:isProtocol})
    //         }
    //     }

}
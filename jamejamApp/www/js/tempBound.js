/**
 * Created by klappo on 10/26/15.
 */
var myvar=setInterval(function(){
    //for (var i = 1; i <= chillerCount; i++) {
    var i=1;
    var chID;
    if (i < 10) {
        chID = "0" + i;
    } else {
        chID = i;
    }
    reqChillerData(function (err) {
        //console.log(err);
    }, function (data) {
        var JsonData = JSON.parse(data);
        var tempData = JsonData.Temp;
        var tempArr = tempData.split(',')
        var bound=chTempBounds[chID]
        for(var j=0; j < tempCount; j++){
            var lowBound=bound[j][0]
            var upBound=bound[j][1]
            if(tempArr[j]>=lowBound && tempArr[j]<=upBound){

            }else{
                console.log('temp num '+j+' chiller '+chID+' is out of bound')
                alert('temp num '+j+' chiller'+chID+' is out of bound')
            }
        }

    }, chID)
//}
},5000)


function tempBoundsAlarm() {

}
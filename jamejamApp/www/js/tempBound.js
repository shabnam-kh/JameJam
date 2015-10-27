/**
 * Created by klappo on 10/26/15.
 */
    var chID;
var myvar=setInterval(function(){
    for (var i = 1; i <= chillerCount; i++) {
    var i=1;
    //var chID;
    if (i < 10) {
        chID = "0" + i;
    } else {
        chID = i;
    }
    reqChillerData(function (err) {
        //console.log(err);
    }, function (data) {
        var JsonData = JSON.parse(data);
        tempBoundsAlarm(JsonData,chID)

    }, chID)
}
},5000)
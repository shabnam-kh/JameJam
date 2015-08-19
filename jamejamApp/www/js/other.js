/**
 * Created by klappo on 6/30/15.
 */

//var ttf={"Other":"1,1,1,1,1,1,1,1,1,1,1,1,1,0,0","InOut_Out":"0,0,0,0,0,0,0,0,0,0,0,0","Chiller_no":"1","MainSetting":"7.00,65.50,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0","InOut_Input":"0,0,0,0,0,0,0,0,0,0,0,0","Temp":"13.02,13.03,16.60,60.00,13.14,13.32,24.47,23.23,54.16,8.83,1118.00","Alarm":"0,0,0,0,0,0,0,0,0,0"};
//var storeData=JSON.stringify(ttf);
var storeData = sessionStorage.getItem('chillerData');
//console.log("init data");
// showHex(storeData);
//showHex(storeData);
//showHex(storeData,function(digi){
//             var app = angular.module('myApp', []);
//app.controller('myCtrl', function($scope) {
//    $scope.test=digi;
//});
//});

$(document).ready(function () {
    console.log("init data");
        var jData=JSON.parse(storeData);
    $("#updateTime").text(" last updated on "+jData.recievedTime);
    showHex(storeData);
    $("#date").text(showDate());

});

var timeVar=setInterval(function(){
    $("#date").text(showDate());
},1000);
var sendReqToServer = setInterval(function () {
    //$(".field").val("hello");
    console.log("call sendReq");
    sendReq(function () {
    }, function (data) {
        storeData = data;
    });
}, 5000);

var myVar = setInterval(function () {
    console.log("update data");
        var jData=JSON.parse(storeData);
    $("#updateTime").text(" last updated on "+jData.recievedTime);
    showHex(storeData);

}, 2000)

function sendReq(callFail, callSuccess) {
    getSessionData(function (Sid, activeChill) {
        //        $.get(baseUrl + "/chillerData", {sID:Sid,id:activeChill}, function (data, textStatus, jqXHR) {
        //    console.log("send request to /chillerData");
        //   callSuccess(data)
        //})
        $.ajax(
            {
                url: serverURL + "/chillerData",
                data: {sID: Sid, id: activeChill},
                timeout: 2000,
                success: function (data, textStatus, jqXHR) {
                    console.log("ajax req " + textStatus);
                    console.log("ajax req data " + data);
                    callSuccess(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("ajax req fail" + textStatus);
                    console.log("ajax req error " + errorThrown);
                    callFail();
                }
            }
        )
    })

}
function getSessionData(callback) {
    var sID = sessionStorage.getItem('secureID')
    console.log("temp active chiller " + sessionStorage.getItem('activeChiller'));
    var activeChiller = getChillerNumber(sessionStorage.getItem('activeChiller'));
    callback(sID, activeChiller);
}
function divideHex(hexArray) {
    //    var count=Math.floor(hexArray.length/11);
    //    //var count=6;
    //for(i=1;i<12;i++){
    //    var j=(i-1)*count;
    //    var temp="";
    //    for(k=1;k<=count;k++){
    //        var varia=hexArray[j+k]+" ";
    //        temp=temp+varia;}
    //    $("#field"+i).val(temp);
    //}
    for (i = 1; i < 12; i++) {
        $("#field" + i).val(hexArray[i]);
        $("#prog" + i).val(hexArray[i]);
    }

}

function showHex(str) {
    console.log("showHex function");
    try {
        var sth = JSON.parse(str);
    } catch (e) {
        console.log("error " + e);
    }
    var tmp = sth.Other;
    console.log("raw data " + tmp);
    var digi = tmp.split(",");
    console.log("array " + digi);
    //callback(digi);
//         var app = angular.module('myApp', []);
//app.controller('myCtrl', function($scope) {
//    $scope.test=digi;
//});
    for (var i = 0; i < digi.length; i++) {
        if (digi[i] == 1) {
            console.log("number " + i + " is on");
            $("#" + i).attr("checked", "true");

        } else {
            console.log("number " + i + " is off");
            $("#" + i).removeAttr("checked");
        }
    }
    //callback();
    //console.log("call divideHex");
    //divideHex(result);
}
function get_query(url) {
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = qs[i][1];
    }
    return result;
}
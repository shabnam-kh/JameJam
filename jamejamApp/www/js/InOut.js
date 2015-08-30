/**
 * Created by klappo on 7/30/15.
 */
/**
 * Created by klappo on 7/30/15.
 */
/**
 * Created by klappo on 6/30/15.
 */

//var ttf={"Other":"1,1,1,1,1,1,1,1,1,1,1,1,1,0,0","InOut_Out":"0,0,0,0,0,0,0,0,0,0,0,0","Chiller_no":"1","MainSetting":"7.00,65.50,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0","InOut_Input":"0,0,0,0,0,0,0,0,0,0,0,0","Temp":"13.02,13.03,16.60,60.00,13.14,13.32,24.47,23.23,54.16,8.83,1118.00","Alarm":"0,0,0,0,0,0,0,0,0,0"};
//var storeData=JSON.stringify(ttf);
var storeData = sessionStorage.getItem('chillerData');

$(document).ready(function () {
    console.log("call sendReq");
    sendReq(function () {
    }, function (data) {
        storeData = data;
        var jData = JSON.parse(data);
        $("#updateTime").text(" last updated on " + jData.recievedTime);
        storelastTime($("#updateTime").text(), function (lastT, T) {
            sessionStorage.setItem("lastTime", T);
        })
        showIn(storeData);
        showOut(storeData);
    });
    $("#date").text(showDate());
});

var timeVar = setInterval(function () {
    $("#date").text(showDate());
}, 1000);

var checkTime = setInterval(function () {
    console.log("check for out of date data");
    storelastTime($("#updateTime").text(), function (lastT, T) {
        sessionStorage.setItem("lastTime", T);
        console.log("last time is " + lastT);
        console.log("current time is " + T);
        if (lastT === T) {
            console.log("data is out of date !!!");
            //$("#updateTime").hide();
            $("#outDate").text("data is out of date");
            $("#outDate").show();
        }
        else {
            console.log("data is up to date.");
            $("#outDate").hide();
            //$("#updateTime").text(T);
            // $("#updateTime").show();
        }
    })
}, 180000);

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
    var jData = JSON.parse(storeData);
    updateTime(jData.recievedTime, function () {
        storelastTime($("#updateTime").text(), function (lastT, T) {
            if (lastT === T) {
                //console.log("still out of date");
            } else {
                $("#outDate").hide();
            }
        })
    });
    showIn(storeData);
    showOut(storeData);

}, 2000)

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
function showIn(str) {
    console.log("showHex function");
    try {
        var sth = JSON.parse(str);
    } catch (e) {
        console.log("error " + e);
    }
    var tmp = sth.InOut_Input;
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
            $("#I" + i).attr("checked", "true");

        } else {
            console.log("number " + i + " is off");
            $("#I" + i).removeAttr("checked");
        }
    }
    //callback();
    //console.log("call divideHex");
    //divideHex(result);
}
function showOut(str) {
    console.log("showHex function");
    try {
        var sth = JSON.parse(str);
    } catch (e) {
        console.log("error " + e);
    }
    var tmp = sth.InOut_Out;
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
            $("#O" + i).attr("checked", "true");

        } else {
            console.log("number " + i + " is off");
            $("#O" + i).removeAttr("checked");
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
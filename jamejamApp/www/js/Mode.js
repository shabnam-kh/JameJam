/**
 * Created by klappo on 6/30/15.
 */
var storeData = sessionStorage.getItem('chillerData');
$(document).ready(function () {
    console.log("init data");
    showHex(storeData);
    $("#date").append(showDate());
});


var sendReqToServer = setInterval(function () {
    //$(".field").val("hello");
    console.log("call sendReq");
    sendReq(function () {
    }, function (data) {
        storeData = data;
    });
}, 5000);

var myVar = setInterval(function () {

    if (storeData === undefined) {
        console.log("empty data");
        $(".field").val("@@@@");
    }
    else {
        console.log("call showHex");
        showHex(storeData);
    }

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
function showDate() {
    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;
}
function showHex(str) {
    var sth = JSON.parse(str);
    var tmp = sth.MainSetting;
    var digi = tmp.split(",");
    //var result=[];
    //for(var i = 0; i <= digi.length-2; i=i+2){
    //    var tempstr=digi[i]+digi[i+1];
    //    result.push(parseInt(tempstr,16));
    //}
    //console.log("call divideHex");
    //divideHex(result);
    divideHex(digi);
}
function get_query(url) {
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = qs[i][1];
    }
    return result;
}
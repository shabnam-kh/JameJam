/**
 * Created by klappo on 8/29/15.
 */

document.addEventListener('deviceready', function () {

               var sendReqToServer = setInterval(function () {
    //$(".field").val("hello");
    console.log("call sendReq");
    sendReq(function () {
    }, function (data) {
          console.log("notification alarm page");
        var JsonData = JSON.parse(data);

    var alarmData = JsonData.Alarm;
    var digi = alarmData.split(",");
         console.log("alarm data is  " + digi);
        var flag=digi.indexOf("1");
        if(flag==-1){
            console.log("NO ALARM");
        }else{
            console.log("ALARM NOTIFICATION");
            notifyAlarm();
        }
    });
}, 5000);

function notifyAlarm(){
    console.log("call notification plugin");
    // Schedule notification for tomorrow to remember about the meeting
    cordova.plugins.notification.local.schedule({
        id: 11,
        title: "Alarm Notification",
        text: "WARNING !!! chiller has alarm !!!"
    });

}
}, false);


/**
 * Created by klappo on 8/29/15.
 */
document.addEventListener('deviceready', function () {
    var alarmID=1;
    checkAlarm();
    var sendReqToServer = setInterval(function () {
        alarmID++;
        checkOldAlarm(alarmID);

    }, 5000);

    //cordova.plugins.notification.local.on("click", function (notification, state) {
    //}, this)

    $("#alarmCheck").click(function () {
        if ($("#alarmCheck").is(":checked")) {
            console.log("notification alarm is active");
            sessionStorage.setItem("alarm", "active");
        } else {
            console.log("deactive notification alarm");
            sessionStorage.removeItem("alarm");
            cordova.plugins.notification.local.cancelAll(function () {
                alert("cancel alarm notification");
            });
        }
        ;
    });

    function notifyAlarm(id,callback) {
        console.log("call notification plugin");
        // Schedule notification for tomorrow to remember about the meeting
        cordova.plugins.notification.local.schedule({
            id: id,
            title: "Alarm Notification",
            text: "WARNING !!! chiller has alarm !!!"
        });
        callback(id);

    }

    function checkAlarm() {
        var alarm = sessionStorage.getItem("alarm");
        console.log("storage alarm is " + alarm);
        if (alarm == "active") {
            console.log("call sendReq");
            sendReq(function () {
            }, function (data) {
                console.log("notification alarm page");
                var JsonData = JSON.parse(data);

                var alarmData = JsonData.Alarm;
                var digi = alarmData.split(",");
                sessionStorage.setItem("alarmData", digi);
                console.log("alarm data is  " + digi);
                var flag = digi.indexOf("1");
                if (flag == -1) {
                    console.log("NO ALARM");
                } else {
                    console.log("ALARM NOTIFICATION");
                    notifyAlarm(1,function(){
                        cordova.plugins.notification.local.cancel(1, function(){
                            console.log("auto cancel notification");
                        });
                    });
                }
            });
        } else {
            console.log("alarm deactivated by user");
        }

    }

    function checkOldAlarm(id) {

        var alarm = sessionStorage.getItem("alarm");
        console.log("storage alarm is " + alarm);
        if (alarm == "active") {
            console.log("call sendReq");
            sendReq(function () {
            }, function (data) {
                console.log("notification alarm page");
                var JsonData = JSON.parse(data);
                var alarmData = JsonData.Alarm;
                var digi = alarmData.split(",");
                console.log("alarm data is  " + digi);
                var flag = digi.indexOf("1");
                if(flag!=-1){
                    getOldDataAlarm(function(dd){

                        console.log("alarm old data is "+dd);
                        if(dd==null){
                            setOldDataAlarm(digi,function(){});
                                      notifyAlarm(id,function(){
                        cordova.plugins.notification.local.cancel(id, function(){
                            console.log("auto cancel notification");
                        });
                    });
                        }else{
                            var alarmOldData=dd.split(",");
                            for (var i = 0; i < digi.length; i++) {
                                if(digi[i]!=1){continue;}

                                console.log(digi[i]);
                                console.log(alarmOldData[i]);
                            if (digi[i] == alarmOldData[i]) {
                                console.log("alarm expired"+i);
                            } else {
                                setOldDataAlarm(digi,function(){});
                                console.log("ALARM NOTIFICATION");
                                 notifyAlarm(id,function(){
                        cordova.plugins.notification.local.cancel(id, function(){
                            console.log("auto cancel notification");
                        });
                    });
                                break;
                            }
//});


                    }
                        }
                    });

                }else{
                    console.log("NO ALARM");
                }




            });
        } else {
            console.log("alarm deactivated by user");
        }

    }

    function getOldDataAlarm(callback) {
        console.log("get old data");
        var data = sessionStorage.getItem("alarmData");
        callback(data);
    }
    function setOldDataAlarm(data,callback) {
        console.log("set old data");
        sessionStorage.setItem("alarmData", data);
        callback();
    }

}, false);


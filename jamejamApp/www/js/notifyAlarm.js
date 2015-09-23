/**
 * Created by klappo on 8/29/15.
 */

document.addEventListener('deviceready', function () {

    checkAlarm();
    var sendReqToServer = setInterval(function () {


        checkOldAlarm();

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

    function notifyAlarm() {
        console.log("call notification plugin");
        // Schedule notification for tomorrow to remember about the meeting
        cordova.plugins.notification.local.schedule({
            id: 11,
            title: "Alarm Notification",
            text: "WARNING !!! chiller has alarm !!!"
        });

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
                    notifyAlarm();
                }
            });
        } else {
            console.log("alarm deactivated by user");
        }

    }

    function checkOldAlarm() {
        var alarmOldData;
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
                getOldDataAlarm(function (dd) {
                    alarmOldData = dd;
                    sessionStorage.setItem("alarmData", digi);
                    for (var i = 0; i < digi.length; i++) {
                        var flag = digi.indexOf("1");
                        if (flag == -1) {
                            console.log("NO ALARM");
                        } else {
                            console.log("ALARM NOTIFICATION");
                            if (digi[flag] == alarmOldData[flag]) {
                                console.log("alarm expired");
                            } else {
                                notifyAlarm();
                                break;
                            }

                        }
                    }
                });


            });
        } else {
            console.log("alarm deactivated by user");
        }

    }

    function getOldDataAlarm(callback) {
        var data = sessionStorage.getItem("alarmData");
        callback(data);
    }

}, false);


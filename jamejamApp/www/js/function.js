/**
 * Created by klappo on 7/4/15.
 */
function getChillerNumber(str) {
    var temp = str.split(" ");
    return temp[1]
}

function getSessionData(callback) {
    var sID = sessionStorage.getItem('secureID')
    console.log("temp active chiller " + sessionStorage.getItem('activeChiller'));
    try{
        var activeChiller = getChillerNumber(sessionStorage.getItem('activeChiller'));
    }catch(e){}

    callback(sID, activeChiller);
}

function sendReq(callFail, callSuccess) {
    getSessionData(function (Sid, activeChill) {
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

function reqChillerData(callFail, callSuccess, chID) {
    console.log("call reqChillerData function");
    getSessionData(function (Sid, activeChill) {
        $.ajax(
            {
                url: serverURL + "/chillerData",
                data: {sID: Sid, id: chID},
                timeout: 2000,
                success: function (data, textStatus, jqXHR) {
                    console.log("ajax req " + textStatus);
                    console.log("ajax req data " + data);
                    callSuccess(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("ajax req fail" + textStatus);
                    console.log("ajax req error " + errorThrown);
                    callFail(errorThrown);
                }
            }
        )
    })

}

function showDate() {
    var d = new Date(),
        seconds = d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds(),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ":" + seconds + ampm;
}

function logOutAction() {

    var r = confirm("Do you want to LogOut ??!!");
    if (r == true) {
        console.log("user logout");
        getSecureId(function (id) {
            $.ajax(
                {
                    url: serverURL + "/logout",
                    data: {id: id},
                    success: function (data, textStatus, jqXHR) {
                        console.log(data);
                        location.href = '../index.html';
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("logout error " + errorThrown)
                    }
                }
            )
        })
    } else {
        console.log("user not logout");
    }

};

function setSize(callback) {
    console.log("setSize function");
    $("#chillerImg").width($(window).width());
    //$("#chillerImg").height($(window).height());
    callback();
};

function storelastTime(T, callback) {
    var lastT = sessionStorage.getItem("lastTime");
    callback(lastT, T);
}

function updateTime(T, callback) {
    $("#updateTime").text(" last updated on " + T);
    callback();
}

function getSecureId(callback) {
    var sID = sessionStorage.getItem('secureID');
    console.log("secureID is " + sID);
    callback(sID);
}

function tempBoundsAlarm(data,chID) {
    var tempData = data.Temp;
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
}

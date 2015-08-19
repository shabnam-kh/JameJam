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
    var activeChiller = getChillerNumber(sessionStorage.getItem('activeChiller'));
    callback(sID, activeChiller);
}

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

    function action() {

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
                                location.href = 'index.html';
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

function setSize(callback){
    console.log("setSize function");
   $("#chillerImg").width($(window).width());
    //$("#chillerImg").height($(window).height());
    callback();
};
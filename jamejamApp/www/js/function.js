/**
 * Created by klappo on 7/4/15.
 */
function getChillerNumber(str){
    var temp=str.split(" ");
    return temp[1]
}

    function getSessionData(callback){
        var sID=sessionStorage.getItem('secureID')
        console.log("temp active chiller "+sessionStorage.getItem('activeChiller'));
        var activeChiller=getChillerNumber(sessionStorage.getItem('activeChiller'));
        callback(sID,activeChiller);
    }

 function sendReq(callFail,callSuccess) {
     getSessionData(function (Sid,activeChill) {
     //        $.get(baseUrl + "/chillerData", {sID:Sid,id:activeChill}, function (data, textStatus, jqXHR) {
     //    console.log("send request to /chillerData");
     //   callSuccess(data)
     //})
         $.ajax(
             {
                 url: serverURL + "/chillerData",
                    data: {sID:Sid,id:activeChill},
                 timeout: 2000,
                 success: function (data, textStatus, jqXHR) {
                     console.log("ajax req " + textStatus);
                     console.log("ajax req data " + data);
                     callSuccess(data);
                 },
                 error: function (jqXHR, textStatus, errorThrown)
                 {
                     console.log("ajax req fail" + textStatus);
                     console.log("ajax req error " + errorThrown);
                     callFail();
                 }
     }
         )
     })

 }
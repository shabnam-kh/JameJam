/**
 * Created by klappo on 6/30/15.
 */
    var serverURL="http://192.69.204.34:8001/";
     var baseUrl='http://localhost:3000';

     function showDigi(callback){
         console.log('showDigi function');
    //$.get(
    //    baseUrl+"/digi"
    //    ,function(resp){
    //        callback(editString(resp));
    //    }
    //)
           $.get(
        serverURL
        ,function(resp){
            callback(editString(resp));
        }
    )

     }
function editString(str){
    var digi=str.substring(str.indexOf(':\"') + 2,str.indexOf('}')-1).split(",");
    for(var i = 0, result = ""; i < digi.length; i++){
        result=result+digi[i]+" ";
    }
    return result
}
function get_query(url){
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = qs[i][1];
    }
    return result;
}
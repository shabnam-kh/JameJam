/**
 * Created by klappo on 7/5/15.
 */

$(function () {
    // Grab the template script
    var chillerInfo = sessionStorage.getItem("chillerInfo");
    console.log("info " + chillerInfo);
    var data = JSON.parse(chillerInfo);
    var theTemplateScript = $(".chillerInfoTemp").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    var context = {
        "tell": data.tell,
        "chiller": data.ownerName,
        "complex": data.complexName,
        "name": data.chillerName
    };

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $('.infoBox').html(theCompiledHtml);
});


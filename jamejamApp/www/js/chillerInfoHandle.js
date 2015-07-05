/**
 * Created by klappo on 7/5/15.
 */
$(function () {
  // Grab the template script
  var theTemplateScript = $(".chillerInfoTemp").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context={
    "tell": "221"
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.infoBox').html(theCompiledHtml);
});

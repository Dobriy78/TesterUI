SI.Files.stylizeAll();

	path = require('path');
var startPath = process.cwd();	
	console.log('Starting path:		' + startPath);
var recordPath = startPath.replace(/\\/g,"\\").replace(/(\Temp+.+)+/g,"GW-TESTER\\Tester.config");
	console.log('Record Path:		' + recordPath);

//var pPath = "..\\..\\GW-TESTER\\Tester.config";
var configPath = recordPath;
var fs = require("fs"),
    sys = require("sys");
	
$(document).ready(function(){
   $.ajax({
   type: "GET",
   url: configPath,
   dataType: "xml",
 success: function(xml) {
   $(xml).find('UserSettings').each(function(){
   var id = $(this).attr('id');
   var UseDefault = $(this).find('UseDefault').text();;
   console.log('UseDefault:			' + UseDefault);
   var JarPath = $(this).find('JarPath').text();;
   console.log('JarPath:			' + JarPath);
   var GWPath = $(this).find('GWPath').text();
   console.log('GWPath: 			' + GWPath);
   var ScenarioPath = $(this).find('ScenarioPath').text();
   console.log('ScenarioPath: 		' + ScenarioPath);
					
if ( UseDefault == "Y" ) {
   $('#squaredDefault').attr('checked', true);
   $(".textTTH").addClass("hidden");
   $(".textTTTH").addClass("hidden");
};
if ( UseDefault == "N" ) {
   $('#squaredDefault').attr('checked', false);
   $(".textTTH").removeClass("hidden");
   $(".textTTTH").removeClass("hidden");
};});},
 error: function(){ 
   console.log('Config path is not available!');
   //alert("NOT exists");  //здесь добавить обработку формы на запись
} 
	});
});

/* record neq config
function saveFunction()
{

var configNew = "<UserSettings>\n<UseDefault>" + UseDefault + "</UseDefault>\n<JarPath>" + JarPath + "</JarPath>\n<GWPath>" + GWPath + "</GWPath>\n<ScenarioPath>C:\\Tester\\Scenarios\\</ScenarioPath>\n</UserSettings>";

fs.open("..\\..\\GW-TESTER\\Tester.config", "w", 0644, function(err, file_handle) {
if (!err) {
    fs.write(file_handle, configNew, null, 'utf8', function(err, written) {
        if (!err) {

        } else {

        }
    });
} else {

}
});
};
*/


$(function(){ // wait for document to load 
 $('#T7').MultiFile({ 
  list: '#T7-list'
 }); 
});
		
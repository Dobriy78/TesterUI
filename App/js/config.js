SI.Files.stylizeAll();

	path = require('path');
var startPath = process.cwd();	
	console.log('Starting path:		' + startPath);
var recordPath = startPath.replace(/\\/g,"\\").replace(/(\Temp+.+)+/g,"GW-TESTER\\Tester.config");
	console.log('Record Path:		' + recordPath);
var TesterJarPath;

//var pPath = "..\\..\\GW-TESTER\\Tester.config";
var configPath = recordPath;
var fs = require("fs"),
    sys = require("sys");
	
// check config file in the folder and read if exist
$(document).ready(function(){
   $.ajax({
   type: "GET",
   url: configPath,
   dataType: "xml",
 success: function(xml) {
   $(xml).find('UserSettings').each(function(){
   var id = $(this).attr('id');
   var UseDefault = $(this).find('UseDefault').text();
   console.log('UseDefault:			' + UseDefault);
   var JarPath = $(this).find('JarPath').text();
   if ( JarPath == "" || JarPath.replace(/.+\\/,"") != "Tester.jar" ) { 
   console.log('JarPath:			not defined'); 
   } else { 
   var TesterJarPath = JarPath.replace(/\\/g,"\\"); document.getElementById('testerJarPath').value = TesterJarPath;
   console.log('TesterJarPath:			' + TesterJarPath); 
   };
   var GWPath = $(this).find('GWPath').text();
   if ( GWPath == "" || GWPath.replace(/.+\\/,"") != "TesterGW.xml" ) { 
   console.log('GWPath:				not defined'); 
   } else {
   var TesterGWPath = GWPath.replace(/\\/g,"\\"); document.getElementById('testerGWPath').value = TesterGWPath;
   path = require('path');
   console.log('Starting directory:		' + process.cwd());
   try { process.chdir(TesterGWPath.replace(/\\TesterGW.xml/g,"")); console.log('New directory:			' + process.cwd());	}
   catch (err) { console.log('chdir: ' + err);	}
   console.log('GWPath: 			' + GWPath); 
   };
   var ScenarioPath = $(this).find('ScenarioPath').text();
   console.log('ScenarioPath: 		' + ScenarioPath);
					
if ( UseDefault == "Y" ) {
   $('#squaredDefault').attr('checked', true);
};
if ( UseDefault == "N" ) {
   $('#squaredDefault').attr('checked', false);
};
});},
 error: function(){ 
   console.log('Config path is not available!');
   //alert("NOT exists");  //здесь добавить обработку формы на запись
} 
	});
});


$(function(){ // wait for document to load 
 $('#T7').MultiFile({ 
  list: '#T7-list'
 }); 
});
		
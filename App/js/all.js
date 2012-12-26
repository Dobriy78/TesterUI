// получение списка файлов и запись их в форму
function myfunction()
  {
//	var testerJar = document.getElementById('testerJar').value.replace(/\\/g,"-");
//    document.getElementById('testerJarPath').value = testerJar;
	
	var files = document.getElementById('file').value.replace(/\\/g,"/");
    document.getElementById('textArea').value = files;
  };

// замена кнопки input file
//$('#testerJar').prettyfile({ html: "<a href='' class='btn btn-info'>Select Tester.jar</a>" });
//$('#file').prettyfile({ html: "<a href='' class='btn btn-info'>Select all scenario</a>" });


// получение пути до Tester.jar
$('#testerJar').change(function()
{
    var testerJar = $('#testerJar').val().replace(/\\/g,"\\");
	document.getElementById('testerJarPath').value = testerJar;
	var testerJarPath = $('#testerJarPath').val();
	console.log('Tester Jar Path:		' + testerJarPath);
});

// установка пути для работы скрипта
$('#testerGW').change(function()
{
    var testerGW = $('#testerGW').val().replace(/\\/g,"\\").replace(/\\TesterGW.xml/g,"");
	document.getElementById('testerGWPath').value = testerGW;
	var TesterGWPath = $('#testerGWPath').val();
	path = require('path');
	console.log('Starting directory:		' + process.cwd());
	try { process.chdir(TesterGWPath); console.log('New directory:			' + process.cwd());	}
	catch (err) { console.log('chdir: ' + err);	}
	
	var fs = require('fs');
	fs.unlinkSync( TesterGWPath + '/Tester_ALL.log')
	console.log('successfully deleted Tester_All.log');
	fs.unlinkSync( TesterGWPath + '/Tester_INFO.log')
	console.log('successfully deleted Tester_INFO.log');
});

// получение из формы списка файлов и создание выпадающего меню
$('#file').change(function()
{
	$('#menu').empty();
	var files = document.getElementById('file').value.replace(/\\/g,"/");
   	document.getElementById('textArea').value = files;
	var i;
	var filess = $('#textArea').val().split(/;\s?/);
	$("<form method='POST' id='mySelect'><select id='scenarioSelect' onchange='displayResult()'><option>Scenario's</option>").appendTo('#menu');
	for (i=0;i<filess.length;i++)
		{
			$("<option value=" +filess[i]+ ">" + filess[i].replace(/(\w+[:\/]+)+/,"").replace(/\_/g," ").replace(/\.xml/g,"") + "</option>").appendTo('#scenarioSelect');
		};
	$("</select></form>").appendTo('#menu');
	
	
});

// запуск сценария
function mySFunction()
{
	$('#scenarioLog').empty();
	var x=document.getElementById("scenarioSelect").selectedIndex;
	var Scenario = document.getElementsByTagName("option")[x].value.replace(/(\w+[:\/]+)+/,"").replace(/\.xml/g,""); 
	var TesterJarPath = $('#testerJarPath').val();
	var spawn = require('child_process').spawn,
    scenarioRun = spawn('java', ['-jar', TesterJarPath, 'TesterGW.xml', Scenario]);
	scenarioRun.stdout.on('data', function (data) {
	console.log('stdout: ' + data);
	//alert(data);
	
$('<div class="log"></div>').html('' + data.toString().replace(/(.*\|)/g,"").replace(/tester ConfigFile ScenarioName/gi,"Select scenario first").replace(/<-- Starting scenario:/gi,"Starting scenario: ").replace(/done/gi,"<span class=green>DONE</span>").replace(/check FAIL:/gi,"<span class=red>check FAIL: </span>").replace(/got error:/gi,"<span class=red>ERROR: </span>") + '').appendTo('#scenarioLog');

});
$('#unPauseScenario').click(function(){
	scenarioRun.stdin.write('a\n');
});
	scenarioRun.stderr.on('data', function (data) {
	console.log('stderr: ' + data);
});

	scenarioRun.on('exit', function (code) {
	console.log('child process exited with code ' + code);
});
};

// получение выбранного сценария и вывод его описания
function displayResult()
{
//$("<div class='textTT hidden'><input name='runScenario' type='button' id='submit' onclick='mySFunction()' class='btn btn-info' value='Run scenario'/></div>").appendTo('#playButton');
$('#scenarioDescription').empty();
$(".content-box-start").removeClass("hidden");

var x=document.getElementById("scenarioSelect").selectedIndex;
var y=document.getElementsByTagName("option")[x].value; 

//alert(y);
$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: document.getElementsByTagName("option")[x].value,
		dataType: "xml",
		success: function(xml) {
			$(xml).find('Scenario').each(function(){
				var id = $(this).attr('id');
				var name = $(this).find('Name').text().replace(/\_/g," ");
				    console.log('Name:					' + name);
				var desc = $(this).find('Description').text();
				    console.log('Description: ' + desc);
				$('<div class="items"></div>').html('<h3>'+name+'</h3><pre>'+desc+'</pre>').appendTo('#scenarioDescription');
			});
		}
	});
});
};


// читаем Info.log
/*
// получение выбранного сценария и вывод его описания
function infoLogResult()
{
$('#infoLog').empty();
var x=document.getElementById("scenarioSelect").selectedIndex;
var y=document.getElementsByTagName("option")[x].value; 

//alert(y);
$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: document.getElementById('testerGWPath').value,
		dataType: "xml",
		success: function(xml) {
			$(xml).find('Scenario').each(function(){
				var id = $(this).attr('id');
				var name = $(this).find('Name').text().replace(/\_/g," ");
				    console.log('Name:					' + name);
				var desc = $(this).find('Description').text();
				    console.log('Description: ' + desc);
				$('<div class="items"></div>').html('<h2 class=\'small\'>'+name+'</h2><pre>'+desc+'</pre>').appendTo('#scenarioDescription');
			});
		}
	});
});
};
*/

// свитчеры //

$(document).ready( function(){ 
    $("#lr1").click(function(){
        var parent = $(this).parents('.switch');
        $('#lr2',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', true);
    });
    $("#lr2").click(function(){
        var parent = $(this).parents('.switch');
        $('#lr1',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
    });
    $("#lr3").click(function(){
        var parent = $(this).parents('.switch');
        $('#lr4',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', true);
    });
    $("#lr4").click(function(){
        var parent = $(this).parents('.switch');
        $('#lr3',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
    });
});

// Звгрузка дефолта

$('#radio2').click(function(){
$(".textTTH").removeClass("hidden");
$(".textTTTH").removeClass("hidden");
});
$('#radio1').click(function(){
$(".textTTH").addClass("hidden");
$(".textTTTH").addClass("hidden");
// загрузка по дефолту
//var assa = location.pathname;
//document.write(assa);
var pathName = location.pathname.replace(/\/C/g,"C").replace(/\//g,"\\").replace(/index.html/g,"Tester.config");
//document.write(pathName);
//function useDefaultSettings()
//{
//alert(y);
$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: pathName,
		dataType: "config",
		success: function(xml) {
			$(xml).find('userSettings').each(function(){
				var id = $(this).attr('id');
				var jarPath = $(this).find('TesterJarPath').text().replace(/\\/g,"\\");
				    console.log('TesterJarPath:			' + jarPath);
				var gwPath = $(this).find('TesterGWPath').text().replace(/\\/g,"\\");
				    console.log('TesterGWPath:			' + gwPath);
				var scenarioPath = $(this).find('TesterScenarioPath').text().replace(/\\/g,"\\");
				    console.log('TesterScenarioPath:		' + scenarioPath);
				//$('<div class="items"></div>').html('<h2 class=\'small\'>'+name+'</h2><pre>'+desc+'</pre>').appendTo('#scenarioDescription');
			});
		}
	});
});
});

/*
var fs = require("fs"),
    sys = require("sys");
var testFile = location.pathname.replace(/\/C/g,"C").replace(/index.html/g,"test.txt");
fs.open( testFile, "r+", 0644, function(err, file_handle) {
if (!err) {
    alert("Read" + testFile)
	fs.write(file_handle, "Copyrighted by Me", null, 'ascii', function(err, written) {
        if (!err) {
            // Всё прошло хорошо
        } else {
            // Произошла ошибка при записи
        }
    });
} else {
    alert("Not read")
}
});
*/

// Показать скрыть настройки //

$(function(){ // wait for document to load 
 $('#T7').MultiFile({ 
  list: '#T7-list'
 }); 
});


$(document).ready( function(){ 
 $("#squaredFour").click(function(){
	if ($('#squaredFour').is(':checked')) {
	    $(".content-box-batchR").removeClass("hidden");
	    $("#T7-list").removeClass("hidden");
		$(".content-box-selectR").addClass("hidden");
		$(".content-box-select").addClass("hidden");
		$(".content-box-start").addClass("hidden");	
		$("#scenarioDescription").addClass("hidden");
		};
	if ($('#squaredFour').is(':not(:checked)')) {
	    $(".content-box-batchR").addClass("hidden");
	    $("#T7-list").addClass("hidden");
		$(".content-box-selectR").removeClass("hidden");
		$(".content-box-select").removeClass("hidden");
		$(".content-box-start").removeClass("hidden");
		$("#scenarioDescription").removeClass("hidden");
		}; 
 });
});





// record neq config
function saveFunction()
{
var fs = require("fs"),
    sys = require("sys");
var TesterJarPath = $('#testerJarPath').val();
var TesterGWPath = $('#testerGWPath').val();
var configNew = "<UserSettings>\n<UseDefault>Y</UseDefault>\n<JarPath>" + TesterJarPath + "</JarPath>\n<GWPath>" + TesterGWPath + "</GWPath>\n<ScenarioPath>C:\\Tester\\Scenarios\\</ScenarioPath>\n</UserSettings>";

fs.open("C:\\Tester.config", "w", 0644, function(err, file_handle) {
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
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
});

// получение из формы списка файлов и создание выпадающего меню
$('#file').change(function()
{
	$('#menu').empty();
	var files = document.getElementById('file').value.replace(/\\/g,"/");
   	document.getElementById('textArea').value = files;
	var i;
	var filess = $('#textArea').val().split(/;\s?/);
	$("<form method='POST' id='mySelect'><select id='scenarioSelect' onchange='displayResult()'><option>Select scenario</option>").appendTo('#menu');
	for (i=0;i<filess.length;i++)
		{
			$("<option value=" +filess[i]+ ">" + filess[i].replace(/(\w+[:\/]+)+/,"").replace(/\_/g," ").replace(/\.xml/g,"") + "</option>").appendTo('#scenarioSelect');
		};
	$("</select><input name='tt' type='button' id='submit' onclick='mySFunction()' class='btn btn-info' value='Run scenario'/></form>").appendTo('#menu');
	
	
});

function mySFunction()
{
	$('#scenarioLog').empty();
	var x=document.getElementById("scenarioSelect").selectedIndex;
	var Scenario = document.getElementsByTagName("option")[x].value.replace(/(\w+[:\/]+)+/,"").replace(/\.xml/g,""); 
	var TesterJarPath = $('#testerJarPath').val();
	var exec = require('child_process').exec, child;
	child = exec('java -jar ' + TesterJarPath + ' TesterGW.xml ' + Scenario,
	function (error, stdout, stderr){
	$('<div class="log"></div>').html('<pre>' + stdout.replace(/(.*\|)/g,"").replace(/tester ConfigFile ScenarioName/gi,"Select scenario first").replace(/<-- Starting scenario:/gi,"Starting scenario: ").replace(/done/gi,"<span class=green>done</span>").replace(/check FAIL:/gi,"<span class=red>check FAIL: </span>").replace(/got error:/gi,"<span class=red>got error: </span>") + '</pre>' ).appendTo('#scenarioLog');
	console.log('This process is pid ' + process.pid);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null){
	console.log('exec error: ' + error);
    }
});
};

// получение выбранного сценария и вывод его описания
function displayResult()
{
$('#scenarioDescription').empty();
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
				$('<div class="items"></div>').html('<h2 class=\'small\'>'+name+'</h2><pre>'+desc+'</pre>').appendTo('#scenarioDescription');
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
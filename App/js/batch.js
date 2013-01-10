// получение списка файлов и запись их в форму
function myfunction1()
  {
	var batchfiles = document.getElementById('batch').value.replace(/\\/g,"/");
    document.getElementById('batchArea').value = batchfiles;
  };

	$('#batch').data('counter', 0);
// получение из формы списка файлов и создание выпадающего меню
$('#batch').change(function()
{
	//$('#T7-list').empty();
	var counter = $(this).data('counter');
	$(this).data('counter', counter + 1);
	var batchfiles = document.getElementById('batch').value.replace(/\\/g,"/");
   	document.getElementById('batchArea').value = batchfiles;
	var i=1;
	var filess = $('#batchArea').val(); //.split(/;\s?/);
	var scenarioName = $('#batchArea').val().replace(/(\w+[:\/]+)+/,"").replace(/\_/g," ").replace(/\.xml/g,"");
	var scenarioPathValue = $('#batchArea').val().replace(/(\w+[:\/]+)+/,"");
	//$("<form method='POST' id='mySelect'><select id='batchSelect' onchange='displayResult()'  multiple></select></form>").appendTo('#T7-list');
	//for (i=0;i<filess.length;i++)
	//	{
			$("<div id=" +counter+ " class='batch-box'><div class='batch-box-text'>" +counter+ " " + scenarioName + "</div><div class='btnScenario'><input name='scenarioPlay' type='button' id='scenarioPlay' onclick='scenarioPlay(" +counter+ ")' class='btnScenarioPlay' value='>'/></div><div class='btnScenario'><input name='scenarioInfo' type='button' id='scenarioInfo' onclick='scenarioInfo(" +counter+ ")' class='btnScenarioInfo' value='i'/></div><div class='btnScenario'><input name='scenarioDelete' type='button' id='scenarioDelete' onclick='scenarioDelete(" +counter+ ")' class='btnScenarioDelete' value='-'/></div></div>").appendTo('#batchSelect');
			
	//	};
	//$("</select></form>").appendTo('#T7-list');
});


function scenarioDelete(scenario) {
	$("#" +scenario).remove();
	//alert("AA" + scenario);
}

function scenarioInfo(info) {
	//$("#" +scenario).remove();
	alert("AA" + info);
}
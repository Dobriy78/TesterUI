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
	//$("<form method='POST' id='mySelect'><select id='batchSelect' onchange='displayResult()'  multiple></select></form>").appendTo('#T7-list');
	//for (i=0;i<filess.length;i++)
	//	{
			$("<div id=" +counter+ " class='config-box-text1'><span>" +counter+ " </span>" + filess.replace(/(\w+[:\/]+)+/,"").replace(/\_/g," ").replace(/\.xml/g,"") + "<input name='deleteScenario' type='button' id='deleteScenario' onclick='deleteScenario(" +counter+ ")' class='btn btn-danger deleteScenario' value=''/></div>").appendTo('#batchSelect');
			
	//	};
	//$("</select></form>").appendTo('#T7-list');
});


function deleteScenario(scenario) {
	$("#" +scenario).remove();
	//alert("AA" + scenario);
}
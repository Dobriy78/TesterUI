// получение списка файлов и запись их в форму
function myfunction1()
  {
	var batchfiles = document.getElementById('batch').value.replace(/\\/g,"/");
    document.getElementById('batchArea').value = batchfiles;
  };

// получение из формы списка файлов и создание выпадающего меню
$('#batch').change(function()
{
	//$('#T7-list').empty();
	var batchfiles = document.getElementById('batch').value.replace(/\\/g,"/");
   	document.getElementById('batchArea').value = batchfiles;
	var i;
	var filess = $('#batchArea').val(); //.split(/;\s?/);
	//$("<form method='POST' id='mySelect'><select id='batchSelect' onchange='displayResult()'  multiple></select></form>").appendTo('#T7-list');
	//for (i=0;i<filess.length;i++)
	//	{
			$("<div id=" +filess+ ">" + filess.replace(/(\w+[:\/]+)+/,"").replace(/\_/g," ").replace(/\.xml/g,"") + "<a class='item-del' href='#'>-</a></div>").appendTo('#batchSelect');
	//	};
	//$("</select></form>").appendTo('#T7-list');
});

$(document).ready(function(){
$("a.item-del").live('click', function() {
									   alert('AAAAA');
      $(this).parent().find("div").remove();
      return false;
    });
});

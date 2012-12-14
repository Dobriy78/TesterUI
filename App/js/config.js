var pPath = "C:\\1 1\\tester.config";
var fs = require("fs"),
    sys = require("sys");
	
$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: pPath,
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
	$('#default').attr('checked', true);
	$(".textTTH").addClass("hidden");
	$(".textTTTH").addClass("hidden");
};
if ( UseDefault == "N" ) {
	$('#default').attr('checked', false);
	$(".textTTH").removeClass("hidden");
	$(".textTTTH").removeClass("hidden");
};

			});
		}
	});
});

var configNew = "<UserSettings>\n<UseDefault>Y</UseDefault>\n<JarPath>C:\\Tester\\Tester.jar</JarPath>\n<GWPath>C:\\Tester\\TesterGW.xml</GWPath>\n<ScenarioPath>C:\\Tester\\Scenarios\\</ScenarioPath>\n</UserSettings>";

fs.open("C:\\1 1\\tester.config", "w", 0644, function(err, file_handle) {
if (!err) {
    // Записываем в конец файла readme.txt фразу "Copyrighted by Me"
    // при открытии в режиме "a" указатель уже в конце файла, и мы передаём null
    // в качестве позиции
    fs.write(file_handle, configNew, null, 'utf8', function(err, written) {
        if (!err) {
            // Всё прошло хорошо
        } else {
            // Произошла ошибка при записи
        }
    });
} else {
    // Обработка ошибок при открытии
}
});
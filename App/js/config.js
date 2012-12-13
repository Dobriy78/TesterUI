$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "C:\\TesterUI\\NW\\tester.xml",
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
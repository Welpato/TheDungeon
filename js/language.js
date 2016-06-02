beginningText = true;
function changeLanguage(lang){
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "js/lang/"+lang+".js";
	s.innerHTML = null;
	s.id = "widget";	
	$("#scriptLang").html("");
	$("#scriptLang").html(s);
	changeTexts();
}

function changeTexts(){
	$("#pageTitle").text(textMessages.title);
	$("title").text(textMessages.title);
	$("#about").text(textMessages.about);
	$("#modalHead").text(textMessages.about);
	$("#devBy").text(textMessages.devBy);
	$("#langSelection").text(textMessages.langSel);
	if(beginningText){
		$('#headTitle').text(textMessages.helpTitle);
		$('#score').html(textMessages.helpRules);
		$('#btnPlay').text(textMessages.play);
	}else{
		$('#btnPlay').text(textMessages.restart);
		$("#headTitle").text(textMessages.title);
		refreshScore(score,turnCount, breakCount);		
	}	
}

$( document ).ready(function() {
    changeTexts();
});

$('#selectEnglish').click(function(){ changeLanguage('en'); return false; });
$('#selectPtBr').click(function(){ changeLanguage('pt-BR'); return false; });
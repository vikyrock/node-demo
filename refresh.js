$(function() { 
	$(window).scroll(function() {
		
		if($(this).scrollTop()>30){
			$("#sc_btnn").hide();
		}
		if($(this).scrollTop()<300){
			$("#sc_btnn").show();
		}
	});
});


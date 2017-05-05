$( document ).ready(function() {		//joonistuspinna puhastamine
	$('#clear_model').click(function(){
		if(confirm('Are you sure you want to continue?')) {
			clearAll();
			say('Cleared');
		}
		return false;
	});
});

	function clearAll(){
        	shapes = [];
		connections = [];
		r.clear();
	}
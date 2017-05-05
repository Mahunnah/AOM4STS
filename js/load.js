$( document ).ready(function() {

	$('#load_model').click(function(){	//mudeli laadimine
		clearAll();
		//tippude laadimine
		$.getJSON('savefiles/'+$('#model_name').val()+'_S.json', function(json_shapesObj) {
			for(var i=0; i<json_shapesObj.length; i++){
				shapes.push(r.image("images/"+json_shapesObj[i].imagetype+".png", json_shapesObj[i].x, json_shapesObj[i].y, json_shapesObj[i].width, json_shapesObj[i].height));
				if(json_shapesObj[i].name!="undefined"){
					setShapeLabel(shapes[i], json_shapesObj[i].name, getCorrectLabelPosByShapeImagetype(json_shapesObj[i].imagetype, selectedModel));
				}
				if(json_shapesObj[i].description!="undefined"){
					shapes[i].description = json_shapesObj[i].description;
				}
				shapes[i].imagetype = json_shapesObj[i].imagetype;
				setShapeControls(shapes[i]);
			}
		});
		
		//seoste laadimine
		$.getJSON('savefiles/'+$('#model_name').val()+'_C.json', function(json_connectionsObj) {			
			for(var i=0; i<json_connectionsObj.length; i++){
				makeConnection(shapes[json_connectionsObj[i].from], shapes[json_connectionsObj[i].to], json_connectionsObj[i].contype);
				if(json_connectionsObj[i].name!="undefined"){
					setConnectionLabel(connections[i], json_connectionsObj[i].name);
				}
			}
		});
		
		say('Loaded');
		addCPNlinkToPage();
	});

});
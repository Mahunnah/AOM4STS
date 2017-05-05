$( document ).ready(function() {
		var json_shapes;	//tipu json stringimassiiv
		var json_connections;	//seose json stringimassiiv
		$('#save_model').click(function(){
			//tippude salvestamine faili nimi_S.json
			json_shapes="[";
			for(var i=0;i<shapes.length;i++) {
				var bbox = shapes[i].getBBox();
				var name;
				if(shapes[i].name!==undefined){
					name = shapes[i].name.attr('text');
				}
				json_shapes += '{'
					 +'"id":'+shapes[i].id+','
					 +'"x":'+bbox.x+','
					 +'"y":'+bbox.y+','
					 +'"width":'+bbox.width+','
					 +'"height":'+bbox.height+','
					 +'"imagetype":"'+shapes[i].imagetype+'",'
					 +'"name":"'+name+'",'
					 +'"description":"'+shapes[i].description+'"'
					 +'},';
			}
			json_shapes = json_shapes.slice(0, -1);
			json_shapes += "]";
			writeJSON($('#model_name').val()+"_S", json_shapes);
			
			//seoste salvestamine faili nimi_C.json
			json_connections="[";
			for(var i=0;i<connections.length;i++) {
				if(connections[i].name!==undefined){
					name = connections[i].name.attr('text');
				}
				json_connections += '{'
					 +'"from":'+shapes.indexOf(connections[i].from)+','
					 +'"to":'+shapes.indexOf(connections[i].to)+','
					 +'"contype":"'+connections[i].contype+'",'
					 +'"name":"'+name+'"'
					 +'},';
			}
			json_connections = json_connections.slice(0, -1);
			json_connections += "]";
			writeJSON($('#model_name').val()+"_C", json_connections);
		});
});
$(document).ready(function(){
	var newShapeClicked=false;
	var clickedShapeID;
	$('#interaction_model_toolbar').on('click mousedown', '.interactionmodel_toolbar_button', function() {
		var div_id = $(this).attr('id');
		var shape_id = div_id;
		$('#holder9').css("cursor","crosshair");
		newShapeClicked=true;
		clickedShapeID = shape_id.split("_")[1];
		for(i=0;i<shapes.length;i++){
			if(clickedShapeID!=undefined && shapes[i].id==clickedShapeID){
				clickedShapeID=undefined;
				$('#holder9').css("cursor","default");
				say("Element already exists in interaction model!");
				$(this).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75);
			}
		}
	});
	
	clickedY = [];	//clickedY holds all Y-s of clicked shapes
	$('#holder9').bind('mousedown', function(e){					//pushing clicked Y of shapes to clickedY array
		if (e.target.nodeName != "svg" && e.target.nodeName != "DIV" ){
			$('#holder9').css("cursor","default");
			var holderPositionX = $("#holder9").offset().left;
			var holderPositionY = $("#holder9").offset().top;
			var mouseCoordinateX = e.pageX - holderPositionX;	
			var mouseCoordinateY = e.pageY - holderPositionY;
			clickedY.push(mouseCoordinateY);
		}
	});

	$('#holder9').bind('mouseup', function(e){					//fix agent height
		if (e.target.nodeName != "svg" && e.target.nodeName != "DIV" ){
			fixAgentHeight_InteractionModel();
		}
	});

	$('#holder9').bind('click mousedown mouseup', function(e){					//klikk joonistuspinnal - tipu lisamine
		if(newShapeClicked==true && clickedShapeID!=undefined){
			$('#holder9').css("cursor","default");
			var holderPositionX = $("#holder9").offset().left;
			var holderPositionY = $("#holder9").offset().top;
			var mouseCoordinateX = e.pageX - holderPositionX;	
			var mouseCoordinateY = e.pageY - holderPositionY;
			
			var newShapePosition = shapes.length;
			var originalShape = getElementByID(clickedShapeID);
			
			shapes[newShapePosition] = r.image("images/Agent_Interaction.png", mouseCoordinateX-45, mouseCoordinateY-20, 100, 470);
				
			//set name	
			var labelname = originalShape.simplename;
			setShapeLabel(shapes[newShapePosition], labelname, getCorrectLabelPosByShapeImagetype(originalShape.imagetype, selectedModel));	
			$(shapes[newShapePosition].name.node).css('text-decoration','underline');
			
			underlineBorder(shapes[newShapePosition]);

			setShapeControls(shapes[newShapePosition]);

			shapes[newShapePosition].id = originalShape.id;
			//set description
			shapes[newShapePosition].description = originalShape.description;

			//set simplename
			shapes[newShapePosition].simplename = originalShape.simplename;

			//set roles
			shapes[newShapePosition].roles = originalShape.roles;

			//set attributes
			shapes[newShapePosition].attributes = originalShape.attributes;

			//set imagetype
			shapes[newShapePosition].imagetype = originalShape.imagetype;

			showInteractionModelNames();

			cloneShapes();	
			newShapeClicked=false;
			clickedShapeID=undefined;
		}
	});

	function getElementByID(shape_id){
		for(i=0;i<agentm_shapes.length;i++){
			if(agentm_shapes[i].id == shape_id){
				return agentm_shapes[i];
			}		
		}
	}

	$("#interaction_agent_message,#interaction_physical_action").click(function(){
		//$(this).attr('id');
		
	});
});

function showInteractionModelNames(){
	var allagents ="";

	for(i=0;i<agentm_shapes.length;i++){
		if(agentm_shapes[i].imagetype=="Agent"){
			if(agentm_shapes[i].simplename!="" && agentm_shapes[i].simplename!=undefined){
				allagents+="<div id='interactionagent_"+agentm_shapes[i].id+"' class='interactionmodel_toolbar_button'><div class='agent_icon'></div> "+shortenName(agentm_shapes[i].simplename,10)+"</div>";
			}
			else{
				allagents+="<div id='interactionagent_"+agentm_shapes[i].id+"' class='interactionmodel_toolbar_button'><div class='agent_icon'></div> <i>~nameless</i></div>";
			}
		}
	}

	$("#interaction_model_toolbar").html(allagents);

	updateInteractionmShapes();
}

function updateInteractionmShapes(){
	//update agents 
	for(i=0;i<agentm_shapes.length;i++){
		for(j=0;j<shapes.length;j++){
			if(agentm_shapes[i].id==shapes[j].id){
				//set simplename
				shapes[j].simplename = agentm_shapes[i].simplename;

				//set description
				shapes[j].description = agentm_shapes[i].description;

				//set description
				shapes[j].roles = agentm_shapes[i].roles;

				setShapeLabel(shapes[j], shapes[j].simplename, getCorrectLabelPosByShapeImagetype(agentm_shapes[i].imagetype, selectedModel));	
				underlineBorder(shapes[j]);
			}
		}
	}

	var shapes_clone = interactionm_shapes.slice();	//holds items to that need to be deleted

	//selecting unnessessary agents
	for(var i=0; i < agentm_shapes.length; i++) {
		for(var j = shapes_clone.length - 1; j >= 0; j--) {
			if(agentm_shapes[i].imagetype=="Agent" && shapes_clone[j].imagetype=="Agent"){
				if(agentm_shapes[i].id == shapes_clone[j].id) {
					shapes_clone.splice(j, 1);
				}
			}
		}
	}

	//deleting unnessessary agents
	for(var i=0; i<shapes_clone.length; i++){
		deleteElementByShape(shapes_clone[i]);
	}
}
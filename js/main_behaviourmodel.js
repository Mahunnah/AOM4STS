$(document).ready(function(){
	var newShapeClicked=false;
	var clickedShapeID;
	$('#behaviour_model_toolbar').on('click mousedown', '.behaviourmodel_toolbar_button', function() {
		var div_id = $(this).attr('id');
		var shape_id = div_id;
		$('#holder10').css("cursor","crosshair");
		newShapeClicked=true;
		clickedShapeID = shape_id.split("_")[1];
		for(i=0;i<shapes.length;i++){
			if(clickedShapeID!=undefined && shapes[i].id==clickedShapeID){
				clickedShapeID=undefined;
				$('#holder10').css("cursor","default");
				say("Element already exists in behaviour model!");
				$(this).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75);
			}
		}
	});

	$(".behaviour_toolbar_button").bind('click mousedown', function(){
		if($(this).attr('id')=="behaviour_rule" || 
			$(this).attr('id')=="behaviour_activity_type" || 
				$(this).attr('id')=="behaviour_start_event" || 
					$(this).attr('id')=="behaviour_join"){
	
			clickedShapeID=$(this).attr('id');
			$('#holder10').css("cursor","crosshair");
			newShapeClicked=true;
		}
	});

	clickedY = [];	//clickedY holds all Y-s of clicked shapes
	$('#holder10').bind('mousedown', function(e){					//pushing clicked Y of shapes to clickedY array
		if (e.target.nodeName != "svg" && e.target.nodeName != "DIV" ){
			$('#holder10').css("cursor","default");
			var holderPositionX = $("#holder10").offset().left;
			var holderPositionY = $("#holder10").offset().top;
			var mouseCoordinateX = e.pageX - holderPositionX;	
			var mouseCoordinateY = e.pageY - holderPositionY;
			clickedY.push(mouseCoordinateY);
		}
	});

	$('#holder10').bind('mouseup', function(e){					//fix agent height
		if (e.target.nodeName != "svg" && e.target.nodeName != "DIV" ){
			fixAgentHeight_InteractionModel();
		}
	});

	$('#holder10').bind('click mousedown mouseup', function(e){					//klikk joonistuspinnal - tipu lisamine
		$('#holder10').css("cursor","default");
		var holderPositionX = $("#holder10").offset().left;
		var holderPositionY = $("#holder10").offset().top;
		var mouseCoordinateX = e.pageX - holderPositionX;	
		var mouseCoordinateY = e.pageY - holderPositionY;

		if(newShapeClicked==true && (clickedShapeID=="behaviour_rule" || 
						clickedShapeID=="behaviour_activity_type" || 
							clickedShapeID=="behaviour_start_event" || 
								clickedShapeID=="behaviour_join")){

			if(e.target.getAttribute("typeof") !== "agent"){
				return;
			}
			var newShapePosition = shapes.length;
			var originalShape = getElementByID(clickedShapeID);

			if(clickedShapeID=="behaviour_rule"){
				shapes[newShapePosition] = r.image("images/rule.png", mouseCoordinateX-15, mouseCoordinateY-15, 52, 50);
				//set name
				setShapeLabel(shapes[newShapePosition], "", getCorrectLabelPosByShapeImagetype("Rule", selectedModel));	
				//set imagetype
				shapes[newShapePosition].imagetype = "Rule";
			}
			else if(clickedShapeID=="behaviour_activity_type"){
				shapes[newShapePosition] = r.image("images/activitytype.png", mouseCoordinateX-15, mouseCoordinateY-15, 55, 35);
				//set name
				setShapeLabel(shapes[newShapePosition], "", getCorrectLabelPosByShapeImagetype("ActivityType", selectedModel));	
				//set imagetype
				shapes[newShapePosition].imagetype = "ActivityType";
			}
			else if(clickedShapeID=="behaviour_start_event"){
				shapes[newShapePosition] = r.image("images/startevent.png", mouseCoordinateX-15, mouseCoordinateY-15, 15, 15);
				//set name
				setShapeLabel(shapes[newShapePosition], "", getCorrectLabelPosByShapeImagetype("StartEvent", selectedModel));	
				//set imagetype
				shapes[newShapePosition].imagetype = "StartEvent";
			}
			else if(clickedShapeID=="behaviour_join"){
				shapes[newShapePosition] = r.image("images/join.png", mouseCoordinateX-15, mouseCoordinateY-15, 40, 40);
				//set name
				setShapeLabel(shapes[newShapePosition], "", getCorrectLabelPosByShapeImagetype("Join", selectedModel));	
				//set imagetype
				shapes[newShapePosition].imagetype = "Join";
			}

			setShapeControls(shapes[newShapePosition]);

			//set simplename
			shapes[newShapePosition].simplename = "";

			//set description
			shapes[newShapePosition].description = "";

			selectShape(shapes[newShapePosition]);

			shapes[newShapePosition].toFront();

			//showBehaviourModelNames();

			var parentAgent = getElementByID(e.target.getAttribute("agentid"));
			shapes[newShapePosition].generalImagetype = "BehaviourAgentChild";
			
			for(var i=0; i<behaviourm_shapes.length; i++){	
				if(behaviourm_shapes[i].id == parentAgent.id){
					shapes[newShapePosition].relatedCoordinates = {
						x: shapes[newShapePosition].getBBox().x - behaviourm_shapes[i].getBBox().x,
						y: shapes[newShapePosition].getBBox().y - behaviourm_shapes[i].getBBox().y					
					};
					behaviourm_shapes[i].childElements.push(shapes[newShapePosition]);
					shapes[newShapePosition].parentAgent = behaviourm_shapes[i];
				}
			}
			cloneShapes();	
			newShapeClicked=false;
			clickedShapeID=undefined;
			resetClicksOnNewShape();
		}
		else if(newShapeClicked==true && clickedShapeID!=undefined){
			var newShapePosition = shapes.length;
			var originalShape = getElementByID(clickedShapeID);
			
			shapes[newShapePosition] = r.image("images/Agent_Interaction.png", mouseCoordinateX-45, mouseCoordinateY-20, 100, 470);

			//set name	
			var labelname = originalShape.simplename;
			setShapeLabel(shapes[newShapePosition], labelname, getCorrectLabelPosByShapeImagetype(originalShape.imagetype, selectedModel));	

			if(shapes[newShapePosition].name.getBBox().width > shapes[newShapePosition].getBBox().width * 7/10){
				shapes[newShapePosition].attr("width", shapes[newShapePosition].name.getBBox().width + shapes[newShapePosition].name.getBBox().width*4/10)
			}
			shapes[newShapePosition].header = r.rect(shapes[newShapePosition].name.getBBox().x + 1,
								 shapes[newShapePosition].name.getBBox().y,
								 shapes[newShapePosition].getBBox().width * 7/10,
								 shapes[newShapePosition].name.getBBox().height);		
			shapes[newShapePosition].node.setAttribute("typeof", "agent");
			shapes[newShapePosition].node.setAttribute("agentid", originalShape.id);

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

			shapes[newShapePosition].childElements = [];

			shapes[newShapePosition].toBack();

			//showBehaviourModelNames();

			cloneShapes();	
			newShapeClicked=false;
			clickedShapeID=undefined;
			resetClicksOnNewShape();
		}
	});

	function getElementByID(shape_id){
		for(i=0;i<agentm_shapes.length;i++){
			if(agentm_shapes[i].id == shape_id){
				return agentm_shapes[i];
			}		
		}
	}

	
});


function showBehaviourModelNames(){
	var allagents ="";

	for(i=0;i<agentm_shapes.length;i++){
		if(agentm_shapes[i].imagetype=="Agent"){
			if(agentm_shapes[i].simplename!="" && agentm_shapes[i].simplename!=undefined){
				allagents+="<div id='behaviouragent_"+agentm_shapes[i].id+"' class='behaviourmodel_toolbar_button'><div class='agent_icon'></div> "+shortenName(agentm_shapes[i].simplename,10)+"</div>";
			}
			else{
				allagents+="<div id='behaviouragent_"+agentm_shapes[i].id+"' class='behaviourmodel_toolbar_button'><div class='agent_icon'></div> <i>~nameless</i></div>";
			}
		}
	}

	$("#behaviour_model_toolbar").html(allagents);

	//updateBehaviourmShapes();
}

function updateBehaviourmShapes(){
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

				setShapeLabel(shapes[j].header, shapes[j].simplename, getCorrectLabelPosByShapeImagetype(agentm_shapes[i].imagetype, selectedModel));	
			}
		}
	}

	var shapes_clone = behaviourm_shapes.slice();	//holds items to that need to be deleted

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
		//deleteElementByShape(shapes_clone[i]);
	}
}
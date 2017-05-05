$(document).ready(function(){
	var newShapeClicked=false;
	var clickedShapeID;
	$('#acquaintance_model_toolbar').on('click mousedown', '.acquaintancemodel_toolbar_button', function() {
		var agent_div_id = $(this).attr('id');
		var shape_id = agent_div_id.split("_")[1];
		$('#holder7').css("cursor","crosshair");
		newShapeClicked=true;
		clickedShapeID = shape_id;
		for(i=0;i<shapes.length;i++){
			if(shapes[i].id==clickedShapeID){
				clickedShapeID=undefined;
				$('#holder7').css("cursor","default");
				say("Element already exists in acquaintance model!");
				$(this).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75);
			}
		}
	});

	$('#holder7').bind('click mousedown mouseup', function(e){					//klikk joonistuspinnal - tipu lisamine
		if(newShapeClicked==true && clickedShapeID!=undefined){
			$('#holder7').css("cursor","default");
			var holderPositionX = $("#holder7").offset().left;
			var holderPositionY = $("#holder7").offset().top;
			var mouseCoordinateX = e.pageX - holderPositionX;	
			var mouseCoordinateY = e.pageY - holderPositionY;
				
			var newShapePosition = shapes.length;
			var originalShape = getElementByID(clickedShapeID);
			shapes[newShapePosition] = r.image("images/Agent.png", mouseCoordinateX-45, mouseCoordinateY-20, 90, 40);

			setShapeControls(shapes[newShapePosition]);

			//set name
			setShapeLabel(shapes[newShapePosition], originalShape.simplename, getCorrectLabelPosByShapeImagetype("Agent", selectedModel));	
			
			shapes[newShapePosition].id = originalShape.id;
			//set description
			shapes[newShapePosition].description = originalShape.description;

			//set simplename
			shapes[newShapePosition].simplename = originalShape.simplename;

			//set roles
			shapes[newShapePosition].roles = originalShape.roles;

			//set imagetype
			shapes[newShapePosition].imagetype = originalShape.imagetype;

			addAgentRoles(shapes[newShapePosition]);
			showAcquaintanceModelNames();

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

	$('#delete_acq_el_button').click(function(){	//by deleting agent delete all connected roles
		deleteAgent(selectedShape);
	});
	
	$('#save_acq_el_button').click(function(){
		for(i=0;i<agentm_shapes.length;i++){
			if(agentm_shapes[i].id==selectedShape.id){
				//set name
				setShapeLabel(agentm_shapes[i], $('#name_input').val(), getCorrectLabelPosByShapeImagetype("Agent", selectedModel));	
			
				//set description
				agentm_shapes[i].description = $('#description_input').val();

				//set simplename
				agentm_shapes[i].simplename = $('#name_input').val();
			}
		}
		showAcquaintanceModelNames();
	});
});

function showAcquaintanceModelNames(){
	var allagents ="";
	
	for(i=0;i<agentm_shapes.length;i++){
		if(agentm_shapes[i].imagetype=="Agent"){
			if(agentm_shapes[i].simplename!="" && agentm_shapes[i].simplename!=undefined){
				allagents+="<div id='acquaintancerole_"+agentm_shapes[i].id+"' class='acquaintancemodel_toolbar_button'><div class='agent_icon'></div> "+shortenName(agentm_shapes[i].simplename,10)+"</div>";
			}
			else{
				allagents+="<div id='acquaintancerole_"+agentm_shapes[i].id+"' class='acquaintancemodel_toolbar_button'><div class='agent_icon'></div> <i>~nameless</i></div>";
			}
		}
	}
	
	$("#acquaintance_model_toolbar").html(allagents);
	updateAgentmShapes();
}

function updateAgentmShapes(){
	//update role names
	for(i=0;i<goalm_shapes.length;i++){
			for(j=0;j<shapes.length;j++){
				var roleid = (shapes[j].id).toString().split("_")[0];
				if(goalm_shapes[i].id==roleid){
					var rolename = goalm_shapes[i].simplename;
					if(rolename==""){
						rolename = "~nameless";
					}
					//set name
					setShapeLabel(shapes[j], rolename, getCorrectLabelPosByShapeImagetype(shapes[j].imagetype, selectedModel));	

					//set description
					shapes[j].description = goalm_shapes[i].description;

					//set simplename
					shapes[j].simplename = goalm_shapes[i].simplename;

					//set constraints
					shapes[j].constraints = goalm_shapes[i].constraints;

					//set responsibilities
					shapes[j].responsibilities = goalm_shapes[i].responsibilities;
				}
			}
	}

	//update agent names
	for(i=0;i<agentm_shapes.length;i++){
			for(j=0;j<shapes.length;j++){
				if(agentm_shapes[i].id==shapes[j].id){
					var agentname = agentm_shapes[i].simplename;
					if(agentname==""){
						agentname = "~nameless";
					}
					
					//set name
					setShapeLabel(shapes[j], agentname, getCorrectLabelPosByShapeImagetype(shapes[j].imagetype, selectedModel));	

					//set description
					shapes[j].description = agentm_shapes[i].description;

					//set simplename
					shapes[j].simplename = agentm_shapes[i].simplename;

					//set roles
					shapes[j].roles = agentm_shapes[i].roles;
				}
			}
	}
	
	
	var am_shapes_clone = acquaintancem_shapes.slice();	//holds items to that need to be deleted

	//deleting unnessessary agents
	
	for(var i=0; i < agentm_shapes.length; i++) {
		for(var j = am_shapes_clone.length - 1; j >= 0; j--) {
			if(agentm_shapes[i].imagetype=="Agent" && am_shapes_clone[j].imagetype=="Agent"){
				if(agentm_shapes[i].id == am_shapes_clone[j].id) {
					am_shapes_clone.splice(j, 1);
				}
			}
		}
	}

	//deleting unnessessary roles

	for(var i=0; i < goalm_shapes.length; i++) {
		for(var j = am_shapes_clone.length - 1; j >= 0; j--) {
			var roleID = (am_shapes_clone[j].id).toString().split("_")[0];
			if(goalm_shapes[i].id == roleID) {		
				am_shapes_clone.splice(j, 1);
			}
		}
	}
	
	//deleting unnessessary agents and roles
	
	for(var i=0; i<am_shapes_clone.length; i++){
		if(am_shapes_clone[i].imagetype=="Agent"){
			deleteAgent(am_shapes_clone[i]);
		}
		else{
			deleteElementByShape(am_shapes_clone[i]);
		}
	}

	//adding new roles

	for(var i=0; i<shapes.length; i++){
		if(shapes[i].imagetype=="Agent"){
			addAgentRoles(shapes[i]);
		}
	}

	//deleting roles that were deleted in agent m
	var rolesID = [];
	var consID = [];
	for(var i=0; i<shapes.length; i++){
		if(shapes[i].imagetype=="Agent" && shapes[i].roles!=undefined){
			rolesID = shapes[i].roles.split(",");
			for(var j=0; j<rolesID.length; j++){
				rolesID[j]=rolesID[j]+"_"+shapes[i].id;
			}
			for(var j=0; j<acquaintancem_connections.length; j++){
				if(acquaintancem_connections[j].to.id==shapes[i].id && acquaintancem_connections[j].from.imagetype=="Role"){
					consID.push(acquaintancem_connections[j].from.id);
				}
				if(acquaintancem_connections[j].from.id==shapes[i].id && acquaintancem_connections[j].to.imagetype=="Role"){
					consID.push(acquaintancem_connections[j].to.id);
				}
			}	
			//alert(rolesID+"\n"+consID+"\n"+arrayDifference(rolesID,consID));
			var difArray = arrayDifference(rolesID,consID);
			for(var j=0; j<shapes.length; j++){
				for(var l=0; l<difArray.length; l++){
					if(shapes[j].imagetype=="Role" && shapes[j].id==difArray[l]){
						deleteElementByShape(shapes[j]);
					}
				}	
			}
		}
	}
	
}



function addAgentRoles(agent){
		var roles = agent.roles;
		var shapeIDs=[];
		for(var i=0;i<shapes.length;i++){
			if(shapes[i].imagetype=="Role"){
				shapeIDs.push(shapes[i].id);
			}
		}

		if(roles!=undefined){
			var rolesIDArray = roles.split(",");
			var agentX = agent.attr("x");
			var agentY = agent.attr("y");		

			for(var j=0;j<rolesIDArray.length;j++){
				for(var i=0;i<goalm_shapes.length;i++){
					if(rolesIDArray[j]==goalm_shapes[i].id && shapeIDs.indexOf(goalm_shapes[i].id+"_"+agent.id)==-1){	
						var newX1 = agentX-150;var newX2 = agentX+150;
						var newY1 = agentY-150;var newY2 = agentY+150;
						if(newX1<0){newX1=0;}
						if(newY1<0){newY1=0;}						
						if(newX2>$("#holder").width()-150){newX2=$("#holder").width();}
						if(newY2>($("#holder").height()*2/3)-150){newY2=$("#holder").height()*2/3;}
	
						var randomX = $("#holder").offset().left + randomNumber(newX1,newX2);
						var randomY = $("#holder").offset().top + randomNumber(newY1,newY2);
						var newRole = addNewShape("Agent",randomX,randomY,selectedModel);
						
						var rolename = goalm_shapes[i].simplename;
						if(rolename==""){
							rolename = "~nameless";
						}

						//set name
						setShapeLabel(newRole, rolename, getCorrectLabelPosByShapeImagetype("Agent", selectedModel));	
			
						newRole.id = goalm_shapes[i].id+"_"+agent.id;
						//set description
						newRole.description = goalm_shapes[i].description;

						//set simplename
						newRole.simplename = goalm_shapes[i].simplename;

						//set constraints
						newRole.roles = goalm_shapes[i].roles;

						//set imagetype
						newRole.imagetype = goalm_shapes[i].imagetype;


						var conType = getCorrectConnectionType(newRole, agent, selectedModel);
						makeConnection(newRole, agent, conType);
					}
				}
			}
		}
	}

	function deleteAgent(agent){
		selectShape(agent);
		var Roles = [];
		for(i=0;i<connections.length;i++){
			if(connections[i].to.id==agent.id && connections[i].from.imagetype=="Role"){
				Roles.push(connections[i].from);
			}	
			else if(connections[i].from.id==agent.id && connections[i].to.imagetype=="Role"){
				Roles.push(connections[i].to);
			}
		}
		for(i=0;i<Roles.length;i++){
			deleteElementByShape(Roles[i]);
		}
		deleteElement();
	}

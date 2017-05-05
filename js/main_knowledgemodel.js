$(document).ready(function(){
	var newShapeClicked=false;
	var clickedShapeID;
	$('#knowledge_model_toolbar').on('click mousedown', '.knowledgemodel_toolbar_button', function() {
		var div_id = $(this).attr('id');
		var shape_id = div_id;
		$('#holder8').css("cursor","crosshair");
		newShapeClicked=true;
		clickedShapeID = shape_id;
		for(i=0;i<shapes.length;i++){
			if(clickedShapeID!=undefined && shapes[i].id==clickedShapeID.split("_")[1]){
				clickedShapeID=undefined;
				$('#holder8').css("cursor","default");
				say("Element already exists in knowledge model!");
				$(this).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75);
			}
		}
	});
	
	$('#holder8').bind('click mousedown mouseup', function(e){					//klikk joonistuspinnal - tipu lisamine
		if(newShapeClicked==true && clickedShapeID!=undefined){
			$('#holder8').css("cursor","default");
			var holderPositionX = $("#holder8").offset().left;
			var holderPositionY = $("#holder8").offset().top;
			var mouseCoordinateX = e.pageX - holderPositionX;	
			var mouseCoordinateY = e.pageY - holderPositionY;
				
			var newShapePosition = shapes.length;
			var originalShape = getKMElementByID(clickedShapeID);
			
			if(originalShape.imagetype=="Agent"){
				shapes[newShapePosition] = r.image("images/Resource.png", mouseCoordinateX-45, mouseCoordinateY-20, 120, 70);
				
				//set name
				
				var labelname = getAgentNameWithRoles(originalShape);
				setShapeLabel(shapes[newShapePosition], labelname, getCorrectLabelPosByShapeImagetype(originalShape.imagetype, selectedModel));	
			}
			else{
				shapes[newShapePosition] = r.image("images/Resource2.png", mouseCoordinateX-45, mouseCoordinateY-20, 120, 70);

				//set name
				var labelname = originalShape.simplename;
				setShapeLabel(shapes[newShapePosition], labelname.split("\n").join(" "), getCorrectLabelPosByShapeImagetype(originalShape.imagetype, selectedModel));	
			}

			setShapeControls(shapes[newShapePosition]);

			shapes[newShapePosition].id = originalShape.id;
			//set description
			shapes[newShapePosition].description = originalShape.description;

			//set simplename
			shapes[newShapePosition].simplename = originalShape.simplename;

			//set roles
			shapes[newShapePosition].roles = originalShape.roles;

			//set attributes
			shapes[newShapePosition].attributes = "";

			//set attributes
			shapes[newShapePosition].methods = "";

			//set imagetype
			shapes[newShapePosition].imagetype = originalShape.imagetype;

			showKnowledgeModelNames();

			cloneShapes();	
			newShapeClicked=false;
			clickedShapeID=undefined;
		}
	});

	$("#add_attibute_button").click(function(){
		var attr_name = $("#attr_name").val();
		var attr_val = $("#attr_val").val();

		if(attr_name!="" && attr_val!=""){
			if(selectedShape.attributes!=undefined && selectedShape.attributes!=""){
				selectedShape.attributes +=",";
			}
			selectedShape.attributes +=attr_name+":"+attr_val;
		}
		showAttributes();
		showNameWithAttributes();
	});

	$("#add_method_button").click(function(){
		var method_name = $("#method_name").val();

		if (method_name.indexOf('(') === -1 && method_name.indexOf(')') === -1 && method_name!="") {
			method_name += '()';
		}

		if (!selectedShape.methods) {
			selectedShape.methods = '';
		}

		if(method_name!=""){
			if(selectedShape.methods!=undefined && selectedShape.methods!=""){
				selectedShape.methods +=",";
			}
			selectedShape.methods += method_name;
		}
		showMethods();
		showNameWithAttributes();
	});

	$('#attributes_content').on('click', '.resource_attributes', function() {
		var clickedID = $(this).attr('id').split("_")[1];
		var attArray = selectedShape.attributes.split(",");
		var attrs = "";
		for(var i=0;i<attArray.length;i++){
			if(i!=clickedID){
				attrs+=attArray[i]+",";
			}
		}
		selectedShape.attributes = attrs.substring(0,attrs.length-1);
		showAttributes();
	});

	$('#methods_content').on('click', '.resource_methods', function() {
		var clickedID = $(this).attr('id').split("_")[1];
		var metArray = selectedShape.methods.split(",");
		var mets = "";
		for(var i=0;i<metArray.length;i++){
			if(i!=clickedID){
				mets+=metArray[i]+",";
			}
		}
		selectedShape.methods = mets.substring(0,mets.length-1);
		showMethods();
	});
});

function showAttributes(){	
	var attArray = selectedShape.attributes.split(',');
	var attributesToDisplay="";
	for(var i=0;i<attArray.length;i++){
		attributesToDisplay+="<div id='resourceattribute_"+i+"' class='resource_attributes'>"+attArray[i]+"</div><br>";
	}

	$("#attributes_content").html(attributesToDisplay);
	$("#attr_name").val("");
	$("#attr_val").val("");
	showNameWithAttributes();
}
function showMethods () {
	var metArray = (selectedShape.methods || '').split(',');
	var metsToDisplay="";

	for(var i=0;i<metArray.length;i++){
		metsToDisplay+="<div id='resourcemethod_"+i+"' class='resource_methods'>"+metArray[i]+"</div><br>";
	}

	$("#methods_content").html(metsToDisplay);
	$("#method_name").val("");
	showNameWithAttributes();		
}

function showRoles(){	
	$("#roles_content").html(getAgentRoleNames(selectedShape));
}
function showNameWithAttributes(shape){
	var nameToDisplay="";
	if(shape==undefined){
		shape=selectedShape;
	}
	
	if (shape.attributes==undefined) {
		shape.attributes = '';
	}
	if (shape.methods==undefined) {
		shape.methods = '';
	}

	if(shape.simplename==undefined || shape.simplename==""){
		nameToDisplay = "~nameless"; 
	} else {
		shape.simplename.split("\n").join(" ");
	}

	if(shape.attributes != ""){
		nameToDisplay += "\n" + shape.attributes.split(',').join('\n');
	}
	if(shape.methods != ""){
		nameToDisplay += "\n" + shape.methods.split(',').join('\n');	
	}
	
	setShapeLabel(shape, nameToDisplay, getCorrectLabelPosByShapeImagetype(shape.imagetype, selectedModel));	
}

function getAgentNameWithRoles(originalShape){
	var roleNames = getAgentRoleNames(originalShape);
	var agentname = originalShape.simplename;
	if(agentname=="" || agentname==undefined){
		agentname="~nameless";
	}
	var labelname = "<<AgentType>>\n"+agentname+"/"+roleNames;
	return labelname;
}

function getAgentRoleNames(originalShape){
	var roleNames = "";	
	if(originalShape.roles!=undefined){
		var rolesArray = originalShape.roles.split(",");
		
		for(var i=0;i<rolesArray.length;i++){
			var role = getKMElementByID(rolesArray[i]);
			if(role!=undefined){
				if(role.simplename==undefined || role.simplename==""){
					roleNames+="~nameless";
				}
				else{
					roleNames+=role.simplename;
				}
				var roleNamesArray = roleNames.split("\n");
				if(roleNamesArray[roleNamesArray.length-1].length > 13){
					roleNames+=",\n";
				}
				else{
					roleNames+=", ";
				}
			}
		}				
		roleNames = "\n"+roleNames.substring(0,roleNames.length-2);
	}
	return roleNames;
}

function getKMElementByID(shape_id){	//shape_id is like "knowledgeagent_00"
	var idArray = shape_id.split("_");
	if(idArray[0]=="knowledgeagent"){
		for(var i=0;i<agentm_shapes.length;i++){
			if(agentm_shapes[i].id == idArray[1]){
				return agentm_shapes[i];
			}		
		}
	}
	else if(idArray[0]=="knowledgeresource"){
		for(i=0;i<domainm_shapes.length;i++){
			if(domainm_shapes[i].id == idArray[1]){
				return domainm_shapes[i];
			}		
		}
	}
	else{	//for getting roles by id
		for(var i=0;i<goalm_shapes.length;i++){
			if(goalm_shapes[i].imagetype=="Role" && goalm_shapes[i].id == shape_id){
				return goalm_shapes[i];
			}		
		}
	}
	return undefined;
}

function showKnowledgeModelNames(){
	var allagents="";
	
	for(i=0;i<agentm_shapes.length;i++){
		if(agentm_shapes[i].imagetype=="Agent"){
			if(agentm_shapes[i].simplename!="" && agentm_shapes[i].simplename!=undefined){
				allagents+="<div id='knowledgeagent_"+agentm_shapes[i].id+"' class='knowledgemodel_toolbar_button'><div class='agent_icon'></div> "+shortenName(agentm_shapes[i].simplename,10)+"</div>";
			}
			else{
				allagents+="<div id='knowledgeagent_"+agentm_shapes[i].id+"' class='knowledgemodel_toolbar_button'><div class='agent_icon'></div> <i>~nameless</i></div>";
			}
		}
	}
	
	$("#knowledge_model_toolbar_agents").html(allagents);

	var allresources="";
	
	for(i=0;i<domainm_shapes.length;i++){
		if(domainm_shapes[i].imagetype=="Resource"){
			if(domainm_shapes[i].simplename!="" && domainm_shapes[i].simplename!=undefined){
				allresources+="<div id='knowledgeresource_"+domainm_shapes[i].id+"' class='knowledgemodel_toolbar_button'><div class='resource_icon'></div> "+shortenName(domainm_shapes[i].simplename,10)+"</div>";
			}
			else{
				allresources+="<div id='knowledgeresource_"+domainm_shapes[i].id+"' class='knowledgemodel_toolbar_button'><div class='resource_icon'></div> <i>~nameless</i></div>";
			}
		}
	}
	
	$("#knowledge_model_toolbar_resources").html(allresources);

	updateKnowmShapes();
}

function updateKnowmShapes(){
	//update resources 
	for(i=0;i<domainm_shapes.length;i++){
		for(j=0;j<shapes.length;j++){
			if(domainm_shapes[i].id==shapes[j].id){
				//set simplename
				shapes[j].simplename = domainm_shapes[i].simplename;

				//set description
				shapes[j].description = domainm_shapes[i].description;

				showNameWithAttributes(shapes[j]);
			}
		}
	}

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

				var labelname = getAgentNameWithRoles(agentm_shapes[i]);
				setShapeLabel(shapes[j], labelname, getCorrectLabelPosByShapeImagetype(agentm_shapes[i].imagetype, selectedModel));	
			}
		}
	}

	var shapes_clone = knowledgem_shapes.slice();	//holds items to that need to be deleted

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
	//selecting unnessessary resources
	for(var i=0; i < domainm_shapes.length; i++) {
		for(var j = shapes_clone.length - 1; j >= 0; j--) {
			if(domainm_shapes[i].imagetype=="Resource" && shapes_clone[j].imagetype=="Resource"){
				if(domainm_shapes[i].id == shapes_clone[j].id) {
					shapes_clone.splice(j, 1);
				}
			}
		}
	}

	//deleting unnessessary agents and roles
	for(var i=0; i<shapes_clone.length; i++){
		deleteElementByShape(shapes_clone[i]);
	}
}


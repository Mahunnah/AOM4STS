$(document).ready(function(){
	$('#agent_model_toolbar').on('click', '.agentmodel_toolbar_button', function() {
   		var agent_div_id = $(this).attr('id');
		var shape_id = agent_div_id.split("_")[1];
		cancelEditAgentModel();
		createAgentModel(shape_id);
	});
	$('#agent_model_toolbar').on('click', '#agent_new', function() {
   		cancelEditAgentModel();
		var randomX = $("#holder7").offset().left + randomNumber(70,$("#holder7").width());
		var randomY = $("#holder7").offset().top + randomNumber(70,$("#holder7").height()*2/3);
		var newAgent = addNewShape("Agent",randomX,randomY,"AcquaintanceModel");
		showAgentModelNames();
		createAgentModel(newAgent.id);
		$('#edit_agentmodel_button').click();
	});	
	$('#agentmodeltable').on('click', '.agentmodel_role_pickup_button', function() {
		var role_div_id = $(this).attr('id');
		var shape_id = role_div_id.split("_")[1];
		var role = getRoleByID(shape_id);
		if(role!=undefined){
			$("#agentmodel_table_roles").html($("#agentmodel_table_roles").html()+"<div id='"+shape_id+"' class='agentmodel_role'>"+role.simplename+"</div>");
		}
		$('#edit_agentmodel_button').click().click();//showRoleNames(agent_id)
	});
	$('#agentmodeltable').on('click', '.agentmodel_role', function() {
		var thisID = $(this).attr('id');
		$(this).remove(); 

		//delete chosen resps
		$('.agent_responsibility').each(function(i, obj) {
		    var resIDByAgent = obj.id.split('_')[1];

		    if(resIDByAgent == thisID) {
		    	removeResponsibilityID(obj.id);
		    	obj.remove();
			}
		});

		$('#edit_agentmodel_button').click().click();	//comment out to test TODO
		updateResponsibilitiesPickupBox(currentAgent);
	});
	$('#edit_agentmodel_button').click(function(){
		//EDIT
		if($(".agentmodel_textarea").css("display")=="block"){
			$(".agentmodel_textarea_edit").css("display","block");

			$('#agentmodel_table_name_edit').val($('#agentmodel_table_name').html());
			$('#agentmodel_table_description_edit').val($('#agentmodel_table_description').html());
			
			var currentShape_id = $('#agentmodel_table_id').val();
			var agent = getShapeByID(currentShape_id);
			var rolesToView = "";
			if(agent!=undefined && agent.roles!=undefined){
				var roles = agent.roles;
				var rolesIDArray = roles.split(",");
				for(var i=0;i<rolesIDArray.length;i++){
					var role = getRoleByID(rolesIDArray[i]);
					if(role!=undefined){
						var rolename=role.simplename;
						if(rolename==""){
							rolename="<i>~nameless</i>";
						}
						rolesToView += "<div id='"+rolesIDArray[i]+"' class='agentmodel_role'>"+rolename+"</div>";
					}
				}
			}

			//edit resps
			if (agent.responsibilitiesID) {
				var respDIVs = '';
				agent.responsibilitiesID.split(',').forEach(function (respID) {
					if (respID != '') {
						respDIVs += '<div id="chosen-' + respID + '" class="agent_responsibility">' + getAgentResponsibilityName(respID) + '</div>';
					}	
				});
				$('#agentmodel_table_responsibilites').html(respDIVs);
			}

			$("#agentmodel_table_roles").html(rolesToView);

			$("#agentmodel_roles_pickup_box").css("display","block");
			$("#agentmodel_responsibilities_pickup_box").css("display","block");
			showRoleNames(currentShape_id);
			$(".agentmodel_textarea").css("display","none");
			$('#edit_agentmodel_button').val("Save");
		}
		else{	//SAVE
			$(".agentmodel_textarea").css("display","block");
			$(".agentmodel_textarea_edit").css("display","none");
			$("#agentmodel_roles_pickup_box").css("display","none");
			$("#agentmodel_responsibilities_pickup_box").css("display","none");
			$('#edit_agentmodel_button').val("Edit");
			var currentShape_id = $('#agentmodel_table_id').val();
			
			for(i=0;i<shapes.length;i++){
				if(shapes[i].imagetype=="Agent" && shapes[i].id==currentShape_id){		//saving
					setShapeLabel(shapes[i], $('#agentmodel_table_name_edit').val());
					shapes[i].simplename = $('#agentmodel_table_name_edit').val();
					shapes[i].description = $('#agentmodel_table_description_edit').val();
					var roleIDs = "";
					$('.agentmodel_role').each(function () {
    						roleIDs+=this.id+",";
					});
					shapes[i].roles = roleIDs.substring(0,roleIDs.length-1);
					updateResponsibilitiesPickupBox(shapes[i]);
				}
			}

			showAgentModelNames();
			createAgentModel(currentShape_id);
		}
	});
	$('#delete_agentmodel_button').click(function(){
		var currentShape_id = $('#agentmodel_table_id').val();
		deleteElementByShape(getShapeByID(currentShape_id));
		$(".agentmodelcontent").css("display","none");
		cancelEditAgentModel();
		showAgentModelNames();
	});

	//Adding responsibility
	$('#agentmodel_responsibilities_pickup_box').on('click', '.agent_responsibility_option', function(){
		//choosing from resp box
		if (!currentAgent.responsibilitiesID) {
			currentAgent.responsibilitiesID = '';
		}

		if (currentAgent.responsibilitiesID.indexOf($(this).attr('id')) == -1) {
			$('#agentmodel_table_responsibilites').html($('#agentmodel_table_responsibilites').html() + 
				'<div id="chosen-' + $(this).attr('id') + '" class="agent_responsibility">' + $(this).text() + '</div>');

			currentAgent.responsibilitiesID += $(this).attr('id') + ',';
		}
		updateResponsibilitiesPickupBox(currentAgent);
	});

	//Removing responsibility
	$('#agentmodel_table_responsibilites').on('click', '.agent_responsibility', function() {
		removeResponsibilityID($(this).attr('id'));
		$(this).remove();
	});
});

function removeResponsibilityID(respID) {
	var curID = respID.split('-')[1] + ',';

	var regex = new RegExp(curID,"gi");
	currentAgent.responsibilitiesID = currentAgent.responsibilitiesID.replace(regex,'');

	updateResponsibilitiesPickupBox(currentAgent);
}

function showAgentModelNames(){
	var allagents ="";
	allagents+="<div id='agent_new' class='agentmodel_toolbar_button'><div class='agent_icon'></div> Create new</div>";
	for(i=0;i<shapes.length;i++){
		if(shapes[i].imagetype=="Agent"){
			if(shapes[i].simplename!="" && shapes[i].simplename!=undefined){
				allagents+="<div id='agentrole_"+shapes[i].id+"' class='agentmodel_toolbar_button'><div class='agent_icon'></div> "+shortenName(shapes[i].simplename,10)+"</div>";
			}
			else{
				allagents+="<div id='agentrole_"+shapes[i].id+"' class='agentmodel_toolbar_button'><div class='agent_icon'></div> <i>~nameless</i></div>";
			}
		}
	}

	$("#agent_model_toolbar").html(allagents);
}

function showRoleNames(agent_id){
	var agent = getShapeByID(agent_id);
	var roles="";
	var rolesIDArray=[];
	if(agent!=undefined && agent.roles!=undefined){
		roles = agent.roles;
		rolesIDArray = roles.split(",");
	}

	var agentm_roles_clone = goalm_shapes.slice();	
	for(var i=0; i < rolesIDArray.length; i++) {
  		for(var j=0; j < agentm_roles_clone.length; j++) {
    			if(rolesIDArray[i] == agentm_roles_clone[j].id) {
      				agentm_roles_clone.splice(j, 1);
    			}
  		}
	}

	var allroles ="";
	for(i=0;i<agentm_roles_clone.length;i++){
		if(agentm_roles_clone[i].imagetype=="Role")
			if(agentm_roles_clone[i].simplename!="" && agentm_roles_clone[i].simplename!=undefined){
				allroles+="<div id='agentrole_"+agentm_roles_clone[i].id+"' class='agentmodel_role_pickup_button'><div class='role_icon'></div> "+shortenName(agentm_roles_clone[i].simplename,10)+"</div>";
			}
			else{
				allroles+="<div id='agentrole_"+agentm_roles_clone[i].id+"' class='agentmodel_role_pickup_button'><div class='role_icon'></div> <i>~nameless</i></div>";
			}
	}
	$("#agentmodel_roles_pickup_box").html(allroles);	
}

function createAgentModel(shape_id){
	var agent_model = "";
	$(".agentmodelcontent").css("display","table");
	$('.agentmodel_textarea_edit').val("");
	$("#agentmodel_table_roles").html("");
	var roles="";
	for(i=0;i<shapes.length;i++){
		if(shapes[i].imagetype=="Agent" && shapes[i].id==shape_id){
			$('#agentmodel_table_name').html(shapes[i].simplename);
			$('#agentmodel_table_description').html(shapes[i].description);
			$('#agentmodel_table_id').val(shape_id);
			
			showResponsibilities(shapes[i]);
			currentAgent = shapes[i];
			roles = shapes[i].roles;
			updateResponsibilitiesPickupBox(shapes[i]);
			break;
		}
	}
	if(roles!=undefined){
		var rolesArray = roles.split(",");
		var rolenames="";
		for(var j=0;j<rolesArray.length;j++){
			var role = getRoleByID(rolesArray[j]);
				if(role!=undefined){
					var rolename = role.simplename;
					if(rolename==""){
						rolename="<i>~nameless</i>";
				}
				rolenames+=rolename+", ";
			}
		}
		rolenames=rolenames.substring(0,rolenames.length-2);
		$('#agentmodel_table_roles').html(rolenames);
	}

	$(".agentmodel_toolbar_button").removeClass("selected_agentmodel_role_name");
	$("#agentrole_"+shape_id).addClass("selected_agentmodel_role_name");
}

function showResponsibilities(agent) {
	var respNames = '';
	if (agent.responsibilitiesID) {
		agent.responsibilitiesID.split(',').forEach(function(respID) {
			if (respID != '') {
				respNames += '• ' + getAgentResponsibilityName(respID) + '\n';
			}
		});
	}
	$('#agentmodel_table_responsibilites').html(respNames);
}

function cancelEditAgentModel(){
	$(".agentmodel_textarea").css("display","block");
	$(".agentmodel_textarea_edit").css("display","none");
	$('#edit_agentmodel_button').val("Edit");
	$("#agentmodel_roles_pickup_box").css("display","none");
	$("#agentmodel_responsibilities_pickup_box").css("display","none");
}

function getRoleByID(id){
	for(i=0;i<goalm_shapes.length;i++){
		if(goalm_shapes[i].imagetype=="Role" && goalm_shapes[i].id == id){
			return goalm_shapes[i];
		}
	}
}

function updateResponsibilitiesPickupBox(agent) {
	//Updates responsibilities pickup box
	if (!agent.responsibilitiesID) {
		agent.responsibilitiesID = '';
	}

	var roleResps = '';
	goalm_shapes.forEach(function (goalshape) {
		if (goalshape.imagetype.toLowerCase() === 'role' && agent.roles && agent.roles.indexOf(goalshape.id) !== -1) {
			goalshape.responsibilities.split('•').forEach(function(roleResponsibility, i) {
				var newID = 'agentResponsibility_' + goalshape.id+ '_' + i;
				if(roleResponsibility.trim() != '' && agent.responsibilitiesID.indexOf(newID) == -1) {
					roleResps += '<div id="'+newID+'" class="agent_responsibility_option">' + roleResponsibility + '</div>';
				}
			});
		}
	});

	$('#agentmodel_responsibilities_pickup_box').html(roleResps);	
}

function getAgentResponsibilityName(respID) {
	var respIDParts = respID.split('_');
	var respName = null;
	goalm_shapes.some(function (goalshape) {
		if (goalshape.id == respIDParts[1]) {
			goalshape.responsibilities.split('•').some(function (roleResponsibility, i) {
				if(roleResponsibility.trim() != '' && i == respIDParts[2]) {
					respName = roleResponsibility.trim();
				}
			});
		} 
	});

	return respName;
} 
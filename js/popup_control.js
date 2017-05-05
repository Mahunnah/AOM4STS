$( document ).ready(function() {
	$("#save_element_button, #save_acq_el_button").click(function(){		//tipu salvestamise kuulamine
		saveElement();
		$("#popup_window").css("display", "none");
	});
	$('#delete_element_button, #delete_org_el_button').click(deleteElement);	//kustutamise nupu kuulamine	
	$("#delete_connection_button, #delete_org_con_button").click(function(){	//seose kustutamise nupu kuulamine
		deleteConnection(selectedConnection);
		$("#popup_window").css("display", "none");
	});	
	$("#save_connection_button").click(save_connection);
	$("#cancel_button, #close_org_el_button, #close_org_con_button, #close_acq_el_button").click(function(){	//tühistamise nupu kuulamine
		resetClicksOnNewShape();
		closePopUpWindow();
	});
		
	$("#edit_responsibilities_and_constraints_button").click(function(){
		if($("#responsibilities_and_constraints_fields").css("display")=="none"){
			$("#responsibilities_and_constraints_fields").css("display", "block");
			$("#edit_responsibilities_and_constraints_button").val("Hide responsibilities and constraints");
			$("#popup_display_content").animate({ scrollTop: $('#popup_display_content')[0].scrollHeight}, 1000);
		}
		else{
			$("#responsibilities_and_constraints_fields").css("display", "none");
			$("#edit_responsibilities_and_constraints_button").val("Show responsibilities and constraints");
		}
	});
	$("#edit_element_button").click(toggleLock);
});


	function modifyShapePopup(){	//tipu muutmise hüpikaknaga editori avamine	
		creatingNewElement = false;
		$('#name_input').val('');
		$('#description_input').val('');
		$('#responsibilities_input').val('');
		$('#constraints_input').val('');
		if(selectedShape.name!=null && selectedShape.name!=""){
			//$('#name_input').val(selectedShape.name.attr('text'));
			$('#name_input').val(selectedShape.simplename);
		}
		if(selectedShape.description!=null && selectedShape.description!=""){
			$('#description_input').val(selectedShape.description);
		}
		if(selectedShape.responsibilities!=null && selectedShape.responsibilities!=""){
			$('#responsibilities_input').val(selectedShape.responsibilities);
		}
		if(selectedShape.constraints!=null && selectedShape.constraints!=""){
			$('#constraints_input').val(selectedShape.constraints);
		}
		setPopupVisible();
	}

	function modifyConnectionPopup(){			//seose muutmise hüpikaknaga editori avamine	
		creatingNewConnection = false;
		$('#name_input').val('');
		$('#description_input').val('');
		if(selectedConnection.name!=null && selectedConnection.name!=""){
			$('#name_input').val(selectedConnection.name.attr('text'));
		}
		$("#edit_element_button").css("display", "inline-block");
		$(".connection_content").css("display", "inline-block");
		
		setPopupVisibleConnection();
	}
	function setPopupVisible(){		//controls which window will pop up
		closePopUpWindow();
		$("#popup_window").css("display", "block");
		$("#popup_display_content").css("display", "block");
		$("#popup_label").html("Details");
		$("#edit_element_button").css("display", "inline-block");
		$(".shape_content").css("display", "inline-block");

		checkLock();

		if(selectedShape.imagetype=="Role" && selectedModel == "GoalModel"){
			$("#popup_display_content_goalmodel_role").css("display", "block");
			$("#responsibilities_and_constraints_contents").css("display", "block");
			$("#popup_label").html("Role details");
		}
		else if(selectedShape.imagetype=="FG" && selectedModel == "GoalModel"){
			$("#popup_display_content_goalmodel_fg").css("display", "block");
			$("#popup_label").html("Functional Goal details");
		}
		else if(selectedShape.imagetype=="QG" && selectedModel == "GoalModel"){
			$("#popup_display_content_goalmodel_qg").css("display", "block");
			$("#popup_label").html("Quality Goal details");
		}
		else if(selectedShape.imagetype=="EG" && selectedModel == "GoalModel"){
			$("#popup_display_content_goalmodel_eg").css("display", "block");
			$("#popup_label").html("Emotion details");
		}
		else if(selectedShape.imagetype=="NEG" && selectedModel == "GoalModel"){
			$("#popup_display_content_goalmodel_neg").css("display", "block");
			$("#popup_label").html("Negative Emotion details");
		}
		else if(selectedShape.imagetype=="Role" && selectedModel == "DomainModel"){
			$("#responsibilities_and_constraints_contents").css("display", "block");
			$("#edit_element_button").css("display", "none");
			lock();
			$(".popup_goalm_action_button").css("display", "none");
			$(".popup_orgm_action_button").css("display", "inline-block");
			$("#popup_display_content_domainmodel_role").css("display", "block");
			$("#popup_label").html("Role details");
		}
		else if(selectedShape.imagetype=="Resource" && selectedModel == "DomainModel"){
			$("#popup_display_content_domainmodel_resource").css("display", "block");
			$("#popup_label").html("Domain Entity details");
		}
		else if(selectedShape.imagetype=="Role" && selectedModel == "OrganizationModel"){
			$("#responsibilities_and_constraints_contents").css("display", "block");
			$("#popup_label").html("Role details");
			$("#edit_element_button").css("display", "none");
			lock();
			$(".popup_goalm_action_button").css("display", "none");
			$(".popup_orgm_action_button").css("display", "inline-block");
		}
		else if(selectedShape.imagetype=="Role" && selectedModel == "AcquaintanceModel"){
			$("#responsibilities_and_constraints_contents").css("display", "block");
			$("#popup_label").html("Role details");
			$("#edit_element_button").css("display", "none");
			lock();
			$(".popup_goalm_action_button").css("display", "none");
			$("#close_org_el_button").css("display", "inline-block");
		}
		else if(selectedShape.imagetype=="Agent" && selectedModel == "AcquaintanceModel"){
			$("#popup_label").html("Agent details");
			lock();
			$(".popup_goalm_action_button").css("display", "none");
			$(".popup_acqm_action_button").css("display", "inline-block");
		}
		else if(selectedShape.imagetype=="Agent" && selectedModel == "KnowledgeModel"){
			$("#popup_label").html("Agent details");
			$("#edit_element_button").css("display", "none");
			lock();
			$(".popup_goalm_action_button").css("display", "none");
			$(".popup_orgm_action_button").css("display", "inline-block");
			$("#roles").css("display", "block");
			showRoles();
		}
		else if(selectedShape.imagetype=="Resource" && selectedModel == "KnowledgeModel"){
			$("#popup_label").html("Resource details");
			$("#edit_element_button").css("display", "none");
			lock();
			$(".popup_goalm_action_button").css("display", "none");
			$(".popup_orgm_action_button").css("display", "inline-block");
			$("#attributes").css("display", "block");
			showAttributes();
			showMethods();
		}
		else if(selectedShape.imagetype=="Agent" && selectedModel == "InteractionModel"){
			$("#popup_label").html("Agent details");
			$("#edit_element_button").css("display", "none");
			lock();
			$(".popup_goalm_action_button").css("display", "none");
			$(".popup_orgm_action_button").css("display", "inline-block");
			$("#roles").css("display", "block");
			showRoles();
		}
		else if(selectedShape.imagetype=="Agent" && selectedModel == "BehaviourModel"){
			$("#popup_label").html("Agent details");
			$("#edit_element_button").css("display", "none");
			lock();
			$(".popup_goalm_action_button").css("display", "none");
			$(".popup_orgm_action_button").css("display", "inline-block");
			$("#roles").css("display", "block");
			showRoles();
		}
		else if(selectedModel == "CPNModel"){
			closePopUpWindow();
		}
	}
	function setPopupVisibleConnection(){
		closePopUpWindow();
		$("#popup_window").css("display", "block");
		$("#popup_display_content").css("display", "block");
		$("#popup_label").html("Connection details");
		$("#edit_element_button").css("display", "inline-block");
		$(".popup_goalm_con_action_button").css("display", "inline-block");
		
		if(selectedModel=="OrganizationModel"){
			$("#edit_element_button").css("display", "none");
			$(".popup_orgm_con_action_button").css("display", "inline-block");
			$(".popup_goalm_con_action_button").css("display", "none");
			if (selectedConnection.name.attr('text') !== 'isControlledBy' && 
				selectedConnection.name.attr('text') !== 'isPeer' && 
				selectedConnection.name.attr('text') !== 'isBenevolentTo' ) {

				$("#edit_element_button").css("display", "inline-block");
				$("#save_connection_button").css("display", "inline-block");
			}
		}
				
		if(selectedModel=="AcquaintanceModel"){
			$("#edit_element_button").css("display", "none");
			$(".popup_goalm_con_action_button").css("display", "none");
			$(".popup_name").css("display", "none");
			$("#save_connection_button").css("display", "inline-block");
			if(selectedConnection.from.imagetype=="Agent" && selectedConnection.to.imagetype=="Agent"){
				$("#delete_connection_button").css("display", "inline-block");
			}
			$("#cancel_button").css("display", "inline-block");
		}

		checkLockConnection();
	}

	function deleteElement(){
		closeResizer();
		deleteConnections(selectedShape);
		deleteLabel(selectedShape);
		deleteShape(selectedShape);
		$("#popup_window").css("display", "none");
	}
	function closePopUpWindow(){
		$(".popup_name").css("display", "inline-block");
		$("#popup_window").css("display", "none");
		$("#popup_display_content").css("display", "none");
		$("#popup_display_content_goalmodel_role").css("display", "none");
		$("#popup_display_content_goalmodel_fg").css("display", "none");
		$("#popup_display_content_goalmodel_qg").css("display", "none");
		$("#popup_display_content_goalmodel_eg").css("display", "none");
		$("#popup_display_content_goalmodel_neg").css("display", "none");
		$("#popup_display_content_domainmodel_role").css("display", "none");	
		$("#popup_display_content_domainmodel_resource").css("display", "none");
		$(".connection_content").css("display", "none");
		$(".shape_content").css("display", "none");
		$("#responsibilities_and_constraints_contents").css("display", "none");
		$("#responsibilities_and_constraints_fields").css("display", "none");
		$("#edit_responsibilities_and_constraints_button").val("Show responsibilities and constraints");
		$("#edit_element_button").css("display", "none");
		$(".popup_goalm_action_button").css("display", "none");
		$(".popup_orgm_action_button").css("display", "none");
		$(".popup_orgm_con_action_button").css("display", "none");
		$(".popup_goalm_con_action_button").css("display", "none");
		$(".popup_acqm_action_button").css("display", "none");
		$("#attributes").css("display", "none");
		$("#roles").css("display", "none");
	}
	function checkLock(){
		if((selectedShape.simplename==undefined || selectedShape.simplename==null || selectedShape.simplename=="") && 
		   (selectedShape.description==undefined || selectedShape.description==null || selectedShape.description=="") && 
 		   (selectedShape.constraints==undefined || selectedShape.constraints==null || selectedShape.constraints=="") && 
 		   (selectedShape.responsibilities==undefined || selectedShape.responsibilities==null || selectedShape.responsibilities=="")){
			unlock();
		}
		else{
			lock();
		}
	}

	function checkLockConnection(){
		var name = selectedConnection.name.attr("text");
		if(name==undefined || name==null || name==""){
			unlock();
		}
		else{
			lock();
		}
	}

	function toggleLock(){
		if($(".popup_textarea").attr("readonly")=="readonly"){
			unlock();
		}
		else{
			lock();
		}
	}
	function lock(){
		$(".popup_textarea").attr("readonly", "readonly");
		$(".popup_textarea").addClass("popup_textarea_locked");
		$("#edit_element_button").val("Edit");
	}
	function unlock(){
		$(".popup_textarea").removeAttr("readonly");
		$(".popup_textarea").removeClass("popup_textarea_locked");
		$("#edit_element_button").val("Lock");
	}
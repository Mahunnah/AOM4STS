//TOOLBAR

var selectedNewShape;		//"selectitud" uus tipp
var selectedNewConnection;	//"selectitud" uus seos
		
var createNewShape_clickMade=false;
var createNewShape_dblclickMade=false;
var createNewLine_clickMade=false;
var createNewLine_dblclickMade=false;

$( document ).ready(function() {
		
		//raphaeli paperid nuppudele
		var arrowPaper = Raphael("arrow");
		//var RolePaper = Raphael("Role");
		//var QGPaper = Raphael("QG");
		//var FGPaper = Raphael("FG");
		var linePaper = Raphael("line");
		var orgarrowPaper = Raphael("orgarrow");
		var orgModelLinePaper = Raphael("org_line");
		var orgModelLine_isBenevolentTo_Paper = Raphael("isBenevolentTo_line");
		var orgModelLine_isControlledBy_Paper = Raphael("isControlledBy_line");
		var orgModelLine_isPeer_Paper = Raphael("isPeer_line");
		//var environmentPaper = Raphael("Environment");
		//var resourcePaper = Raphael("Resource");
		var domainarrowPaper = Raphael("domainarrow");
		var domainModelLine_domain_line_Paper = Raphael("domain_line");
		var domainModelLine_inheritance_line_Paper = Raphael("domain_inheritance");
		var domainModelLine_aggregation_line_Paper = Raphael("domain_aggregation");
		var domainModelLine_composition_line_Paper = Raphael("domain_composition");
		var acquaintanceModel_line_Paper = Raphael("acquaintance_line");
		var acquaintancearrowPaper = Raphael("acquaintancearrow");
		var knowledgearrowPaper = Raphael("knowledgearrow");
		var knowledgeModelLine_domain_line_Paper = Raphael("knowledge_line");
		var knowledgeModelLine_inheritance_line_Paper = Raphael("knowledge_inheritance");
		var knowledgeModelLine_aggregation_line_Paper = Raphael("knowledge_aggregation");
		var knowledgeModelLine_composition_line_Paper = Raphael("knowledge_composition");
		var interactionarrowPaper = Raphael("interactionarrow");
		var interactionModelLine_physical_action_Paper = Raphael("interaction_physical_action");
		var interactionModelLine_agent_message_Paper = Raphael("interaction_agent_message");
		var interactionModelLine_connection_Paper = Raphael("interaction_connection");
		var interactionModelLine_actionEnvironment_Paper = Raphael("interaction_action_on_environment");
		var interactionModelLine_nonactionEvent_Paper = Raphael("interaction_nonaction_event");

		var behaviourarrowPaper = Raphael("behaviourarrow");
		var behaviourModelLine_physical_action_Paper = Raphael("behaviour_physical_action");
		var behaviourModelLine_agent_message_Paper = Raphael("behaviour_agent_message");
		var behaviourModelLine_connection_Paper = Raphael("behaviour_connection");
		var behaviour_rule_Paper = Raphael("behaviour_rule");
		var behaviour_activity_type_Paper = Raphael("behaviour_activity_type");
		var behaviour_start_event_Paper = Raphael("behaviour_start_event");
		var behaviour_control_flow_Paper = Raphael("behaviour_control_flow");
		var behaviour_alt_control_flow_Paper = Raphael("behaviour_alt_control_flow");
		var behaviour_condition_Paper = Raphael("behaviour_condition");
		var behaviour_join_Paper = Raphael("behaviour_join");
		var behaviour_episternic_action_Paper = Raphael("behaviour_episternic_action");

		//pildid nuppudele
		var arrow = arrowPaper.image("images/cursor.png", 23, 6, 24, 35);
		//var newRole = RolePaper.image("images/Role.png", 25, 3, 20, 39);
		//var newQG = QGPaper.image("images/QG.png", 7, 7, 60, 33);
		//var newFQ = FGPaper.image("images/FG.png", 7, 7, 60, 33);
		var newLine = linePaper.path("M15,10L60,35");
		var newOrgLine = orgarrowPaper.image("images/cursor.png", 30, 3, 15, 25);
		var newDomainLine = domainarrowPaper.image("images/cursor.png", 30, 3, 15, 25);
		var newInteractionLine = interactionarrowPaper.image("images/cursor.png", 30, 3, 15, 25);
		var newBehaviourLine = behaviourarrowPaper.image("images/cursor.png", 30, 3, 15, 25);

		var orgline = orgModelLinePaper.image("images/DomainLine.png", 0, 0, 140, 20)	
		var newIsBenevolentTo_line = orgModelLine_isBenevolentTo_Paper.image("images/isBenevolentTo.png", 0, 0, 140, 20);
		var newIsControlledBy_line = orgModelLine_isControlledBy_Paper.image("images/isControlledBy.png", 0, 0, 140, 20);
		var newIsPeer_line = orgModelLine_isPeer_Paper.image("images/isPeer.png", 0, 0, 140, 20);
		var domain_line = domainModelLine_domain_line_Paper.image("images/DomainLine.png", 0, 0, 140, 20);
		//var newEnvironment = environmentPaper.image("images/Environment.png", 3, 3, 67, 39);
		//var newResource = resourcePaper.image("images/Resource.png", 40, 3, 54, 26);
		var newInheritanceLine = domainModelLine_inheritance_line_Paper.image("images/DomainInheritance.png", 0, 0, 140, 20);
		var newAggregationLine = domainModelLine_aggregation_line_Paper.image("images/DomainAggregation.png", 0, 0, 140, 20);
		var newCompositionLine = domainModelLine_composition_line_Paper.image("images/DomainComposition.png", 0, 0, 140, 20);
		var newAcquaintanceLine = acquaintanceModel_line_Paper.image("images/arrows.png", 0, 0, 140, 20);
		var newAcquaintanceCursor = acquaintancearrowPaper.image("images/cursor.png", 30, 3, 15, 25);
		var newKnowledgeCursor = knowledgearrowPaper.image("images/cursor.png", 30, 3, 15, 25);
		var knowledge_line = knowledgeModelLine_domain_line_Paper.image("images/DomainLine.png", 0, 0, 140, 20);
		var newKnowledgeInheritanceLine = knowledgeModelLine_inheritance_line_Paper.image("images/DomainInheritance.png", 0, 0, 140, 20);
		var newKnowledgeAggregationLine = knowledgeModelLine_aggregation_line_Paper.image("images/DomainAggregation.png", 0, 0, 140, 20);
		var newKnowledgeCompositionLine = knowledgeModelLine_composition_line_Paper.image("images/DomainComposition.png", 0, 0, 140, 20);
		var newInteractionPhysicalAction = interactionModelLine_physical_action_Paper.image("images/physical_action.png", 0, 2, 140, 18);
		var newInteractionAgentMessage = interactionModelLine_agent_message_Paper.image("images/agent_message.png", 0, 2, 140, 18);
		var newInteractionConnection = interactionModelLine_connection_Paper.image("images/connection_right.png", 0, 0, 140, 22);
		var newInteractionAction = interactionModelLine_actionEnvironment_Paper.image("images/action_on_environment.png", 0, 2, 140, 18);
		var newInteractionNonaction = interactionModelLine_nonactionEvent_Paper.image("images/nonaction_event.png", 0, 2, 140, 18);
		var newBehaviourPhysicalAction = behaviourModelLine_physical_action_Paper.image("images/physical_action.png", 0, 2, 140, 18);
		var newBehaviourAgentMessage = behaviourModelLine_agent_message_Paper.image("images/agent_message.png", 0, 2, 140, 18);
		var newBehaviourConnection = behaviourModelLine_connection_Paper.image("images/connection_right.png", 0, 0, 140, 22);

		//var newBehaviourRule = behaviour_rule_Paper.image("images/rule.png", 7, 0, 32, 30);
		//var newBehaviourActivityType = behaviour_activity_type_Paper.image("images/activitytype.png", 3, 0, 41, 28);
		//var newBehaviourStartEvent = behaviour_start_event_Paper.image("images/startevent.png", 15, 7, 16, 15);
		var newBehaviourControlFlow = behaviour_control_flow_Paper.image("images/controlflow.png", 3, 0, 41, 28);
		var newBehaviourAltControlFlow = behaviour_alt_control_flow_Paper.image("images/altcontrolflow.png", 3, 0, 41, 28);
		var newBehaviourCondition = behaviour_condition_Paper.image("images/condition.png", 3, 0, 41, 28);
		//var newBehaviourJoin = behaviour_join_Paper.image("images/join.png", 7, 0, 32, 30);
		var newBehaviourEpisternic = behaviour_episternic_action_Paper.image("images/episternicaction.png", 3, 0, 41, 28);

		$('#arrow, #orgarrow, #domainarrow, #acquaintancearrow, #knowledgearrow, #interactionarrow, #behaviourarrow').click(function(){		//cursorinupu kuulaja
			selectedNewShape=this;
			selectedShape=undefined;
			resetClicksOnNewShape();
			resetShapesColor();
			
			closeResizer();   
			resetConnectionSelection();
			resetClicksOnNewShape();
		});

		$('#line').click(function(){		//uue seose nupu kliki kuulaja
			resetClicksOnNewShape();
			createNewLine_clickMade=true;
			selectedNewConnection=this;	
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
		});
		$('#org_line, #isBenevolentTo_line, #isControlledBy_line, #isPeer_line').click(function(){		//uue org model seose nupu kliki kuulaja
			resetClicksOnNewShape();
			createNewLine_clickMade=true;
			selectedNewConnection=this;
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
		});		
		$('#domain_line, #domain_inheritance, #domain_aggregation, #domain_composition').click(function(){		//uue domain model seose nupu kliki kuulaja
			resetClicksOnNewShape();
			createNewLine_clickMade=true;
			selectedNewConnection=this;
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
		});	
		$('#knowledge_line, #knowledge_inheritance, #knowledge_aggregation, #knowledge_composition').click(function(){		//uue domain model seose nupu kliki kuulaja
			resetClicksOnNewShape();
			createNewLine_clickMade=true;
			selectedNewConnection=this;
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
		});	
		$('#interaction_physical_action, #interaction_agent_message, #interaction_connection, #interaction_nonaction_event, #interaction_action_on_environment').click(function(){		//uue domain model seose nupu kliki kuulaja
			resetClicksOnNewShape();
			createNewLine_clickMade=true;
			selectedNewConnection=this;
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
		});
		$('#behaviour_physical_action, #behaviour_agent_message, #behaviour_connection').click(function(){		//uue domain model seose nupu kliki kuulaja
			resetClicksOnNewShape();
			createNewLine_clickMade=true;
			selectedNewConnection=this;
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
		});
		$('#acquaintance_line').click(function(){		//uue acquaintance model seose nupu kliki kuulaja
			resetClicksOnNewShape();
			createNewLine_clickMade=true;
			selectedNewConnection=this;
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
		});
		$('#behaviour_control_flow, #behaviour_alt_control_flow, #behaviour_condition, #behaviour_episternic_action').click(function(){		//uue domain model seose nupu kliki kuulaja
			resetClicksOnNewShape();
			createNewLine_clickMade=true;
			selectedNewConnection=this;
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
		});
		$('#line').dblclick(function(){		//uue seose nupu topeltkliki kuulaja
			createNewLine_dblclickMade=true;
			selectedNewConnection=this;
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
		});

		$(".shapebutton").bind('click mousedown', function(){	//tööriista nupu kliki kuulaja (v.a. kursor ja seos)
			clickOnNewShape(this);
			$("div").removeClass("toolbar_button_selected");
			$(this).addClass("toolbar_button_selected");
			//openNewShapePopup();		//to open popup after clicking on toolbar button		
		});
});

	function resetClicksOnNewShape(){		//nullib klikid uuel tipu nupul
		createNewShape_dblclickMade=false; 
		createNewShape_clickMade=false;
		createNewLine_clickMade=false;
		lineObj1id=null;
		lineObj2id=null;
		$('#holder').css("cursor","default");
		$("div").removeClass("toolbar_button_selected");
		$("#arrow").addClass("toolbar_button_selected");
		$("#orgarrow").addClass("toolbar_button_selected");
		$("#domainarrow").addClass("toolbar_button_selected");
		$("#acquaintancearrow").addClass("toolbar_button_selected");
		$("#knowledgearrow").addClass("toolbar_button_selected");
		$("#interactionarrow").addClass("toolbar_button_selected");
		$("#behaviourarrow").addClass("toolbar_button_selected");
	}

	function clickOnNewShape(shape){		//klikk uue tipu nupul
		resetClicksOnNewShape();
		selectedNewShape=shape;
		$('#holder').css("cursor","crosshair");
		createNewShape_clickMade=true; 
		if(createNewShape_dblclickMade==true){
			resetClicksOnNewShape();
		}
	}
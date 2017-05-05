//siltide positsiooni määramine, 	
	// "nupu id : asukoht"
	
	var labelPositions_GoalModel = [ "FG:middle",
					 "QG:middle",
					 "Role:bottom",
					 "EG:middle",
					 "NEG:middle" ];	
	var labelPositions_DomainModel = [ "Resource:middle",
					   "Role:bottom" ];
	var labelPositions_AcquaintanceModel = [ "Agent:middle",
						 "Role:middle" ];
	var labelPositions_KnowledgeModel = [ "Agent:middle",
					      "Resource:modified1" ];
	var labelPositions_InteractionModel = [ "Agent:top" ];
	var labelPositions_BehaviourModel = [ "Agent:abovetop",
					      "Rule:middle",
					      "ActivityType:middle",
					      "StartEvent:bottom",
					      "Join:middle" ];
	var labelPositions_CPNModel = [ "Activity:middle",
									"Condition:middle" ];

//võimalikud ühendused mudelite kohta
	//"seos": "seosetüüp" (default, dashed, shortdashed, dotted-dashed, dotted, arrow, arrows, inheritance, aggregation, composition)

	var connectionTypes_GoalModel = [ "FG-FG:default",		
				  	  "QG-FG:dashed",
				  	  "FG-Role:default", 
					  "EG-NEG:default", 
					  "EG-Role:default", 
					  "EG-FG:default",
					  "NEG-Role:default",
					  "NEG-FG:default" ];
		
	var connectionTypes_DomainModel_domain_line = [ "Role-Resource:arrow",
				    	    						"Resource-Resource:arrow",
				    	    						"Role-Role:arrow" ];
	var connectionTypes_DomainModel_domain_inheritance  = [	"Resource-Resource:inheritance", "Role-Role:inheritance" ];
	var connectionTypes_DomainModel_domain_aggregation  = [	"Resource-Resource:aggregation", "Role-Role:aggregation" ];
	var connectionTypes_DomainModel_domain_composition  = [	"Resource-Resource:composition", "Role-Role:composition" ];


	var connectionTypes_OrganizationModel_line = [ "Role-Role:arrow" ];
	var connectionTypes_OrganizationModel_isBenevolentTo_line = [ "Role-Role:arrow" ];
	var connectionTypes_OrganizationModel_isControlledBy_line = [ "Role-Role:arrow" ];
	var connectionTypes_OrganizationModel_isPeer_line = [ "Role-Role:arrows" ];

	var connectionTypes_AcquaintanceModel = [ "Agent-Agent:arrows",
						  "Role-Agent:block"];

	var connectionTypes_KnowledgeModel_line  = [ "Agent-Resource:arrow", 
												 "Resource-Agent:arrow" ];
	var connectionTypes_KnowledgeModel_inheritance  = [ "Resource-Resource:inheritance" ];
	var connectionTypes_KnowledgeModel_aggregation  = [ "Resource-Resource:aggregation" ];
	var connectionTypes_KnowledgeModel_composition  = [ "Resource-Resource:composition" ];

	var connectionTypes_InteractionModel_physical_action  = [ "Agent-Agent:physical_action" ];
	var connectionTypes_InteractionModel_agent_message  = [ "Agent-Agent:agent_message" ];
	var connectionTypes_InteractionModel_connection_right  = [ "Agent-Agent:connection_right" ];
	var connectionTypes_InteractionModel_action_on_environment  = [ "Agent-Agent:interaction_action_on_environment" ];
	var connectionTypes_InteractionModel_nonaction_event  = [ "Agent-Agent:interaction_nonaction_event" ];

	var connectionTypes_BehaviourModel_physical_action  = [ "Agent-Rule:physical_action",
								"Agent-ActivityType:physical_action" ];
	var connectionTypes_BehaviourModel_agent_message  = [ "Agent-Rule:agent_message",
							      "Agent-ActivityType:agent_message" ];
	var connectionTypes_BehaviourModel_connection_right  = [ "Agent-Rule:connection_right",
							      	 "Agent-ActivityType:connection_right" ];
	var connectionTypes_BehaviourModel_controlflow = [ "StartEvent-Rule:block",
							   "Rule-ActivityType:block" ];
	var connectionTypes_BehaviourModel_altcontrolflow = [ "Rule-ActivityType:crossedblock",
							      "Join-ActivityType:crossedblock" ];
	var connectionTypes_BehaviourModel_condition = [ "Rule-Rule:crossedblock" ];	//Rule-Rule
	var connectionTypes_BehaviourModel_episternic_action = [ "Rule-ActivityType:doubleopen" ];  //Rule-Rule

	var connectionTypes_BehaviourModel_action_on_environment  = [ "Agent-Agent:interaction_action_on_environment" ];
	var connectionTypes_BehaviourModel_nonaction_event  = [ "Agent-Agent:interaction_nonaction_event" ];
	var connectionTypes_CPNModel_line = [ "Condition-Activity:arrow" ];

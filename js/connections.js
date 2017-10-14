	var newConnectionLabelText="";
	var creatingNewConnection = false;
	function save_connection(){		//uue seose salvestamine
		if(creatingNewConnection == false){
			setConnectionLabel(selectedConnection, $("#name_input").val());
		}
		else if(creatingNewConnection == true){
			newConnectionLabelText = $("#name_input").val(); 
		}
		if(selectedConnection.imagetype=="message"){
			fixInteractionModelConnectionPositions();
		}
		closePopUpWindow();	
	}

	function selectConnection(connection){			//seose selectimine
		//resetConnectionSelection();
		for (var i=0;i<connections.length;i++){
			if(connections[i].line==connection || connections[i].bg==connection){
				selectedConnection = connections[i];
				break;
			}
		}
		openConnection(selectedConnection);
		modifyConnectionPopup();
	}

	var shapes_dblclickMade=false;				//boolean tipu topeltklõpsu tuvastamiseks
	var obj1Pos, obj2Pos;					//tippudele klikkides jäetakse nende massiivipositsioon meelde, topeltklõps kahel tipul "selectib" nende vahelise seose
	function selectConnectionByShapes(){			//kahe tipu tuvastamine, mille vahel seost luua
		obj2Pos = shapes.indexOf(selectedShape);
		if(shapes_dblclickMade==false){
			shapes_dblclickMade=true;
			obj1Pos = shapes.indexOf(selectedShape);
		}
		else if(shapes_dblclickMade==true && obj1Pos!=obj2Pos && connectionExists(shapes[obj1Pos], shapes[obj2Pos])){
			shapes_dblclickMade=false;
			selectConnectionByTwoShapePositions(obj1Pos, obj2Pos);
		}
		else{
			obj1Pos=-1;
			obj2Pos=-1;
			shapes_dblclickMade=false;
		}
	}

	function selectConnectionByTwoShapePositions(Obj1id, Obj2id){		//seose valimine kahe tipu abil
		resetConnectionSelection();
		for (var i=0; i<connections.length; i++) {
			if(connections[i].from.id==shapes[Obj1id].id && connections[i].to.id==shapes[Obj2id].id){
				selectedConnection = connections[i];
			}
			if(connections[i].to.id==shapes[Obj1id].id && connections[i].from.id==shapes[Obj2id].id){
				selectedConnection = connections[i];
			}
		}		
		openConnection(selectedConnection);
	}

	function resetConnectionSelection(){	//tühistab seose valiku
		for(i=0;i<connections.length;i++){
			if(connections[i].bg!=null){
				connections[i].bg.attr("stroke","white");
			}
			if(connections[i].line!=null){
				connections[i].line.attr("stroke", connections[i].initialColor || 'black');
			}
			if(connections[i].bg!=null && connections[i].bg.attr("stroke-width")!=null && connections[i].bg.attr("stroke-width")!=0){
				connections[i].bg.attr("stroke-width","16");
			}
			if(connections[i].line!=null && connections[i].line.attr("stroke-width")!=null && connections[i].line.attr("stroke-width")!=0){
				connections[i].line.attr("stroke-width","2");
			}
		}
	}

	function checkForConnection(shape){	//funktsioon, mis kahe tipu klikkimisel annab käsu luua seose- CREATING CONNECTION COMMAND
		if(createNewLine_clickMade==true){
			var shapePosition = shapes.indexOf(shape);

			if(lineObj1id==null){
				lineObj1id=shapePosition;
				if(selectedModel == "InteractionModel" && 
					(selectedNewConnection.id == "interaction_action_on_environment" || selectedNewConnection.id=="interaction_nonaction_event")){
					lineObj2id=shapePosition;
					if(connectionExists(shapes[lineObj1id], shapes[lineObj2id])==false){
						var conType = getCorrectConnectionType(shapes[lineObj1id], shapes[lineObj2id], selectedModel);
						var createdConnection = makeConnection(shapes[lineObj1id], shapes[lineObj2id], conType);
						preSetLabelsOrgModel(createdConnection);
					}

					lineObj1id=null;
					lineObj2id=null;
					if(createNewLine_dblclickMade==false){
						resetClicksOnNewShape();
					}
				}
			}
			else if(lineObj2id==null /*&& shapePosition!=lineObj1id*/){
				lineObj2id=shapePosition;
				if(connectionExists(shapes[lineObj1id], shapes[lineObj2id])==false){
					var conType = getCorrectConnectionType(shapes[lineObj1id], shapes[lineObj2id], selectedModel);
					var createdConnection = makeConnection(shapes[lineObj1id], shapes[lineObj2id], conType);
					preSetLabelsOrgModel(createdConnection);
				}
				lineObj1id=null;
				lineObj2id=null;
				if(createNewLine_dblclickMade==false){
					resetClicksOnNewShape();
				}
			}
		}
	}

	function preSetLabelsOrgModel(connection){		//sets labels for lines in organization model
		if(connection!=undefined && selectedModel=="OrganizationModel"){
			if(selectedNewConnection.id=="isBenevolentTo_line"){
				setConnectionLabel(connection, "isBenevolentTo");
			}
			else if(selectedNewConnection.id=="isControlledBy_line"){
				setConnectionLabel(connection, "isControlledBy");
			}
			else if(selectedNewConnection.id=="isPeer_line"){
				setConnectionLabel(connection, "isPeer");
			}
		}
	}

	//var selectedConnectionBgStroke;
	//var selectedConnectionLineStroke;
	//var selectedConnectionBgStrokeWidth;
	//var selectedConnectionLineStrokeWidth;
	function openConnection(connection){				//"selectib" seose
		resetShapesColor();
		if(connection!=null){
			if(connection.bg!=null){
				connection.bg.attr("stroke","white");
			}
			if(connection.line!=null){
				connection.line.attr("stroke","red");
			}
			if(connection.bg!=null && connection.bg.attr("stroke-width")!=null && connection.bg.attr("stroke-width")!=0){
				connection.bg.attr("stroke-width",16);
			}
			if(connection.line!=null && connection.line.attr("stroke-width")!=null && connection.line.attr("stroke-width")!=0){
				connection.line.attr("stroke-width",2);
				connection.line.toFront();
			}
		}
	}

	function connectionExists(shape1, shape2){		//kontrollib, kas antud seos on olemas
		if(selectedModel == "InteractionModel"){
			return false;
		}
		for (var i=0; i<connections.length; i++) {
			if(connections[i].from.id==shape1.id && connections[i].to.id==shape2.id){
				return true;
			}
			if(connections[i].to.id==shape1.id && connections[i].from.id==shape2.id){
				return true;
			}
		}
		return false;
	}

	function deleteConnection(connection){		//seose kustutamine
		if(connection.line!=null){
			connection.line.remove();
		}
		if(connection.bg!=null){
			connection.bg.remove();
		}
		for(var i=0;i<connections.length;i++){
			if(connections[i]==connection){
				connections.splice(i,1);
				break;
			}
		}
		if(connection.name!==undefined){
			connection.name.remove();
		}
		if(selectedModel=="InteractionModel" && connection!=undefined && connection!=null){
			connection.remove();
			fixConnectionAndLabelPositions();
		}
		if(selectedModel=="BehaviourModel" && connection!=undefined && connection!=null){
			if(connection.line){
				connection.line.remove();
			}
			else{
				connection.remove();
			}
		}
		cloneArray();
	}

	function deleteConnections(selectedShape){		//antud tipu kõigi seoste kustutamine
		for (var i = connections.length-1; i >= 0; i--) {
			if (connections[i].from.id == selectedShape.id || connections[i].to.id == selectedShape.id) {
				if(connections[i].name!==undefined){
					connections[i].name.remove();
				}
				if(connections[i].bg!==undefined){
					connections[i].bg.remove();
				}
				if(connections[i].line!==undefined){
					connections[i].line.remove();
				}
				if(selectedModel=="InteractionModel" && connections[i]!=undefined && connections[i]!=null){
					connections[i].remove();
				}
				if(selectedModel=="BehaviourModel" && connections[i]!=undefined && connections[i]!=null){
					if(connections[i].line){
						connections[i].line.remove();
					}
					else{
						connections[i].remove();
					}
				}
				connections.splice(i,1);
			}
		}
		fixConnectionAndLabelPositions();
		cloneArray();
	}

	function fixConnectionAndLabelPositions(){		//seoste ja siltide positsiooni korrigeerimine (kaasaliikumine)
		//connection positions
		for(var i = connections.length; i--;) {
			if(selectedModel=="InteractionModel"){
				fixInteractionModelConnectionPosition(connections[i]);
			}
			else if(selectedModel=="BehaviourModel"){
				if(connections[i].imagetype && connections[i].imagetype.indexOf("message")!=-1){
					fixInteractionModelConnectionPosition(connections[i]);
				}
				else{
					r.connection(connections[i]);
				}
				fixAgentY_BehaviourModel(connections[i]);
			}
			else{
				r.connection(connections[i]);
			}
        	}	
		//shape label positions
		fixShapeLabelPositions();
		
		//connection label positions
		fixConnectionLabelPositions();
	}

	function fixShapeLabelPositions(){		//shape label positions
		for(var i=0;i<shapes.length;i++){
			var bbox = shapes[i].getBBox();
			if(shapes[i].name!=null){
				if(getCorrectLabelPosByShapeImagetype(shapes[i].imagetype, selectedModel)=="bottom"){
					shapes[i].name.attr({x:bbox.x+bbox.width/2,y:bbox.y+bbox.height+5});	//*1.2 to place under
					alignTop(shapes[i].name,shapes[i]);	
				}
				else if(getCorrectLabelPosByShapeImagetype(shapes[i].imagetype, selectedModel)=="middle"){
					shapes[i].name.attr({x:bbox.x+bbox.width/2,y:bbox.y+bbox.height/2});
				}
				else if(getCorrectLabelPosByShapeImagetype(shapes[i].imagetype, selectedModel)=="modified1"){
					shapes[i].name.attr({x:bbox.x+bbox.width/2,y:bbox.y+((bbox.height/100)*16.5)});
					alignTop(shapes[i].name,shapes[i],"modified1");
				}
				else if(getCorrectLabelPosByShapeImagetype(shapes[i].imagetype, selectedModel)=="top"){
					shapes[i].name.attr({x:bbox.x+bbox.width/2,y:bbox.y+9});
					alignTop(shapes[i].name,shapes[i],"top");
				}
				else if(getCorrectLabelPosByShapeImagetype(shapes[i].imagetype, selectedModel)=="abovetop"){
					shapes[i].name.attr({
						x: bbox.x + shapes[i].name.getBBox().width/2,
						y: bbox.y - shapes[i].name.getBBox().height/2
					});
					if(shapes[i].header){
						if(shapes[i].name.getBBox().width > shapes[i].getBBox().width * 7/10){
							 shapes[i].attr("width",  shapes[i].name.getBBox().width + shapes[i].name.getBBox().width*4/10)
						}
						shapes[i].header.attr({
							x: shapes[i].name.getBBox().x + 1,
						        y: shapes[i].name.getBBox().y,
						        width: shapes[i].getBBox().width * 7/10,
						        height: shapes[i].name.getBBox().height
						});
					}
				}
				else{
					shapes[i].name.attr({x:bbox.x+bbox.width/2,y:bbox.y+bbox.height/2});
				}
			}
			if(shapes[i].border!=undefined && shapes[i].border!=null){
				underlineBorder(shapes[i]);
			}
		}
	}

	function fixConnectionLabelPositions(){		//connection label positions
		for(var i=0; i<connections.length;i++){
			if(connections[i].line!=undefined){
				var bbox = connections[i].line.getBBox();
			}
			else{
				var bbox = connections[i].getBBox();
			}
			var newX = Math.floor(bbox.x + bbox.width/2.0); 
			var newY = Math.floor(bbox.y + bbox.height/2.0);
				if(connections[i].from==connections[i].to){
					newY=connections[i].from.getBBox().y-connections[i].from.getBBox().height;
				}
			if(connections[i].name!==undefined){
				connections[i].name.attr({x:newX,y:newY-8});
			}
			if(connections[i].imagetype == "message"){
				connections[i].name.attr({x:bbox.x+bbox.width/2,y:bbox.y+bbox.height/2});
			}
		}
	}

	//meetod õige seosetüübi saamiseks
	function getCorrectConnectionType(shape1, shape2, model, oneWayOnly){	//(tipp1, tipp2, mudelitüüp, kas seost saab luua mõlemast tipust alates: true/false)
		var cons;

		if(shape1==shape2){
			if(model!="AcquaintanceModel" && selectedNewConnection.id!="isPeer_line" && model!="InteractionModel"){
				return "none";
			}
		}
		if(model=="GoalModel"){						//uute mudelite seosed lisada else if abil
			cons = connectionTypes_GoalModel;
		}
		else if(model=="DomainModel"){
			if(selectedNewConnection.id=="domain_line"){
				cons = connectionTypes_DomainModel_domain_line;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="domain_inheritance"){
				cons = connectionTypes_DomainModel_domain_inheritance;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="domain_aggregation"){
				cons = connectionTypes_DomainModel_domain_aggregation;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="domain_composition"){
				cons = connectionTypes_DomainModel_domain_composition;
				oneWayOnly = false;
			}
		}
		else if(model=="OrganizationModel"){
			if (selectedNewConnection.id=="org_line"){
				cons = connectionTypes_DomainModel_domain_line;
				oneWayOnly = true;
			}
			else if(selectedNewConnection.id=="isBenevolentTo_line"){
				cons = connectionTypes_OrganizationModel_isBenevolentTo_line;
				oneWayOnly = true;
			}
			else if(selectedNewConnection.id=="isControlledBy_line"){
				cons = connectionTypes_OrganizationModel_isControlledBy_line;
				oneWayOnly = true;
			}
			else if(selectedNewConnection.id=="isPeer_line"){
				cons = connectionTypes_OrganizationModel_isPeer_line;
				oneWayOnly = true;
			}
			//alert(selectedNewConnection.id);
		}
		else if(model=="AcquaintanceModel"){
			cons = connectionTypes_AcquaintanceModel;
			oneWayOnly = true;
		}
		else if(model=="KnowledgeModel"){
			if(selectedNewConnection.id=="knowledge_line"){
				cons = connectionTypes_KnowledgeModel_line;
				oneWayOnly = true;
			}
			else if(selectedNewConnection.id=="knowledge_inheritance"){
				cons = connectionTypes_KnowledgeModel_inheritance;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="knowledge_aggregation"){
				cons = connectionTypes_KnowledgeModel_aggregation;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="knowledge_composition"){
				cons = connectionTypes_KnowledgeModel_composition;
				oneWayOnly = false;
			}
		}	
		else if(model=="InteractionModel"){
			if(selectedNewConnection.id=="interaction_agent_message" && shape1!=shape2){
				cons = connectionTypes_InteractionModel_agent_message;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="interaction_physical_action" && shape1!=shape2){
				cons = connectionTypes_InteractionModel_physical_action;
				oneWayOnly = false;
			}			
			else if(selectedNewConnection.id=="interaction_connection" && shape1!=shape2){
				cons = connectionTypes_InteractionModel_connection_right;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="interaction_action_on_environment" && shape1==shape2){
				cons = connectionTypes_InteractionModel_action_on_environment;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="interaction_nonaction_event" && shape1==shape2){
				cons = connectionTypes_InteractionModel_nonaction_event;
				oneWayOnly = false;
			}
			else{
				return "none";
			}
		}
		else if(model=="BehaviourModel"){
			if(selectedNewConnection.id=="behaviour_agent_message"){
				cons = connectionTypes_BehaviourModel_agent_message;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="behaviour_physical_action"){
				cons = connectionTypes_BehaviourModel_physical_action;
				oneWayOnly = false;
			}			
			else if(selectedNewConnection.id=="behaviour_connection"){
				cons = connectionTypes_BehaviourModel_connection_right;
				oneWayOnly = false;
			}
			else if(selectedNewConnection.id=="behaviour_control_flow"){
				cons = connectionTypes_BehaviourModel_controlflow;
				oneWayOnly = true;
			}
			else if(selectedNewConnection.id=="behaviour_alt_control_flow"){
				cons = connectionTypes_BehaviourModel_altcontrolflow;
				oneWayOnly = true;
				if((shape1.imagetype == "Join" && shape2.imagetype == "ActivityType") || 
					(shape1.imagetype == "ActivityType" && shape2.imagetype == "Join")){
					oneWayOnly = false;
				}
			}
			else if(selectedNewConnection.id=="behaviour_condition"){
				cons = connectionTypes_BehaviourModel_condition;
				oneWayOnly = true;
			}
			else if(selectedNewConnection.id=="behaviour_episternic_action"){
				cons = connectionTypes_BehaviourModel_episternic_action;
				oneWayOnly = true;
			}
			else{
				return "none";
			}
		}
		else if(model=="CPNModel"){
			cons = connectionTypes_CPNModel_line;
			oneWayOnly = false;
		}

		if(shape1.imagetype!==undefined || shape2.imagetype!==undefined){
			for(var i=0;i<cons.length;i++){
				var conType = cons[i].split(":")[1];				//conType
				var shapeTypes = cons[i].split(":")[0].split("-");	//shapeTypes[0] and shapeTypes[1]
				
				if(shape1.imagetype==shapeTypes[0] && shape2.imagetype==shapeTypes[1]){
					return conType;
				}
				if((oneWayOnly==false || oneWayOnly==null || oneWayOnly===undefined) && shape1.imagetype==shapeTypes[1] && shape2.imagetype==shapeTypes[0]){
					return conType;
				}
			}
		}
		return "none";
	}

	function makeConnection(shape1, shape2, type){		//seose loomine
		if(type!="none"){
	
			if(type=="arrow"){
				var connection = r.connection(shape1, shape2, "black", "black", "arrow");
			}
			else if(type=="arrows"){
				var connection = r.connection(shape1, shape2, "black", "black", "arrows");
			}
			else if(type=="block"){
				var connection = r.connection(shape1, shape2, "black", "black", "block");
			}
			else if(type=="crossedblock"){
				var connection = r.connection(shape1, shape2, "black", "black", "block", "crossed");
			}
			else if(type=="doubleopen"){
				var connection = r.connection(shape1, shape2, "black", "black", "doubleopen");
			}
			else if(type=="inheritance"){
				var connection = r.connection(shape1, shape2, "black", "black", "inheritance");
			}
			else if(type=="aggregation"){
				var connection = r.connection(shape1, shape2, "black", "black", "aggregation");
			}
			else if(type=="composition"){
				var connection = r.connection(shape1, shape2, "black", "black", "composition");
			}
			else if(type=="physical_action"){
				var connection = r.interactionmodel_connection(shape1, shape2, type);
			}
			else if(type=="agent_message"){
				var connection = r.interactionmodel_connection(shape1, shape2, type);
			}
			else if(type=="connection_right"){
				var connection = r.interactionmodel_connection(shape1, shape2, type);
			}
			else if(type=="interaction_action_on_environment"){
				var connection = r.interactionmodel_connection(shape1, shape2, type);
			}
			else if(type=="interaction_nonaction_event"){
				var connection = r.interactionmodel_connection(shape1, shape2, type);
			}
      else if(type=="default"){
        var connection = r.connection(shape1, shape2, "#7A09FF", "#7A09FF");
      }
      else if(type=="dashed"){
        var connection = r.connection(shape1, shape2, "#FF9909", "#FF9909");
      }
			else{
				var connection = r.connection(shape1, shape2, "black");
			}

      if (selectedNewConnection.id === 'isBenevolentTo_line') {
				connection.line.attr('stroke', '#FFD635');
			}
      if (selectedNewConnection.id === 'isControlledBy_line') {
        connection.line.attr('stroke', '#34B2E8');
			}
      if (selectedNewConnection.id === 'isPeer_line') {
        connection.line.attr('stroke', '#AE39FF');
			}
      if (selectedNewConnection.id === 'org_line') {
        connection.line.attr('stroke', '#34FF2B');
			}

      if (selectedNewConnection.id === 'domain_line') {
        connection.line.attr('stroke', '#FFD635');
			}
      if (selectedNewConnection.id === 'domain_inheritance') {
        connection.line.attr('stroke', '#34B2E8');
			}
      if (selectedNewConnection.id === 'domain_aggregation') {
        connection.line.attr('stroke', '#AE39FF');
			}
      if (selectedNewConnection.id === 'domain_composition') {
        connection.line.attr('stroke', '#34FF2B');
			}

			if(type=="dashed"){
				connection.line.attr("stroke-dasharray","--");
			}
			if(type=="shortdashed"){
				connection.line.attr("stroke-dasharray","-");
			}
			if(type=="dotted-dashed"){
				connection.line.attr("stroke-dasharray","-.");
			}
			if(type=="dotted"){
				connection.line.attr("stroke-dasharray",".");
			}

			connection.initialColor = connection.line.attr('stroke');
			setConnectionLabel(connection, newConnectionLabelText);

			connection.contype = type;
			newConnectionLabelText="";
			connections.push(connection);

			if(selectedModel=="InteractionModel"){
				reLocateConnection(connection);
			}

			if(connection.bg!=null){
				connection.bg.attr("cursor","pointer");
				connection.bg.click(function(){
					resetConnectionSelection();
					openConnection(connection);
				});
				connection.bg.mousedown(function(e){
					if (e.which == 3) {
						resetConnectionSelection();
						selectConnection(this);
					}
				});
			}
			if(connection.line!=null){
				connection.line.attr("stroke-width",2);
				connection.line.attr("cursor","pointer");
				connection.line.click(function(){
					resetConnectionSelection();
					openConnection(connection);
				});
				connection.line.mousedown(function(e){
					if (e.which == 3) {
						resetConnectionSelection();
						selectConnection(this);
					}
				});
			}
		}
		else{
			say('Connection impossible');	//kasutajale info edastamine
		}
		cloneArray();
		return connection;
	}

function cloneArray(){
		//cloning arrays, because different papers have different connections
		if(selectedModel=="GoalModel" || selectedModel=="RoleModel" || selectedModel=="MotivationalScenario"){
			goalm_connections = connections.slice();
		}		
		else if(selectedModel == "OrganizationModel"){
			orgm_connections = connections.slice();
		}
		else if(selectedModel == "DomainModel"){
			domainm_connections = connections.slice();
		}
		else if(selectedModel == "DomainModel"){
			agentm_connections = connections.slice();
		}		
		else if(selectedModel == "AcquaintanceModel"){
			acquaintancem_connections = connections.slice();
		}
		else if(selectedModel == "KnowledgeModel"){
			knowledgem_connections = connections.slice();
		}
		else if(selectedModel == "InteractionModel"){
			interactionm_connections = connections.slice();
		}
		else if(selectedModel == "BehaviourModel"){
			behaviourm_connections = connections.slice();
		}
		else if(selectedModel == "CPNModel"){
			cpnm_connections = connections.slice();
		}
}


var selectedShape;	//valitud tipp
var lineObj1id; 	//esimese tipu positsioon seose loomiseks
var lineObj2id; 	//teise tipu positsioon seose loomiseks

shapes = [];			//tippude massiiv
goalm_shapes = [];
orgm_shapes = [];
domainm_shapes = [];
agentm_shapes = [];
acquaintancem_shapes = [];
knowledgem_shapes = [];
interactionm_shapes = [];
behaviourm_shapes = [];
behaviourim_shapes = [];
cpnm_shapes = [];

connections = [];		//seoste massiiv
goalm_connections = [];
orgm_connections = [];
domainm_connections = [];
agentm_connections = [];
acquaintancem_connections = [];
knowledgem_connections = [];
interactionm_connections = [];
behaviourm_connections = [];
cpnm_connections = [];

holders = [];

resizerOpened=false;		//resizer on nähtav = true

var selectedConnection;		//valitud seos
selectedModel = "GoalModel";		//valitud mudel

$( document ).ready(function() {	//window.onload = function ()
		
	goalm_paper = Raphael("holder", $('#holder').width(), $('#holder').height());	//joonistuspind	
	goalm_paper.name = "holder";		
	orgm_paper = Raphael("holder4", $('#holder4').width(), $('#holder4').height());	//joonistuspind		
	orgm_paper.name = "holder4";
	domainm_paper = Raphael("holder5", $('#holder5').width(), $('#holder5').height());	//joonistuspind		
	domainm_paper.name = "holder5";
	acquaintancem_paper = Raphael("holder7", $('#holder7').width(), $('#holder7').height());	//joonistuspind		
	acquaintancem_paper.name = "holder7";
	knowledgem_paper = Raphael("holder8", $('#holder8').width(), $('#holder8').height());	//joonistuspind		
	knowledgem_paper.name = "holder8";
	interactionm_paper = Raphael("holder9", $('#holder9').width(), $('#holder9').height());	//joonistuspind		
	interactionm_paper.name = "holder9";
	behaviourm_paper = Raphael("holder10", $('#holder10').width(), $('#holder10').height());	//joonistuspind		
	behaviourm_paper.name = "holder10";
	cpnm_paper = Raphael("holder12", $('#holder12').width(), $('#holder12').height());	//joonistuspind		
	cpnm_paper.name = "holder12";

	holders.push(goalm_paper);
	holders.push(orgm_paper);
	holders.push(domainm_paper);
	holders.push(acquaintancem_paper);
	holders.push(knowledgem_paper);
	holders.push(interactionm_paper);
	holders.push(behaviourm_paper);
	holders.push(cpnm_paper);
	r = getHolderByName("holder");

	$( window ).resize(resizeRahpael);	//on resize window

	function resizeRahpael(){
		var width = $('#'+r.name).width();
		var height = $('#'+r.name).height();
		r.setSize(width,height);
	}

	for (var i = 0; i < shapes.length; i++) {
		setShapeControls(shapes[i]);
		shapes[i].imagetype=shapes[i].attr('src').split("/")[1].split(".")[0];
	}

	$('#holder').bind('click mousedown mouseup', function(e){					//klikk joonistuspinnal - tipu lisamine
		if(createNewShape_clickMade==true || createNewShape_dblclickMade==true){
			var holderPositionX = $("#holder").offset().left;
			var holderPositionY = $("#holder").offset().top;
			var mouseCoordinateX = e.pageX - holderPositionX;	
			var mouseCoordinateY = e.pageY - holderPositionY;
				
			selectShape(addNewShape(selectedNewShape.id,mouseCoordinateX, mouseCoordinateY,selectedModel));

			if(autoConnection==true){
				autoConnectObj2=selectedShape;
				//make auto connection
				var conType = getCorrectConnectionType(autoConnectObj1, autoConnectObj2, selectedModel);
				makeConnection(autoConnectObj1, autoConnectObj2, conType);
				//close autoconnection
				autoConnectObj1=undefined;
				autoConnectObj2=undefined;
				autoConnection=false;
			}

			//modifyShapePopup();	//opens popup after adding
		}	
	});
	

	//automaatse ühendamise jaoks vajaminevate tippude ID-d ja boolean tuvastamaks kas alamtipu loomine on valitud
	var autoConnectObj1; var autoConnectObj2; var autoConnection = false;
	$('.subbutton').click(function(){  //alamtipu nupu kuulamine
		saveElement();

		autoConnectObj1 = selectedShape;
		autoConnection = true;

		$("#popup_window").css("display", "none");

		var e = new jQuery.Event("click");
		e.pageX = $("#holder").offset().left + randomNumber(30,$("#holder").width());
		e.pageY = $("#holder").offset().top + randomNumber(30,$("#holder").height());
		$("#holder").trigger(e);
			
		if($(this).hasClass("add_subrole_button")){
			$('#Role').click();
		}
		else if($(this).hasClass("add_subquality_button")){
			$('#QG').click();
		}
		else if($(this).hasClass("add_subfunctional_button")){
			$('#FG').click();
		}
		else if($(this).hasClass("add_emotion_button")){
			$('#EG').click();
		}
		else if($(this).hasClass("add_negative_emotion_button")){
			$('#NEG').click();
		}
	});
	
});


//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

	function checkForResizeRaphaelByShapeMovement() {
		if (selectedShape) {
			var difX = (selectedShape.attr('x') + selectedShape.getBBox().width);
			var difY = (selectedShape.attr('y') + selectedShape.getBBox().height);
			var plus = 800;
			var width = $('#'+r.name).width();
			var height = $('#'+r.name).height();

			if (difX > r.width) {
				r.setSize((difX - r.width + plus) + r.width, height);
				/*
				$('.holders').animate({
				   scrollLeft: (difX - r.width + plus) + r.width
				});
				*/
			} 

			if (difY > r.height) {
				r.setSize(width, (difY - r.height + plus) + r.height);
				/*
				$('.holders').animate({
				   scrollTop: (difY - r.height + plus) + r.height
				});
				*/
			} 
		}
	}

	function showGoalModelNames(){
		if(selectedModel=="GoalModel"){
			var all = "";
			for(var i=0; i < shapes.length; i++){
				var classname = "";
				if(shapes[i].imagetype == "Role"){
					classname = "gm_role_icon";
				}
				else if(shapes[i].imagetype == "FG"){
					classname = "gm_fg_icon";
				}
				else if(shapes[i].imagetype == "QG"){
					classname = "gm_qg_icon";
				}
				else if(shapes[i].imagetype == "EG"){
					classname = "gm_eg_icon";
				}
				else if(shapes[i].imagetype == "NEG"){
					classname = "gm_neg_icon";
				}

				if(shapes[i].simplename!="" && shapes[i].simplename!=undefined){
					all+="<div id='goalmodelelement_"+shapes[i].id+"' class='goalmodel_toolbar_button'><div class='"+classname+"'></div> "+shortenName(shapes[i].simplename,10)+"</div>";
				}
				else{
					all+="<div id='goalmodelelement_"+shapes[i].id+"' class='goalmodel_toolbar_button'><div class='"+classname+"'></div> <i>~nameless</i></div>";
				}
			}
			$("#goal_model_toolbar").html(all);
		}
	}

	function addNewShape(selectedNewShapeID,x,y,model){
		var newShapePosition = shapes.length;
		
		if(selectedNewShapeID=="Role"){		//selectedNewShape.id on nupu ID
			shapes[newShapePosition]=r.image("images/Role.png", x-20, y-26, 40, 55);
		}
		else if(selectedNewShapeID=="QG"){
			shapes[newShapePosition]=r.image("images/QG.png", x-40, y-25, 80, 50);
		}
		else if(selectedNewShapeID=="FG"){
			shapes[newShapePosition]=r.image("images/FG.png", x-45, y-20, 90, 40);
		}
		else if(selectedNewShapeID=="EG"){
			shapes[newShapePosition]=r.image("images/EG.png", x-45, y-20, 90, 60);
		}
		else if(selectedNewShapeID=="NEG"){
			shapes[newShapePosition]=r.image("images/NEG.png", x-45, y-20, 90, 60);
		}
		else if(selectedNewShapeID=="Agent"){
			shapes[newShapePosition]=r.image("images/Agent.png", x-45, y-20, 90, 40);
		}
		else{	//peab olema: nupu id == pildi nimi
			shapes[newShapePosition]=r.image("images/"+selectedNewShape.id+".png", x-22, y-22, 50, 40);
		}

		setShapeControls(shapes[newShapePosition]);
		
		//set name
		setShapeLabel(shapes[newShapePosition], "", getCorrectLabelPosByShapeImagetype(selectedNewShapeID, model));	
			
		//set description
		shapes[newShapePosition].description = "";

		//set simplename
		shapes[newShapePosition].simplename = "";

		//set constraints
		shapes[newShapePosition].constraints = "";

		//set responsibilities
		shapes[newShapePosition].responsibilities = "";

		//set imagetype
		shapes[newShapePosition].imagetype = selectedNewShapeID;

		//tipu klikkimiste nullimine
		if(createNewShape_clickMade==true){		//kui 1 klikk tehtud
			createNewShape_clickMade=false;     //nullida 1 klikk
			if(createNewShape_dblclickMade==false){    	//kui 2 klikki tehtud
				resetClicksOnNewShape();                //nullida kõik klikid
			}
		}

		showGoalModelNames();
		cloneShapes();
		return shapes[newShapePosition];
	}

	var dragger = function () {		//aktiveerub tipu liigutamisel
        	this.ox = this.type == "rect" || this.type == "image" ? this.attr("x") : this.attr("cx");
        	this.oy = this.type == "rect" || this.type == "image" ? this.attr("y") : this.attr("cy");
		selectShape(this);
		this.animate({"fill-opacity": .2}, 200);
    	};
    
	var move = function (dx, dy) {		//tipu liigutamine
		var att = this.type == "rect" || this.type == "image" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
        	this.attr(att);
       		fixConnectionAndLabelPositions();
		r.safari();
		if(Math.abs(dx)>50 || Math.abs(dy)>50){
			resetClicksOnNewShape();
		}
		fixAgentChildrenPosition(this);
		selectShape(this);
		fixResizerPosition();

		if(this.variable){
			var tbbox = this.getBBox();
			this.variable.attr({x: tbbox.x+tbbox.width, y: tbbox.y+tbbox.height + 8});
		}

		checkForResizeRaphaelByShapeMovement();
	},
	up = function () {			//tipust kinni võtmine
		this.animate({"fill-opacity": 0}, 500);
		fixAgentChildrenPosition(this);
	};

	function fixAgentChildrenPosition(shape){
		if(shape.generalImagetype = "BehaviourAgentChild"){
			if(shape.parentAgent){
				if(shape.getBBox().x > shape.parentAgent.getBBox().x + shape.parentAgent.getBBox().width - shape.getBBox().width){
					shape.attr("x", shape.parentAgent.getBBox().x + shape.parentAgent.getBBox().width - shape.getBBox().width);
				}
				if(shape.getBBox().x < shape.parentAgent.getBBox().x){
					shape.attr("x", shape.parentAgent.getBBox().x);
				}
				if(shape.getBBox().y > shape.parentAgent.getBBox().y + shape.parentAgent.getBBox().height - shape.getBBox().height){
					shape.attr("y", shape.parentAgent.getBBox().y + shape.parentAgent.getBBox().height - shape.getBBox().height);
				}
				if(shape.getBBox().y < shape.parentAgent.getBBox().y){
					shape.attr("y", shape.parentAgent.getBBox().y);
				}
				shape.relatedCoordinates = {
					x: shape.getBBox().x - shape.parentAgent.getBBox().x,
					y: shape.getBBox().y - shape.parentAgent.getBBox().y					
				};
			}
			else if(shape.childElements){	
				for(var i=0; i<shape.childElements.length; i++){
					if(shape && shape.childElements && shape.childElements[i] && 
						shape.childElements[i].relatedCoordinates && 
							shape.childElements[i].relatedCoordinates.x && 
								shape.childElements[i].relatedCoordinates.y){
						shape.childElements[i].attr({
							x: shape.getBBox().x + shape.childElements[i].relatedCoordinates.x,
							y: shape.getBBox().y + shape.childElements[i].relatedCoordinates.y
						});
					}
				}
				//console.log("this is parent", shape.childElements);
			}
		}
	}

	function clickShape(){		//tipule klikkimine
		selectShape(this);	
		checkForConnection(this);		
	}

	var color = "#3EAF3E";
	function setShapeControls(shape){		//Tipule kuulajate külgepanemine
		shape.drag(move, dragger, up);
		shape.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
		shape.click(clickShape);
		shape.dblclick(selectConnectionByShapes);
		shape.mousedown(function(e) {
			if (e.which === 3) {
				modifyShapePopup();
			}
		});
	}

	var selectedShapeStroke;		//valitud tipu joone värvi meelde jätmine, et saaks peale "selectimist" taastada
	var selectedShapeStrokeWidth;		//valitud tipu joone laiuse meelde jätmine, et saaks peale "selectimist" taastada
	function selectShape(shape){	//tipu "selectimine"
		selectedShape=shape;
		closeResizer();
		openResizer(shape);
		resetShapesColor();
		resetConnectionSelection();
		selectedShapeStroke=shape.attr("stroke");
		selectedShapeStrokeWidth=shape.attr("stroke-width");
		shape.attr({stroke: "#8F8F8F", "stroke-width": 8});

		//coloring all related selections
		for(i=0;i<connections.length;i++){
			if(connections[i].from.id==shape.id || connections[i].to.id==shape.id){
				openConnection(connections[i]);
			}
		}
	}
	function resetShapesColor(){		//tipu värvi taastamine, unselect
		if(selectedShape!=null){
			selectedShape.attr({stroke: selectedShapeStroke, "stroke-width": selectedShapeStrokeWidth});
		}
	}

	function saveElement(){					//tipu salvestamine, nt peale muutmist
		setShapeLabel(selectedShape, $("#name_input").val());
		selectedShape.description = $('#description_input').val();
		selectedShape.simplename = $("#name_input").val();
		selectedShape.responsibilities = $('#responsibilities_input').val();
		selectedShape.constraints = $('#constraints_input').val();
		say(selectedShape.imagetype+" \" "+selectedShape.simplename+"\" created in "+selectedModel);
		showGoalModelNames();
	}

	function deleteShape(selectedShape){		//tipu kustutamine
		say(selectedShape.imagetype+" \""+selectedShape.simplename+"\" deleted from "+selectedModel);
		var shapePosition = shapes.indexOf(selectedShape);
		if(selectedShape.header){
			selectedShape.header.remove();
		}
		selectedShape.remove();
		shapes.splice(shapePosition,1);
		cloneShapes();
		showGoalModelNames();
	}

	function randomNumber(from, to){
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

	function getShapeByID(ID){
		for(i=0;i<shapes.length;i++){
			if(shapes[i].id==ID){
				return shapes[i];
			}
		}
	}
	function deleteElementByShape(shape){
		closeResizer();
		deleteConnections(shape);
		deleteLabel(shape);
		deleteShape(shape);
		$("#popup_window").css("display", "none");
	}

	function getHolderByName(name){
		var holder;
		for(i=0;i<holders.length;i++){
			if(holders[i].name==name){
				holder = holders[i];	
			}
		}
		return holder;
	}

	function cloneShapes(){
		//cloning arrays, because different papers have different connections
		if(selectedModel=="GoalModel" || selectedModel=="RoleModel" || selectedModel=="MotivationalScenario"){
			goalm_shapes = shapes.slice();
		}		
		else if(selectedModel == "OrganizationModel"){
			orgm_shapes = shapes.slice();
		}
		else if(selectedModel == "DomainModel"){
			domainm_shapes = shapes.slice();
		}
		else if(selectedModel == "AgentModel"){
			agentm_shapes = shapes.slice();
		}		
		else if(selectedModel == "AcquaintanceModel"){
			acquaintancem_shapes = shapes.slice();
		}
		else if(selectedModel == "KnowledgeModel"){
			knowledgem_shapes = shapes.slice();
		}
		else if(selectedModel == "InteractionModel"){
			interactionm_shapes = shapes.slice();
		}
		else if(selectedModel == "BehaviourModel"){
			behaviourm_shapes = shapes.slice();
		}
	}

	function arrayDifference(a1,a2){
		for(var i=0; i < a1.length; i++) {
			for(var j=0; j < a2.length; j++) {
				if(a1[i] == a2[j]) {
					a2.splice(j, 1);
				}
			}
		}
		return a2;
	}

	function underlineBorder(element) {
		var textBBox = element.name.getBBox();
		var elementBBox = element.getBBox();

		if(element.name!="" && element.name!=undefined && textBBox.height>0 && element.border==undefined){
			var textUnderline = r.path("M"+elementBBox.x+" "+(textBBox.y+textBBox.height+10)+"L"+(elementBBox.x+elementBBox.width)+" "+(textBBox.y+textBBox.height+10));
			element.border = textUnderline;
		} 
		else if(element.name!="" && element.name!=undefined && textBBox.height>0 && element.border!=undefined){
			element.border.attr({path:"M"+elementBBox.x+" "+(textBBox.y+textBBox.height+10)+"L"+(elementBBox.x+elementBBox.width)+" "+(textBBox.y+textBBox.height+10)});
		}
	}
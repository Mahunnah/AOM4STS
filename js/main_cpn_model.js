
$(document).ready(function(){
	var varToBeAdded = null;

	$('#cpnmmodel_toolbar').on('click mousedown', '.cpnmodel_toolbar_div', function() {
		var cpndivid = $(this);
		varToBeAdded = cpndivid.context.textContent;
		$('#holder12').css("cursor","crosshair");
	});

	$('#holder12').bind('click mousedown mouseup', function(e){
		var mouseCoordinateX = e.pageX - $("#holder12").offset().left;	
		var mouseCoordinateY = e.pageY - $("#holder12").offset().top;

		if(varToBeAdded != null && e.target && e.target.href && e.target.href.baseVal && e.target.href.baseVal.indexOf("Condition") !== -1) {
			var targetShape = getTargetObj(e.target);
		}	
		else if(varToBeAdded != null && e.target && e.target.nodeName === 'tspan' && getTargetByName(e.target.textContent)){
			var targetShape = getTargetByName(e.target.textContent);
		}

		if (targetShape) {
			createVariable(targetShape);
		}
		else if (varToBeAdded != null && e.target && e.target.nodeName === 'tspan' && isVariable(e.target.textContent, mouseCoordinateX, mouseCoordinateY)){
			var existingVar = e.target.textContent;
			var targetShape = isVariable(e.target.textContent, mouseCoordinateX, mouseCoordinateY);

			varToBeAdded = existingVar + 'x' + varToBeAdded;
			createVariable(targetShape);
		}

		varToBeAdded = null;
		$('#holder12').css("cursor","default");
	});

	function createVariable(targetShape){
		if (targetShape.variable) {
			targetShape.variable.remove();
		}

		var tbbox = targetShape.getBBox();
		targetShape.variable = r.text(tbbox.x+tbbox.width, tbbox.y+tbbox.height + 8, varToBeAdded);
		targetShape.variable.attr({ "font-size": 16, "font-family": "Arial, Helvetica, sans-serif"});
	}

	function getTargetObj(target) {
		for(var i = 0; i < shapes.length; i++) {
			if(shapes[i].node === target){
				return shapes[i];
			}
		}
		return null;
	}

	function getTargetByName(str){	
		var objWstr;
		for(var i = 0; i < shapes.length; i++) {
			if(shapes[i].simpleName === str){
				objWstr = shapes[i];
				break;
			}
		}
		if(objWstr && objWstr.imagetype === "Condition"){
			return objWstr;
		}
		return null;
	}

	function isVariable(str, x, y) {
		var shapeToReturn = null;
		var minDist = Number.MAX_VALUE;

		for(var i = 0; i < shapes.length; i++) {
			var shapeDist = Math.sqrt(Math.pow((shapes[i].name.attr('x') - x),2) + Math.pow((shapes[i].name.attr('y') - y),2));

			if(shapes[i].variable && shapes[i].variable.attrs && shapes[i].variable.attrs.text === str && shapeDist < minDist){
				minDist = shapeDist;
				shapeToReturn = shapes[i];
			}
		}
		return shapeToReturn;
	}
});

function generateCPNmodel() {

	var shapesUsed = [];

	for (var i = 0; i < behaviourim_data.length; i++) {
		var x =  getRandomCPNCoords().x;
		var y =  getRandomCPNCoords().y;

		var activityName = behaviourim_data[i].activityName;		
			
		var activityObj = getConditionExists(activityName, shapes) || createCPNShape("CPN-Activity", activityName, x, y, "Activity");
		shapesUsed.push(activityName);

		//Pre conditions
		for (var j = 0; j < behaviourim_data[i].preArr.length; j++) {
			var conditionString = behaviourim_data[i].preArr[j].trim();
			var preConditionObj = getConditionExists(conditionString, shapes);

			if(!preConditionObj){
				var condx = getRandomCPNCoords().x;
				var condy = getRandomCPNCoords().y;
				preConditionObj = createCPNShape("CPN-Condition", conditionString, condx, condy, "Condition", "pre");
			}
			shapesUsed.push(conditionString);

			//connect
			var conType = getCorrectConnectionType(preConditionObj, activityObj, selectedModel);
			if (!connectionExists(preConditionObj, activityObj)) {
				makeConnection(preConditionObj, activityObj, conType);
			}
		}

		//Post conditions
		for (var k = 0; k < behaviourim_data[i].postArr.length; k++) {
			var postconditionString = behaviourim_data[i].postArr[k].trim();
			var postConditionObj = getConditionExists(postconditionString, shapes);

			if(!postConditionObj){
				var condx = getRandomCPNCoords().x;
				var condy = getRandomCPNCoords().y;
				postConditionObj = createCPNShape("CPN-Condition", postconditionString, condx, condy, "Condition", "post");
			}
			shapesUsed.push(postconditionString);

			//connect
			var conType = getCorrectConnectionType(activityObj, postConditionObj, selectedModel);
			if (!connectionExists(activityObj, postConditionObj)) {
				makeConnection(activityObj, postConditionObj, conType);
			}
		}
	}

	//Delete unused
	//del from shapes
	var shapesToDelete = shapes.slice();
	for (var d = shapesToDelete.length-1; d >= 0; d--) {
		for (var s = 0; s < shapesUsed.length; s++) {
			if (shapesToDelete[d] && shapesToDelete[d].name && shapesToDelete[d].name.attrs && shapesToDelete[d].name.attrs.text === shapesUsed[s]) {
				shapesToDelete.splice(d,1);
			}
		}
	}

	for (var d = shapes.length-1; d >= 0; d--) {
		for (var x = shapesToDelete.length-1; x >= 0; x--) {
			if (shapes[d] == shapesToDelete[x]) {
				//delete shapes[d]
				deleteConnections(shapes[d]);
				deleteLabel(shapes[d]);
				deleteShape(shapes[d]);
			}
		}
	}

	cpnm_shapes = shapes.slice();
}

function getConditionExists(conditionText, array){
	for (var i = 0; i < array.length; i++) {
		if (array[i].name && array[i].name.attrs && array[i].name.attrs.text === conditionText) {
			return array[i];
		}
	}
	return null;
}

function getRandomCPNCoords(){
	return {
		x: $("#holder12").offset().left + randomNumber(140,$("#holder12").width()-200),
		y: $("#holder12").offset().top + randomNumber(140,$("#holder12").height()-200)
	}
}

function createCPNShape(img, text, x, y, imagetype, conditionType) {
		var newShape = r.image("images/"+img+".png", x, y, 80, 50);
		setShapeControls(newShape);
		
		//set name
		setShapeLabel(newShape, text, getCorrectLabelPosByShapeImagetype(imagetype, selectedModel));	
		newShape.imagetype = imagetype;
		newShape.variable = null;
		newShape.conditionType = conditionType;
		newShape.simpleName = text;

		shapes.push(newShape);

	return newShape;
}

function showVariables() {
	var vars = [];
	for(var i=0; i<knowledgem_shapes.length; i++){
		var knowledgeShape = knowledgem_shapes[i];
		
		if(knowledgeShape.imagetype === 'Resource'){

			var variables = knowledgeShape.attributes.split(",");

			for(var k=0; k<variables.length; k++){
				var variable = variables[k].split(":")[1];
				
				if(variable && variable!=='' && !knowledgeShapeInArray(variable,vars)){
					vars.push(variable);
				}
			}
		}
	}

	var varsToDisaply = "";
	for(var j=0; j<vars.length; j++){
		varsToDisaply += "<div class='cpnmodel_toolbar_div'>"+vars[j].toUpperCase()+"</div>";
	}

	$("#cpnmmodel_toolbar").html(varsToDisaply);
}

function knowledgeShapeInArray (el, array) {
	for(var i=0; i<array.length; i++){
		if(array[i] === el){
			return true;
		}
	}
	return false;
}
//Seose loomise funktsioon, 
	//obj1 ja obj2 on tipud 
	//line ja bg on seose värvid 
	//arrowhead on boolean, saab seosele lisada noole
Raphael.fn.connection = function (obj1, obj2, line, bg, arrowhead, arrowbegin) {
	if (obj1.line && obj1.from && obj1.to) {
        	line = obj1;
        	obj1 = line.from;
        	obj2 = line.to;
    	}

	var startX = obj1.getBBox().x + obj1.getBBox().width/2;
	var startY = obj1.getBBox().y + obj1.getBBox().height/2;
	var endX = obj2.getBBox().x + obj2.getBBox().width/2;
	var endY = obj2.getBBox().y + obj2.getBBox().height/2;

	//obj 1 deltas

	var wdiff = startX - endX;	
	var hdiff = startY - endY;

	var deltaX = obj1.getBBox().x <= obj2.getBBox().x ? obj1.getBBox().width/2 : - obj1.getBBox().width/2;	//TODO recognise which side
	var reduce = wdiff /deltaX;
	var deltaY = hdiff / reduce;

	if (deltaY > obj1.getBBox().height/2 || deltaY < -obj1.getBBox().height/2) {
		deltaY = obj1.getBBox().y <= obj2.getBBox().y ? obj1.getBBox().height/2 : - obj1.getBBox().height/2;	//TODO recognise which side
		reduce = hdiff /deltaY;
		deltaX = wdiff / reduce;
	}

	//obj 2 deltas
	
	var wdiff2 = endX - startX;	
	var hdiff2 = endY - startY;

	var deltaX2 = obj2.getBBox().x <= obj1.getBBox().x ? obj2.getBBox().width/2 : - obj2.getBBox().width/2;	//TODO recognise which side
	var reduce2 = wdiff2 /deltaX2;
	var deltaY2 = hdiff2 / reduce2;

	if (deltaY2 > obj2.getBBox().height/2 || deltaY2 < -obj2.getBBox().height/2) {
		deltaY2 = obj2.getBBox().y <= obj1.getBBox().y ? obj2.getBBox().height/2 : - obj2.getBBox().height/2;	//TODO recognise which side
		reduce2 = hdiff2 /deltaY2;
		deltaX2 = wdiff2 / reduce2;
	}


	var path = ["M", startX + deltaX, startY + deltaY, "L", endX + deltaX2, endY + deltaY2].join(",");		//teeb seose nelinurkseks

	if (line && line.line) {
        	line.bg && line.bg.attr({path: path});
        	line.line.attr({path: path});
	} 
	else {
		var arrowstart="none";
		var arrowend="none";
		if(arrowhead=="arrow"){
			arrowend="classic-wide-long";
		}
		else if(arrowhead=="block"){
			arrowend="block-wide-long";
		}
		else if(arrowhead=="crossed"){
			arrowend="crossed-wide-long";
		}
		else if(arrowhead=="arrows"){
			arrowstart="classic-wide-long";
			arrowend="classic-wide-long";
		}
		else if(arrowhead=="inheritance"){
			arrowend="opentriangle-wide-long";
		}
		else if(arrowhead=="aggregation"){
			arrowend="opendiamond-midium-long";
		}
		else if(arrowhead=="composition"){
			arrowend="diamond-wide-long";
		}
		else if(arrowhead=="doubleopen"){
			arrowend="doubleopen-wide-long";
		}
		
		if(arrowbegin=="crossed"){
			arrowstart="crossed-wide-long";
		}

        	var color = typeof line == "string" ? line : "#000";

			return {
				bg: this.path(path).attr({stroke: "white", "stroke-opacity": 0, fill: "none", "stroke-width":16}),
				line: this.path(path).attr({stroke: color, fill: "none", "stroke-width":2,"arrow-end": arrowend, "arrow-start": arrowstart}),
				from: obj1,
				to: obj2
			};
	}
};

Raphael.fn.interactionmodel_connection = function (obj1, obj2, type) {
	var line;
	var h = 40;
	var point = 40 + connections.length*(h+15);

if(selectedModel == "InteractionModel"){
	if(type=="interaction_action_on_environment"){
		var x = obj1.getBBox().x+obj1.getBBox().width;
		var y = highestY() + point;
		var w = obj1.getBBox().width*2;
		line = r.image("images/action_on_environment.png", x, y, w, h);
		line.imagetype="message";
	}
	else if(type=="interaction_nonaction_event"){
		var x = obj1.getBBox().x+obj1.getBBox().width;
		var y = highestY() + point;
		var w = obj1.getBBox().width*2;
		line = r.image("images/nonaction_event.png", x, y, w, h);
		line.imagetype="message";
	}
	else if(obj1.getBBox().x<obj2.getBBox().x){
		var x = obj1.getBBox().x+obj1.getBBox().width;
		var y = highestY() + point;
		var w = obj2.getBBox().x - x;
		
		if(type=="agent_message"){
			line = r.image("images/agent_message.png", x, y, w, h);
			line.imagetype="message";
		}
		else if(type=="physical_action"){
			line = r.image("images/physical_action.png", x, y, w, h);
			line.imagetype="message";
		}
		else if(type=="connection_right"){
			line = r.image("images/connection_right.png", x, y, w, h);
			line.imagetype="message_line";
		}
	}
	else{
		var x = obj2.getBBox().x+obj2.getBBox().width;
		var y = highestY() + point;
		var w = obj1.getBBox().x - x;

		if(type=="agent_message"){
			line = r.image("images/agent_message_left.png", x, y, w, h);
			line.imagetype="message";
		}
		else if(type=="physical_action"){
			line = r.image("images/physical_action_left.png", x, y, w, h);
			line.imagetype="message";
		}
		else if(type=="connection_right"){
			line = r.image("images/connection_left.png", x, y, w, h);
			line.imagetype="message_line";
		}
	}
}
else if(selectedModel == "BehaviourModel"){
	if(obj1.getBBox().x<obj2.getBBox().x){
		var x = obj1.getBBox().x+obj1.getBBox().width;
		if(obj2.imagetype=="Agent"){
			var y = obj1.getBBox().y+obj1.getBBox().height/2 - h/2;
		}
		else{
			var y = obj2.getBBox().y+obj2.getBBox().height/2 - h/2;
		}
		
		var w = obj2.getBBox().x - x;
		
		if(type=="agent_message"){
			line = r.image("images/agent_message.png", x, y, w, h);
			line.imagetype="message";
		}
		else if(type=="physical_action"){
			line = r.image("images/physical_action.png", x, y, w, h);
			line.imagetype="message";
		}
		else if(type=="connection_right"){
			line = r.image("images/connection_right.png", x, y, w, h);
			line.imagetype="message_line";
		}
	}
	else{
		var x = obj2.getBBox().x+obj2.getBBox().width;
		if(obj2.imagetype=="Agent"){
			var y = obj1.getBBox().y+obj1.getBBox().height/2 - h/2;
		}
		else{
			var y = obj2.getBBox().y+obj2.getBBox().height/2 - h/2;
		}
		var w = obj1.getBBox().x - x;

		if(type=="agent_message"){
			line = r.image("images/agent_message_left.png", x, y, w, h);
			line.imagetype="message";
		}
		else if(type=="physical_action"){
			line = r.image("images/physical_action_left.png", x, y, w, h);
			line.imagetype="message";
		}
		else if(type=="connection_right"){
			line = r.image("images/connection_left.png", x, y, w, h);
			line.imagetype="message_line";
		}
	}
}

	line.from = obj1;
	line.to = obj2;
	line.point = point;
	line.attr({cursor: "move"});

	cloneArray();


	line.click(function(){
		resetConnectionSelection();
		openConnection(line);
	});

	line.mousedown(function(e){
		if (e.which == 3) {
			resetConnectionSelection();
			//selectConnection(line);
			selectedConnection = line;
			modifyConnectionPopup();
			//selectedShape=line;
			//modifyShapePopup();
		}
	});

	fixConnectionAndLabelPositions();
	line.drag(moving, start, release);

	fixAgentHeight_InteractionModel();

	return line;
}

function fixInteractionModelConnectionPosition(line){
	if(line.line){
		return;
	}
	var h = 40;
	var prevElement = connections[connections.indexOf(line)-1];
	if(selectedModel == 'BehaviourModel' || prevElement == undefined){
		var point = 40;
	}
	else{
		//var point = 40 + connections.indexOf(line)*(h+15);
		var point = prevElement.point+prevElement.getBBox().height+15;
	}
	
	var obj1 = line.from;
	var obj2 = line.to;
	var x;
	var y;
	var w;

	if(selectedModel == "InteractionModel"){
		if(line.contype=="interaction_action_on_environment"){
			var y = highestY() + point;
			var w = obj1.getBBox().width*2;
			if(line.getBBox().x > obj1.getBBox().x){
				var x = obj1.getBBox().x+obj1.getBBox().width;
			}
			else{
				var x = obj1.getBBox().x-w;
			}
		}
		else if(line.contype=="interaction_nonaction_event"){
			var y = highestY() + point;
			var w = obj1.getBBox().width*2;
			if(line.getBBox().x > obj1.getBBox().x){
				var x = obj1.getBBox().x+obj1.getBBox().width;
			}
			else{
				var x = obj1.getBBox().x-w;
			}
		}
		else if(obj1.getBBox().x<obj2.getBBox().x){
			x = obj1.getBBox().x+obj1.getBBox().width;
			y = highestY() + point;
			w = obj2.getBBox().x - x;
		}
		else{
			x = obj2.getBBox().x+obj2.getBBox().width;
			y = highestY() + point;
			w = obj1.getBBox().x - x;
		}
	}
	else if(selectedModel == "BehaviourModel"){
		if(obj1.getBBox().x<obj2.getBBox().x){
			x = obj1.getBBox().x+obj1.getBBox().width;
			if(obj2.imagetype=="Agent"){
				//var y = obj1.getBBox().y+obj1.getBBox().height/2 - h/2;
				var y = obj1.getBBox().y - line.getBBox().height/2 + obj1.getBBox().height/2;
			}
			else{
				var y = obj2.getBBox().y - line.getBBox().height/2 + obj2.getBBox().height/2;
			}
			w = obj2.getBBox().x - x;
		}
		else{
			x = obj2.getBBox().x+obj2.getBBox().width;
			if(obj2.imagetype=="Agent"){
				var y = obj1.getBBox().y - line.getBBox().height/2 + obj1.getBBox().height/2;
			}
			else{
				var y = obj2.getBBox().y - line.getBBox().height/2 + obj2.getBBox().height/2;
			}
			w = obj1.getBBox().x - x;
		}
	}

	if(line.name!=undefined && line.name!=null && line.name.getBBox().height>h){
		h = line.name.getBBox().height;
	}

	if(w<0){
		w=0;
	}

	line.attr({
		'x': x,
		'y': y,
		'height': h,
		'width': w
	});
	
	var imagenameArray = line.attr('src').split("/");
	var imagename = imagenameArray[imagenameArray.length-1];

	if(obj1.getBBox().x<obj2.getBBox().x && imagename=="physical_action_left.png"){
		setImgSrc(line, "images/physical_action.png");
	}
	else if(obj1.getBBox().x>obj2.getBBox().x && imagename=="physical_action.png"){
		setImgSrc(line, "images/physical_action_left.png");
	}
	if(obj1.getBBox().x<obj2.getBBox().x && imagename=="agent_message_left.png"){
		setImgSrc(line, "images/agent_message.png");
	}
	else if(obj1.getBBox().x>obj2.getBBox().x && imagename=="agent_message.png"){
		setImgSrc(line, "images/agent_message_left.png");
	}
	if(obj1.getBBox().x<obj2.getBBox().x && imagename=="connection_left.png"){
		setImgSrc(line, "images/connection_right.png");
	}
	else if(obj1.getBBox().x>obj2.getBBox().x && imagename=="connection_right.png"){
		setImgSrc(line, "images/connection_left.png");
	}
	if(line.getBBox().x < obj1.getBBox().x && imagename=="action_on_environment.png"){
		setImgSrc(line, "images/action_on_environment_left.png");
	}
	else if(line.getBBox().x > obj1.getBBox().x && imagename=="action_on_environment_left.png"){
		setImgSrc(line, "images/action_on_environment.png");
	}
	if(line.getBBox().x < obj1.getBBox().x && imagename=="nonaction_event.png"){
		setImgSrc(line, "images/nonaction_event_left.png");
	}
	else if(line.getBBox().x > obj1.getBBox().x && imagename=="nonaction_event_left.png"){
		setImgSrc(line, "images/nonaction_event.png");
	}

	line.point = point;
	line.toFront();
	line.name.toFront();
	fixLineLabelPosition(line);
}

function setImgSrc(targetImg, newSrc) {
	if (targetImg.node.src) {
		targetImg.node.src = newSrc;
	} 
	else {
		targetImg.node.href.baseVal = newSrc;
	}
	targetImg.attr({src: newSrc})
}

function highestY(){
	var ly = shapes[0].attr('y');
	for(var i=0;i<shapes.length;i++){
		if(shapes[i].attr('y')>ly){
			ly = shapes[i].attr('y');
		}
	}
	return ly;
}

function reLocateConnection(line){
	var createLineY = clickedY[clickedY.length-2];	//clickedY holds all Y-s of clicked shapes
	clickedY = [];	

	if(connections[0]!=undefined && createLineY+(line.getBBox().height/2)>=connections[0].getBBox().y){
		for(var i=0;i<connections.length-1;i++){
			if(createLineY+(line.getBBox().height/2)>=connections[i].getBBox().y && createLineY+(line.getBBox().height/2)<=connections[i+1].getBBox().y+connections[i+1].getBBox().height){
				connections.splice(connections.indexOf(line),1);
				connections.splice(i+1, 0, line);
				fixConnectionAndLabelPositions();
				break;
			}
		}
	}
	else{
		connections.splice(connections.indexOf(line),1);
		connections.splice(i, 0, line);
		fixConnectionAndLabelPositions();
	}
	fixInteractionModelConnectionPositions();
}

function fixInteractionModelConnectionPositions(){
	for(var i=0;i<connections.length;i++){
		fixInteractionModelConnectionPosition(connections[i]);
	}
}

var start = function () {
	this.ox = this.attr("x");
	this.oy = this.attr("y");
	this.toFront();
	this.name.toFront();
},
moving = function (dx, dy) {
	if(this.contype == "interaction_action_on_environment" || this.contype == "interaction_nonaction_event"){
		var x = this.ox + dx;
		if(x < this.from.getBBox().x){
			x = this.from.getBBox().x - this.getBBox().width;
		}
		else{
			x = this.from.getBBox().x + this.from.getBBox().width;
		}
		this.attr({x: x});
		fixInteractionModelConnectionPosition(this);
	}
	this.attr({y: this.oy + dy});

	if(this.from.imagetype != "Agent"){
		this.from.attr({y: this.getBBox().y + this.getBBox().height/2 - this.from.getBBox().height/2});
		fixConnectionAndLabelPositions();
	}
	if(this.to.imagetype != "Agent"){
		this.to.attr({y: this.getBBox().y + this.getBBox().height/2  - this.to.getBBox().height/2});
		fixConnectionAndLabelPositions();
	}
	if(selectedModel == "BehaviourModel"){
		fixResizerPosition();
		if(this.from || this.to){
			fixAgentY_BehaviourModel(this);
		}
	}

	fixLineLabelPosition(this);
},
release = function () {
	if(selectedModel == "InteractionModel"){
		sortConnections();
		fixConnectionAndLabelPositions();	
	}
};

function fixLineLabelPosition(line){
	var bbox = line.getBBox(); 
	line.name.attr({x:bbox.x+bbox.width/2,y:bbox.y+bbox.height/2});
}

function sortConnections(){
	for(var i=0;i<connections.length;i++){
		for(var j=0;j<connections.length;j++){
			if(connections[j].getBBox().y>connections[i].getBBox().y){
				var temp = connections[i];
				connections[i]=connections[j];
				connections[j] = temp;
			}
		}
	}
	fixInteractionModelConnectionPositions();
}

function fixAgentHeight_InteractionModel(){
	if(connections.length>0){ 
		if(connections[connections.length-1].imagetype && connections[connections.length-1].imagetype.indexOf("message")!=-1){
			var lastY = connections[connections.length-1].getBBox().y+connections[connections.length-1].getBBox().height+40;
			for(var i=0;i<shapes.length;i++){
				if(shapes[i].imagetype == "Agent" && shapes[i].getBBox().y+shapes[i].getBBox().height<lastY){
					shapes[i].attr({height:lastY-shapes[i].getBBox().y});
				}
			}
		}
	}
}

function fixAgentY_BehaviourModel(connection){
	if(connection.from.imagetype == "Agent" && connection.from.getBBox().y > connection.to.getBBox().y){
		connection.from.attr({y: connection.to.getBBox().y-40});
	}
	else if(connection.to.imagetype == "Agent" && connection.to.getBBox().y > connection.from.getBBox().y){
		connection.to.attr({y: connection.from.getBBox().y-40});
	}
}

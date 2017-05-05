	//tipu sildi loomine (tipp, tekst, asukoht)
	function setShapeLabel(shape, label_text, pos){
		var shapePosition = shapes.indexOf(shape);
		//var bbox = shapes[shapePosition].getBBox();
		var bbox = shape.getBBox();
		var label;
			
		if(label_text!=null){
			if(shape.name!=null){
				shape.name.attr('text',label_text);
				fixConnectionAndLabelPositions();	
			}
			else{
				if(pos=="middle" || pos==null){
					label = r.text(bbox.x+bbox.width/2,bbox.y+bbox.height/2,label_text);
				}
				else if(pos=="bottom"){
					label = r.text(bbox.x+bbox.width/2,bbox.y+bbox.height+5,label_text);
					alignTop(label,shape,pos);	
				}
				else if(pos=="modified1"){
					label = r.text(bbox.x+bbox.width/2,bbox.y+((bbox.height/100)*16.5),label_text);
					//alignTop(label,shape,pos);
				}
				else if(pos=="top"){
					label = r.text(bbox.x+bbox.width/2,bbox.y+9,label_text);
					label.attr({ "font-size": 16, "font-family": "Arial, Helvetica, sans-serif" });
					alignTop(label,shape,pos);
				}
				else if(pos=="abovetop"){
					label = r.text(bbox.x+bbox.width/2,bbox.y+9,label_text);
					label.attr({ "font-size": 16, "font-family": "Arial, Helvetica, sans-serif" });
					label.attr({
						x: bbox.x + label.getBBox().width/2,
						y: bbox.y - label.getBBox().height/2
					});		
				}
				else{
					label = r.text(bbox.x+bbox.width/2,bbox.y+bbox.height/2,label_text);
				}
				label.attr({ "font-size": 16, "font-family": "Arial, Helvetica, sans-serif" });
				label.drag(labelMove, labelDrag);
				label.click(clickLabel);
				label.dblclick(selectConnectionByShapes);
				label.mousedown(function(e) {
					selectShape(shape);
					if (e.which === 3) {
						modifyShapePopup();
					}
				});
				label.attr("cursor","move");
				label.attr('font-size', fixLabelSize(label, shape));
				shape.name = label;
			}
		}
	}
	function alignTop(label, shape, pos) {
   		var lbbox = label.getBBox();
    		var sbbox = shape.getBBox();
		var val;
		if(pos=="modified1"){
			var linesCount = (label.attr("text").split("\n").length);

			val =  sbbox.y + ((sbbox.height/100)*30.7) + lbbox.height/2 - ((linesCount/(lbbox.height/4))*100);
			
			if(label.attr('font-size')<16){
				val = sbbox.y + ((sbbox.height/100)*30.7) + lbbox.height/2 - label.attr('font-size');
			}
		}
		else if(pos=="top"){
			val = sbbox.y + lbbox.height/2;
		}
		else{
			val = lbbox.height/2 +  sbbox.y + sbbox.height;
		}

		if(!isNaN(val) && isFinite(val)){
    			label.attr({
        			'y': val
    			});
		}
	}
	
	function setConnectionLabel(connection, label_text){	//seose sildi loomine
		if(connection.name===undefined){
			if(connection.line!=undefined){
				var bbox = connection.line.getBBox();
			}
			else{
				var bbox = connection.getBBox();
			}
			var x = Math.floor(bbox.x + bbox.width/2.0); 
			var y = Math.floor(bbox.y + bbox.height/2.0);
				if(connection.from==connection.to){
					y=connection.from.getBBox().y-connection.from.getBBox().height;
				}
			var label = r.text(x,y-8,label_text);
			label.attr("font-size",14);
			label.click(function(){
				resetConnectionSelection();
				selectedConnection = connection;
				openConnection();
				modifyConnectionPopup();
			});
			label.attr("cursor","pointer");
			connection.name = label;
		}
		else{
			connection.name.attr('text',label_text);
		}
		if(selectedModel=="InteractionModel"){
			$(connection.name.node).css('text-decoration','underline');
		}
	}

	function labelMove(dx, dy){	//sildi lohistamine - tipp peab kaasa liikuma
		this.attr({x: this.ox + dx, y: this.oy + dy});
		r.safari();
		
		for(var i=0; i<shapes.length;i++){
			if(shapes[i].name==this){
				var shapeBBox = shapes[i].getBBox();
				shapes[i].attr({x: this.ox-shapeBBox.width/2 + dx,y: this.oy-shapeBBox.height/2 + dy});
				selectShape(shapes[i]);
				fixResizerPosition();
				fixConnectionAndLabelPositions();

				if(shapes[i].variable){
					var tbbox = shapes[i].getBBox();
					shapes[i].variable.attr({x: tbbox.x+tbbox.width, y: tbbox.y+tbbox.height + 8});
				}
			}
		}

		checkForResizeRaphaelByShapeMovement();
	}

	function labelDrag() {		//sildist haaramine
        this.ox = this.attr("x");
		this.oy = this.attr("y");
    }


	function fixLabelSize(label, shape){	//sildi positsiooni korrigeerimine
		var labelBBox = label.getBBox();
		var shapeBBox = shape.getBBox();
		var fontSize = label.attr('font-size');
			
		if(labelBBox.width>shapeBBox.width || labelBBox.height>shapeBBox.height){
			while(labelBBox.width>shapeBBox.width || labelBBox.height>shapeBBox.height){
				fontSize = fontSize-1;
				label.attr('font-size',fontSize);	
				labelBBox = label.getBBox();	
				shapeBBox = shape.getBBox();
				fontSize = label.attr('font-size');
			}
		}
		else if(fontSize<16){
			fontSize = fontSize+1;
			label.attr('font-size',fontSize);	
		}
		return fontSize;
	}

	function deleteLabel(selectedShape){		//tipu sildi kustutamine
		var shapePosition = shapes.indexOf(selectedShape);
		if(selectedShape.header && selectedShape.header.name){
			selectedShape.header.name.remove();
		}
		if(shapePosition!=-1 && selectedShape.name!=null){
			selectedShape.name.remove();
			if(selectedShape.border!=undefined && selectedShape.border!=null){
				selectedShape.border.remove();
			}
		}
	}

	function getCorrectLabelPosByShapeImagetype(imagetype, model){
		var poss;
		if(model=="GoalModel"){						//uute mudelite loomisel lisada uus else if
			poss = labelPositions_GoalModel;
		}
		else if(model=="RoleModel"){						//uute mudelite loomisel lisada uus else if
			poss = labelPositions_GoalModel;
		}
		else if(model=="DomainModel"){						
			poss = labelPositions_DomainModel;
		}
		else if(model=="OrganizationModel"){						
			poss = labelPositions_GoalModel;
		}
		else if(model=="AcquaintanceModel"){						
			poss = labelPositions_AcquaintanceModel;
		}
		else if(model=="AgentModel"){						
			poss = labelPositions_AcquaintanceModel;
		}
		else if(model=="KnowledgeModel"){						
			poss = labelPositions_KnowledgeModel;
		}
		else if(model=="InteractionModel"){						
			poss = labelPositions_InteractionModel;
		}
		else if(model=="BehaviourModel"){						
			poss = labelPositions_BehaviourModel;
		}
		else if(model=="CPNModel"){						
			poss = labelPositions_CPNModel;
		}
			
		if(imagetype!==undefined && poss){
			for(var i=0;i<poss.length;i++){
				var shapeType = poss[i].split(":")[0];
				var labelPos = poss[i].split(":")[1];
					
				if(imagetype==shapeType){
					return labelPos;
				}
			}
		}
		return "bottom";
	}

	function clickLabel(){	//sildile klikkimine, et töötaks samamoodi nagu tipule klikkimine
		for(var i=0; i<shapes.length;i++){
			if(shapes[i].name==this){
				selectShape(shapes[i]);
				checkForConnection(shapes[i]);	
				fixResizerPosition();
				fixConnectionAndLabelPositions();
			}
		}
	}

	function shortenName(word,charNum){
		if(word.length>charNum){
			return word.substring(0,charNum)+"..";
		}
		else{
			return word;
		}
	}
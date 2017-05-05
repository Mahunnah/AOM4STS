	function openResizer(shape){		//resizeri nähtavaks tegemine
		if(resizerOpened==false){
			var bbox = shape.getBBox();
			resizer = r.ellipse(bbox.x+bbox.width, bbox.y+bbox.height, 5, 5);
			resizer.attr({fill: "red", cursor: "pointer"});
			resizer.drag(resizerMove, resizerDragger);
			//resizer.dblclick(modifyShapePopup);
			resizerOpened=true;
		}
	}

	//resizeri kuulajad
	var resizerDragger = function () {		
        this.ox = this.type == "rect" || this.type == "image" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" || this.type == "image" ? this.attr("y") : this.attr("cy");
		resizer.attr({fill: "red", cursor: "se-resize"});
    	}
	var resizerMove = function(dx, dy){		//resizeri liigutamine
		this.attr({cx: this.ox + dx, cy: this.oy + dy});
		r.safari();
		
		if(selectedShape.type == "rect" || selectedShape.type == "image"){ 	   //suuruse muutmine rect ja image puhul
			var bbox = selectedShape.getBBox();		
			var x1 = selectedShape.attr("x");
			var x2 = this.attr("cx");
			var y1 = selectedShape.attr("y");
			var y2 = this.attr("cy");
			
			if(x2-bbox.x>0){
				selectedShape.attr({'height': y2-bbox.y, 'width': x2-bbox.x});
			}
			else if(x2-bbox.x<0){
				 selectedShape.attr({'x':bbox.x-20,'height': y2-bbox.y, 'width': 20});
			}
			if(y2-bbox.y<0){
				 selectedShape.attr({'y':bbox.y-20,'height': 20, 'width': x2-bbox.x});
			}
			
		}
		else{	//suuruse muutmine muudel juhtudel
			var bbox = selectedShape.getBBox();		
			var x1 = selectedShape.attr("cx");
			var x2 = this.attr("cx");
			var y1 = selectedShape.attr("cy");
			var y2 = this.attr("cy");
			selectedShape.attr("rx", Math.abs(x2-x1));
			selectedShape.attr("ry", Math.abs(y2-y1));
		}
		fixConnectionAndLabelPositions();
		var labelToFixWidth = selectedShape.name;	
		if(labelToFixWidth){	
			labelToFixWidth.attr('font-size',fixLabelSize(labelToFixWidth, selectedShape));
		}

		if(selectedShape && selectedShape.variable){
			var tbbox = selectedShape.getBBox();
			selectedShape.variable.attr({x: tbbox.x+tbbox.width, y: tbbox.y+tbbox.height + 8});
		}
	}
	
	function fixResizerPosition(){	//resizeri positsiooni korrigeerimine (kaasaliikumine)
		if(!selectedShape){
			return;
		}
		var shapePosition = shapes.indexOf(selectedShape);
		var bbox = selectedShape.getBBox();
		resizer.attr({cx:bbox.x+bbox.width,cy:bbox.y+bbox.height});
	}

	function closeResizer(){		//resizeri peitmine
		if(resizerOpened==true){
			resizer.remove();
		}
		resizerOpened=false;
	} 
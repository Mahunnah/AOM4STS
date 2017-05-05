$(document).ready(function(){
	var newShapeClicked=false;
	var clickedShapeID;
	$('#domain_model_toolbar').on('click mousedown', '.domainmodel_toolbar_button', function() {
   		var role_div_id = $(this).attr('id');
		var shape_id = role_div_id.split("_")[1];
		$('#holder5').css("cursor","crosshair");
		newShapeClicked=true;
		clickedShapeID = shape_id;
		for(i=0;i<shapes.length;i++){
			if(shapes[i].id==clickedShapeID){
				clickedShapeID=undefined;
				$('#holder5').css("cursor","default");
				say("Element already exists in domain model!");
				$(this).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75);
			}
		}
	});

	$('#Resource').bind('click mousedown',function(){
		clickedShapeID=$(this).attr('id');
		$('#holder5').css("cursor","crosshair");
	});

	$('#holder5').bind('click mousedown mouseup', function(e){					//klikk joonistuspinnal - tipu lisamine
		var holderPositionX = $("#holder5").offset().left;
		var holderPositionY = $("#holder5").offset().top;
		var mouseCoordinateX = e.pageX - holderPositionX;	
		var mouseCoordinateY = e.pageY - holderPositionY;
				
		var newShapePosition = shapes.length;
		
		if(newShapeClicked==true && clickedShapeID!=undefined && clickedShapeID!="Resource"){
			$('#holder5').css("cursor","default");

			var originalShape = getElementByID(clickedShapeID);
			shapes[newShapePosition] = r.image("images/Role.png", mouseCoordinateX-20, mouseCoordinateY-26, 40, 55);

			setShapeControls(shapes[newShapePosition]);

			//set name
			setShapeLabel(shapes[newShapePosition], originalShape.simplename, getCorrectLabelPosByShapeImagetype("Role", selectedModel));	
			
			shapes[newShapePosition].id = originalShape.id;
			//set description
			shapes[newShapePosition].description = originalShape.description;

			//set simplename
			shapes[newShapePosition].simplename = originalShape.simplename;

			//set constraints
			shapes[newShapePosition].constraints = originalShape.constraints;

			//set responsibilities
			shapes[newShapePosition].responsibilities = originalShape.responsibilities;

			//set imagetype
			shapes[newShapePosition].imagetype = originalShape.imagetype;

			selectShape(shapes[newShapePosition]);
			showDomainModelNames();

			cloneShapes();	
			newShapeClicked=false;
			clickedShapeID=undefined;
		}
		else if(clickedShapeID=="Resource"){
			$('#holder5').css("cursor","default");
			shapes[newShapePosition]=r.image("images/Resource.png", mouseCoordinateX-45, mouseCoordinateY-20, 90, 40);

			setShapeControls(shapes[newShapePosition]);

			//set name
			setShapeLabel(shapes[newShapePosition], "", getCorrectLabelPosByShapeImagetype("Resource", selectedModel));	
			
			//set simplename
			shapes[newShapePosition].simplename = "";

			//set description
			shapes[newShapePosition].description = "";

			//set imagetype
			shapes[newShapePosition].imagetype = clickedShapeID;

			selectShape(shapes[newShapePosition]);

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

			showDomainModelNames();
			cloneShapes();	
			newShapeClicked=false;
			clickedShapeID=undefined;
			resetClicksOnNewShape();
		}
	});

	var autoConnectObj1; var autoConnectObj2; var autoConnection = false;
	$('.subbutton').click(function(){  //alamtipu nupu kuulamine
		if($(this).hasClass("add_subresource_button")){
			saveElement();

			autoConnectObj1 = selectedShape;
			autoConnection = true;

			$("#popup_window").css("display", "none");
				$('#domain_line').click();

			$('#Resource').click();
		}
	});
	
	function getElementByID(shape_id){
		for(i=0;i<goalm_shapes.length;i++){
			if(goalm_shapes[i].id == shape_id){
				return goalm_shapes[i];
			}		
		}
	}
});

function showDomainModelNames(){
	var allroles ="";
	
	for(i=0;i<goalm_shapes.length;i++){
		if(goalm_shapes[i].imagetype=="Role"){
			if(goalm_shapes[i].simplename!="" && goalm_shapes[i].simplename!=undefined){
				allroles+="<div id='domainrole_"+goalm_shapes[i].id+"' class='domainmodel_toolbar_button'><div class='role_icon'></div> "+shortenName(goalm_shapes[i].simplename,10)+"</div>";
			}
			else{
				allroles+="<div id='domainrole_"+goalm_shapes[i].id+"' class='domainmodel_toolbar_button'><div class='role_icon'></div> <i>~nameless</i></div>";
			}
		}
	}
	
	$("#domain_model_toolbar").html(allroles);
	updateDommShapes();
}

function updateDommShapes(){
	for(i=0;i<goalm_shapes.length;i++){
			for(j=0;j<shapes.length;j++){
				if(goalm_shapes[i].id==shapes[j].id){
					//set name
					setShapeLabel(shapes[j], goalm_shapes[i].simplename, getCorrectLabelPosByShapeImagetype("Role", selectedModel));	

					//set description
					shapes[j].description = goalm_shapes[i].description;

					//set simplename
					shapes[j].simplename = goalm_shapes[i].simplename;

					//set constraints
					shapes[j].constraints = goalm_shapes[i].constraints;

					//set responsibilities
					shapes[j].responsibilities = goalm_shapes[i].responsibilities;

					//set imagetype
					shapes[j].imagetype = goalm_shapes[i].imagetype;
				}
			}
	}
	
	
	var domm_shapes_clone = domainm_shapes.slice();	//holds items to that need to be deleted
	for(var i=0; i < goalm_shapes.length; i++) {
		for(var j=0; j < domm_shapes_clone.length; j++) {
			if(goalm_shapes[i].id == domm_shapes_clone[j].id) {
				domm_shapes_clone.splice(j, 1);
			}
		}
	}	
	for(var i=0; i<domm_shapes_clone.length; i++){
		if(domm_shapes_clone[i].imagetype!="Resource"){
			deleteElementByShape(domm_shapes_clone[i]);
		}
	}
	
}
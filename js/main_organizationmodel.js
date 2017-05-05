$(document).ready(function(){
	var newShapeClicked=false;
	var clickedShapeID;
	$('#organization_model_toolbar').on('click mousedown', '.organizationmodel_toolbar_button', function() {
   		var role_div_id = $(this).attr('id');
		var shape_id = role_div_id.split("_")[1];
		$('#holder4').css("cursor","crosshair");
		newShapeClicked=true;
		clickedShapeID = shape_id;
		for(i=0;i<shapes.length;i++){
			if(shapes[i].id==clickedShapeID){
				clickedShapeID=undefined;
				$('#holder4').css("cursor","default");
				say("Element already exists in organization model!");
				$(this).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75).fadeOut(75).fadeIn(75);
			}
		}
	});

	$('#holder4').bind('click mousedown mouseup', function(e){					//klikk joonistuspinnal - tipu lisamine
		if(newShapeClicked==true && clickedShapeID!=undefined){
			$('#holder4').css("cursor","default");
			var holderPositionX = $("#holder4").offset().left;
			var holderPositionY = $("#holder4").offset().top;
			var mouseCoordinateX = e.pageX - holderPositionX;	
			var mouseCoordinateY = e.pageY - holderPositionY;
				
			var newShapePosition = shapes.length;
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

			showOrganizationModelNames();

			cloneShapes();	
			newShapeClicked=false;
			clickedShapeID=undefined;
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


function showOrganizationModelNames(){
	var allroles ="";
	
	for(i=0;i<goalm_shapes.length;i++){
		if(goalm_shapes[i].imagetype=="Role"){
			if(goalm_shapes[i].simplename!="" && goalm_shapes[i].simplename!=undefined){
				allroles+="<div id='orgrole_"+goalm_shapes[i].id+"' class='organizationmodel_toolbar_button'><div class='role_icon'></div> "+shortenName(goalm_shapes[i].simplename,10)+"</div>";
			}
			else{
				allroles+="<div id='orgrole_"+goalm_shapes[i].id+"' class='organizationmodel_toolbar_button'><div class='role_icon'></div> <i>~nameless</i></div>";
			}
		}
	}
	
//$("#organization_model_toolbar").find(".organizationmodel_toolbar_button").css("display","none");

	$("#organization_model_toolbar").html(allroles);
	updateOrgmShapes();
}

function updateOrgmShapes(){
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
	
	
	var orgm_shapes_clone = orgm_shapes.slice();	//holds items to that need to be deleted
	for(var i=0; i < goalm_shapes.length; i++) {
		for(var j=0; j < orgm_shapes_clone.length; j++) {
			if(goalm_shapes[i].id == orgm_shapes_clone[j].id) {
				orgm_shapes_clone.splice(j, 1);
			}
		}
	}	
	for(var i=0; i<orgm_shapes_clone.length; i++){
		deleteElementByShape(orgm_shapes_clone[i]);
	}
	
}

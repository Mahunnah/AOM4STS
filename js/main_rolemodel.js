//holderwrapper
$(document).ready(function(){
	$('#role_model_toolbar').on('click', '.rolemodel_toolbar_button', function() {
   		var role_div_id = $(this).attr('id');
		var shape_id = role_div_id.split("_")[1];
		cancelEditRoleModel();
		createRoleModel(shape_id);
	});
	$('#edit_rolemodel_button').click(function(){
		if($(".rolemodel_textarea").css("display")=="block"){
			$(".rolemodel_textarea_edit").css("display","block");

			$('#rolemodel_table_name_edit').val($('#rolemodel_table_name').html());
			$('#rolemodel_table_description_edit').val($('#rolemodel_table_description').html());
			$('#rolemodel_table_responsibilities_edit').val($('#rolemodel_table_responsibilities').html());
			$('#rolemodel_table_constraints_edit').val($('#rolemodel_table_constraints').html());

			$(".rolemodel_textarea").css("display","none");
			$('#edit_rolemodel_button').val("Save");
		}
		else{
			$(".rolemodel_textarea").css("display","block");
			$(".rolemodel_textarea_edit").css("display","none");
			$('#edit_rolemodel_button').val("Edit");
			var currentShape_id = $('#rolemodel_table_id').val();
			
			for(i=0;i<shapes.length;i++){
				if(shapes[i].imagetype=="Role" && shapes[i].id==currentShape_id){
					setShapeLabel(shapes[i], $('#rolemodel_table_name_edit').val());
					shapes[i].simplename = $('#rolemodel_table_name_edit').val();
					shapes[i].description = $('#rolemodel_table_description_edit').val();
					shapes[i].responsibilities = $('#rolemodel_table_responsibilities_edit').val();
					shapes[i].constraints = $('#rolemodel_table_constraints_edit').val();	
				}
			}
			showRoleModelNames();
			createRoleModel(currentShape_id);
		}
	});
	$('#role_model_toolbar').on('click', '#role_new', function() {
		var randomX = $("#holder").offset().left + randomNumber(70,$("#holder").width());
		var randomY = $("#holder").offset().top + randomNumber(70,$("#holder").height()*2/3);
		var newRole = addNewShape("Role",randomX,randomY,"GoalModel");
		showRoleModelNames();
		createRoleModel(newRole.id);
		$('#edit_rolemodel_button').click();
	});
	$('#delete_rolemodel_button').click(function(){
		var currentShape_id = $('#rolemodel_table_id').val();
		deleteElementByShape(getShapeByID(currentShape_id));
		$(".rolemodelcontent").css("display","none");
		cancelEditRoleModel();
		showRoleModelNames();
	});

	$('#rolemodel_table_responsibilities_edit, #rolemodel_table_constraints_edit').on( 'keyup', function(e){
		if (e.keyCode === 13) {
			var val = $(this).val();
			val = val.replace(/•/g, '');
			var vals = val.split("\n");

			for(var i=0;i<vals.length;i++){
				vals[i] = vals[i].trim();
			}
			val = vals.join("\n• ");

			$(this).val("• "+ val);
		} 
	});
});

function showRoleModelNames(){
	var allroles ="";
	allroles+="<div id='role_new' class='rolemodel_toolbar_button'><div class='role_icon'></div> Create new</div>";
	for(i=0;i<shapes.length;i++){
		if(shapes[i].imagetype=="Role")
			if(shapes[i].simplename!="" && shapes[i].simplename!=undefined){
				allroles+="<div id='role_"+shapes[i].id+"' class='rolemodel_toolbar_button'><div class='role_icon'></div> "+shortenName(shapes[i].simplename,10)+"</div>";
			}
			else{
				allroles+="<div id='role_"+shapes[i].id+"' class='rolemodel_toolbar_button'><div class='role_icon'></div> <i>~nameless</i></div>";
			}
	}
	$("#role_model_toolbar").html(allroles);
}

function createRoleModel(shape_id){
	var role_model = "";
	$(".rolemodelcontent").css("display","table");
	for(i=0;i<shapes.length;i++){
		if(shapes[i].imagetype=="Role" && shapes[i].id==shape_id){
			$('#rolemodel_table_name').html(shapes[i].simplename);
			$('#rolemodel_table_description').html(shapes[i].description);
			$('#rolemodel_table_responsibilities').html(shapes[i].responsibilities);
			$('#rolemodel_table_constraints').html(shapes[i].constraints);
			$('#rolemodel_table_id').val(shapes[i].id);
		}
	}
	$(".rolemodel_toolbar_button").removeClass("selected_rolemodel_role_name");
	$("#role_"+shape_id).addClass("selected_rolemodel_role_name");
}
function cancelEditRoleModel(){
	$(".rolemodel_textarea").css("display","block");
	$(".rolemodel_textarea_edit").css("display","none");
	$('#edit_rolemodel_button').val("Edit");
}
$(document).ready(function(){
	$('#motivational_scenario_toolbar').on('click', '.motivationalscenario_toolbar_button', function() {
   		var fg_div_id = $(this).attr('id');
		var shape_id = fg_div_id.split("_")[1];
		cancelEditMotivationalScenario();
		createMotivationalScenario(shape_id);
	});
	$('#edit_motivationalscenario_button').click(function(){
		if($(".motivationalscenario_textarea").css("display")=="block"){	//edit
			$(".motivationalscenario_textarea_edit").css("display","block");
			$(".delete_motivationalscenario_qg_button").css("display","block");
	
			$('#motivationalscenario_table_name_edit').val($('#motivationalscenario_table_name').html());
			$('#motivationalscenario_table_description_edit').val($('#motivationalscenario_table_description').html());
			
			$(".motivationalscenario_qg_textarea_edit").each(function(){
				this_qg_id=$(this).attr('id');
				this_qg_div_id="QG_"+this_qg_id.split("_")[1];
				$("#"+this_qg_id).val($("#"+this_qg_div_id).html());
			});

			$("#add_motivationalscenario_qg_description").css("display","block");
			$(".motivationalscenario_textarea").css("display","none");
			$('#edit_motivationalscenario_button').val("Save");
		}
		else{	//save
			$(".motivationalscenario_textarea").css("display","block");
			$(".motivationalscenario_textarea_edit").css("display","none");
			$("#add_motivationalscenario_qg_description").css("display","none");
			$(".delete_motivationalscenario_qg_button").css("display","none");
			$('#edit_motivationalscenario_button').val("Edit");
			var currentShape_id = $('#motivationalscenario_table_id').val();
			
			for(i=0;i<shapes.length;i++){
				if(shapes[i].imagetype=="FG" && shapes[i].id==currentShape_id){
					setShapeLabel(shapes[i], $('#motivationalscenario_table_name_edit').val());
					shapes[i].simplename = $('#motivationalscenario_table_name_edit').val();
					shapes[i].description = $('#motivationalscenario_table_description_edit').val();
					$(".motivationalscenario_qg_textarea_edit").each(function(){
						this_qg_id=$(this).attr('id').split("_")[1];
						for(j=0;j<shapes.length;j++){
							if(shapes[j].imagetype=="QG" && shapes[j].id==this_qg_id){
								shapes[j].description = $("#QG_"+shapes[j].id+"_edit").val();
							}
						}
					});
				}
			}

			showMotivationalScenarioNames();
			createMotivationalScenario(currentShape_id);
		}
	});

	$("#motivationalscenario_table_qualitydescription").on("click", "#add_motivationalscenario_qg_description", function(){
		var currentShape_id = $('#motivationalscenario_table_id').val();
		var randomX = $("#holder").offset().left + randomNumber(30,$("#holder").width());
		var randomY = $("#holder").offset().top + randomNumber(30,$("#holder").height()*2/3);
		var newQG = addNewShape("QG",randomX,randomY,"GoalModel");
		var conType = getCorrectConnectionType(getShapeByID(currentShape_id), newQG, "GoalModel");
		makeConnection(getShapeByID(currentShape_id), newQG, conType);
		$('#edit_motivationalscenario_button').click();
		createMotivationalScenario(currentShape_id);
		$('#edit_motivationalscenario_button').click();
		$("#holder2").animate({ scrollTop: $('#holder2')[0].scrollHeight}, 0);
	});

	$("#motivationalscenario_table_qualitydescription").on("click", ".delete_motivationalscenario_qg_button", function(){
		var currentShape_id = $('#motivationalscenario_table_id').val();
		var qg_del_div_id = $(this).attr('id');
		var qg_id = qg_del_div_id.split("_")[1];
		deleteElementByShape(getShapeByID(qg_id));
		$('#edit_motivationalscenario_button').click();
		createMotivationalScenario(currentShape_id);
		$('#edit_motivationalscenario_button').click();
	});
	$('#motivational_scenario_toolbar').on('click', '#FG_new', function() {
		var randomX = $("#holder").offset().left + randomNumber(70,$("#holder").width());
		var randomY = $("#holder").offset().top + randomNumber(70,$("#holder").height()*2/3);
		var newFG = addNewShape("FG",randomX,randomY,"GoalModel");
		showMotivationalScenarioNames();
		createMotivationalScenario(newFG.id);
		$('#edit_motivationalscenario_button').click();
	});
	$('#delete_motivationalscenario_button').click(function(){
		var currentShape_id = $('#motivationalscenario_table_id').val();

		deleteUnnecessaryQGs(currentShape_id);
		deleteElementByShape(getShapeByID(currentShape_id));
		$(".motivationalscenariocontent").css("display","none");
		cancelEditMotivationalScenario();
		showMotivationalScenarioNames()
	});

});

function showMotivationalScenarioNames(){
	var allfgs ="";
	allfgs+="<div id='FG_new' class='motivationalscenario_toolbar_button'><div class='fg_icon'></div> Create new</div>";
	for(i=0;i<shapes.length;i++){
		if(shapes[i].imagetype=="FG")
			if(shapes[i].simplename!="" && shapes[i].simplename!=undefined){
				allfgs+="<div id='FG_"+shapes[i].id+"' class='motivationalscenario_toolbar_button'><div class='fg_icon'></div> "+shortenName(shapes[i].simplename,10)+"</div>";
			}
			else{
				allfgs+="<div id='FG_"+shapes[i].id+"' class='motivationalscenario_toolbar_button'><div class='fg_icon'></div> <i>~nameless</i></div>";
			}
	}
	$("#motivational_scenario_toolbar").html(allfgs);
}

function createMotivationalScenario(shape_id){
	var qgdescription="";
	$(".motivationalscenariocontent").css("display","table");
	$("#add_motivationalscenario_qg_description").css("display","none");
	for(i=0;i<shapes.length;i++){
		if(shapes[i].imagetype=="FG" && shapes[i].id==shape_id){
			$('#motivationalscenario_table_name').html(shapes[i].simplename);
			$('#motivationalscenario_table_description').html(shapes[i].description);
	
			for(j=0;j<connections.length;j++){
				if(connections[j].from.id==shapes[i].id && connections[j].to.imagetype=="QG"){
					qgdescription+="<div id='QG_"+connections[j].to.id+"' class='motivationalscenario_textarea motivationalscenario_qgdescription'>"+connections[j].to.description+"</div><div class='motivational_scenario_qg_description_wrapper'><textarea id='QG_"+connections[j].to.id+"_edit' class='motivationalscenario_textarea_edit motivationalscenario_qg_textarea_edit'></textarea><div id='QG_"+connections[j].to.id+"_delete' class='delete_motivationalscenario_qg_button'></div></div>";
				}
				else if(connections[j].to.id==shapes[i].id && connections[j].from.imagetype=="QG"){
					qgdescription+="<div id='QG_"+connections[j].from.id+"' class='motivationalscenario_textarea motivationalscenario_qgdescription'>"+connections[j].from.description+"</div><div class='motivational_scenario_qg_description_wrapper'><textarea id='QG_"+connections[j].from.id+"_edit' class='motivationalscenario_textarea_edit motivationalscenario_qg_textarea_edit'></textarea><div id='QG_"+connections[j].from.id+"_delete' class='delete_motivationalscenario_qg_button'></div></div>";
				}
			}
			
			qgdescription+="<input id='add_motivationalscenario_qg_description' type='button' value='add another quality goal description'>";
			$('#motivationalscenario_table_qualitydescription').html(qgdescription);
			$('#motivationalscenario_table_id').val(shapes[i].id);
		}
	}
	$(".motivationalscenario_toolbar_button").removeClass("selected_motivationalscenario_role_name");
	$("#FG_"+shape_id).addClass("selected_motivationalscenario_role_name");
}

function cancelEditMotivationalScenario(){
	$(".motivationalscenario_textarea").css("display","block");
	$(".motivationalscenario_textarea_edit").css("display","none");
	$(".delete_motivationalscenario_qg_button").css("display","none");
	$('#edit_motivationalscenario_button').val("Edit");
}

function deleteUnnecessaryQGs(FG_id){
	var QGhasDifferentFGs = false;
	var QGsToKeep = [];
	var QGs = [];
	var currentFG = getShapeByID(FG_id);
	var foundQG;
	for(i=0;i<connections.length;i++){
		if(connections[i].to.id==FG_id && connections[i].from.imagetype=="QG"){
			foundQG=connections[i].from;
			QGs.push(connections[i].from);
		}	
		else if(connections[i].from.id==FG_id && connections[i].to.imagetype=="QG"){
			foundQG=connections[i].to;
			QGs.push(connections[i].to);
		}
		if(foundQG!=undefined){
			for(k=0;k<connections.length;k++){
				if(connections[k].from.id==foundQG.id || connections[k].to.id==foundQG.id){
					var gq;
					if(connections[k].from.id==foundQG.id && connections[k].to.imagetype=="FG" && connections[k].to.id!=FG_id){
						QGsToKeep.push(connections[k].from);
					}
					else if(connections[k].to.id==foundQG.id && connections[k].from.imagetype=="FG" && connections[k].from.id!=FG_id){
						QGsToKeep.push(connections[k].to);
					}
					
				}
			}
			foundQG=undefined;
		}
	}	
	var QGsToDelete = $(QGs).not(QGsToKeep).get();	//difference between all qg-s and qg-s to keep 
	for(i=0;i<QGsToDelete.length;i++){
		deleteElementByShape(QGsToDelete[i]);
	}
}



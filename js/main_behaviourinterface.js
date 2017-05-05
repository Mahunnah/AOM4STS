var behim_rows_nr = 0;
var behaviourim_data = [];

$(document).ready(function(){
	
	$("#edit_behaviourinterfacetable").click(function(){
		if($("#edit_behaviourinterfacetable").val().toLowerCase() == "edit"){
			editBift()
		}
		else{
			saveBift();
		}
	});

	$("#behaviourinterfacetable_add").click(function(){
		saveBift();
		createBehimArray();
		if(behim_rows_nr < behaviourim_shapes.length){
			behim_rows_nr++;
			showBehimRows(behim_rows_nr);
		}
		hideBehimAddButton();
		editBift();
	});

	$('#behaviourinterfacetable_wrapper').on( 'change', '.behim-list', function(){ 
    		var value = $(this).val(); 
		var name = $(this).find('option:selected').text();
		var id = $(this.id);
		var index = id.selector.split("-")[id.selector.split("-").length-1];
		//console.log(value, name, id, id.selector, index);
		$("#selected-activity-"+index).html(name);
	});

	$('#behaviourinterfacetable_wrapper').on( 'keyup', '.editablebifts', function(e){
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

function drawBehaviourInterfaceTable(){
	createBehimArray();
	hideBehimAddButton();

	saveBift();
	showBehimRows(behim_rows_nr);
	editBift();
}

function showBehimRows(rows_nr){
	var rows = "<tr><td class='behtable_left'>Precondition</td><td class='behtable_middle'>Activity</td><td class='behtable_right'>Postcondition</td></tr>";

	for(var i = 0; i < rows_nr; i++){
		var activityName = behaviourim_data[i] ? behaviourim_data[i].activityName : '';
		var activityVal = behaviourim_data[i] ? behaviourim_data[i].activityVal : 'null';
		var pre = (behaviourim_data[i] && behaviourim_data[i].pre) || '';
		var post = (behaviourim_data[i] && behaviourim_data[i].post) || '';

		rows += "<tr>"+
			"<td class='behtable_left'><div id='prebifts-"+i+"' class='savedbifts'>" + pre + "</div><textarea id='prebifte-"+i+"' class='editablebifts'>" + pre + "</textarea> </td>"+
			"<td class='behtable_middle'>"+( getActivityListNames(i, activityVal, activityName) )+"<div id='selected-activity-"+ i +"' class='selected-activities'>"+activityName+"</div></td>"+
			"<td class='behtable_right'><div id='postbifts-"+i+"' class='savedbifts'>" + post + "</div><textarea id='postbifte-"+i+"' class='editablebifts'>" + post + "</textarea> </td>"+
			"</tr>"
	}

	$("#behaviourinterfacetable").html(rows);
}

function getActivityListNames(key, val, name){
	var list = val && name && val !== 'null'? "<select id='behim-list-"+key+"' class='behim-list'><option value='"+val+"'>" + name + "</option><option value='null'>unselected</option>" : 
			 	 		  "<select id='behim-list-"+key+"' class='behim-list'><option value='null'>unselected</option>";

	for(var i = 0; i < behaviourim_shapes.length; i++){
		if(i.toString() !== val){
			list += "<option value='"+ i +"'>" + (behaviourim_shapes[i].simplename || '~nameless') + "</option>";
		}
	}

	list += "</select>";

	return list;
}

function hideBehimAddButton(){
	if(behim_rows_nr >= behaviourim_shapes.length){
		$("#behaviourinterfacetable_add").css("display", "none");
	}
	else{
		$("#behaviourinterfacetable_add").css("display", "block");
	}
}

function createBehimArray(){
	behaviourim_shapes = [];
	for(var i = 0; i < behaviourm_shapes.length; i++){
		if(behaviourm_shapes[i].imagetype == "ActivityType"){
			behaviourim_shapes.push(behaviourm_shapes[i]);
		}
	}
}

	function editBift(){
		for(var i = 0; i < behaviourim_shapes.length; i++){
				var prevalue = $("#prebifts-"+i).html();
				var postvalue = $("#postbifts-"+i).html();

				$("#prebifte-"+i).val(prevalue);
				$("#postbifte-"+i).val(postvalue);

				$(".editablebifts").css("display","block");
				$(".savedbifts").css("display","none");

				$(".behim-list").css("display","block");
				$(".selected-activities").css("display","none");
		}
		$("#edit_behaviourinterfacetable").val("Save");
	}

	function saveBift(){
		behaviourim_data = [];
		for(var i = 0; i < behaviourim_shapes.length; i++){
				var prevalue = $("#prebifte-"+i).val();
				var postvalue = $("#postbifte-"+i).val();
				var prevaluesArr = (prevalue || "").split("•");
				var postvaluesArr = (postvalue || "").split("•");

				$("#prebifts-"+i).html(prevalue);
				$("#postbifts-"+i).html(postvalue);

				$(".editablebifts").css("display","none");
				$(".savedbifts").css("display","block");
				
				$(".behim-list").css("display","none");
				$(".selected-activities").css("display","block");

				var data = {
					pre: prevalue,
					preArr: prevaluesArr.filter(function(n){ return n != undefined && n.trim() != ""}),
					post: postvalue,
					postArr: postvaluesArr.filter(function(n){ return n != undefined && n.trim() != ""}),
					activityVal: $("#behim-list-"+i).val(),
					activityName: $("#behim-list-"+i).find('option:selected').html(),
					i: i
				}
				behaviourim_data.push(data);			//SAVED DATA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			
		}
		$("#edit_behaviourinterfacetable").val("Edit");
	}
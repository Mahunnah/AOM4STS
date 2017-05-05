	$( document ).ready(function() {
   		$(window).keydown(function(e) {
       			var key = e.which;
       			//alert(key);
			if(key==19){		//pause key
				alert("ID: "+selectedShape.id +"\n"+
				      "ImageType: "+selectedShape.imagetype+
				      "\nType: "+selectedShape.type+
				      "\nName: "+selectedShape.name.attr('text')+
				      "\nDescription: "+selectedShape.description+
				      "\nSimplename: "+selectedShape.simplename+
					"\nconstraints: "+selectedShape.constraints+
					"\nresponsibilities: "+selectedShape.responsibilities+
					"\nroles: "+selectedShape.roles+
					"\nattributes: "+selectedShape.attributes+
					 "\n\nShapes length:"+shapes.length);
			}
			else if(key==27){		//esc key
				closePopUpWindow();
			}
			else if(key==46){		//del key
				deleteElement();
			}
			else if(key==13){		//enter key
				//if($('#save_element_button').is(':visible') && $('#description_input').is(':focusout')){
					//$("#save_element_button").click();
				//}
			}
			else if(key==36){		//home key
				//$("#toolbar").css("display","none");
				alert("cons: "+connections.length+"\nshapes: "+shapes.length +"\n\nSelected Model: "+selectedModel);	
			}			
			else if(key==34){		//pgdown key
			}
   		});
	});
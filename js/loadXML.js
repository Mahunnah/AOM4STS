$(document).ready(function(){
	
	$('#load_model_xml').change(readXML);

	function readXML () {
		var file = $(this)[0].files[0];

		if (!checkForFilereader()) {
			alert('The File APIs are not fully supported by your browser.');
		}
		else if (file.name.endsWith('.xml') && file.type === 'text/xml') {
			var reader = new FileReader();

			reader.onload = function(e) {
			  var text = reader.result;
			  loadXML(text);
			}

			reader.readAsText(file, 'iso-8859-4');
		} else {
			alert('Wrong file uploaded!');
		}
	}

	function checkForFilereader () {
		return (window.File && window.FileReader && window.FileList && window.Blob);
	}
});

function XMLtoJSON (XML) {
	var obj;
	try {
		obj = xml2json(XML).root;
	} catch (e) {
		try {
			console.log('parse XML failed, trying another method');
			obj = $.xml2json(XML);
		} catch (e) {
			alert('Cannot parse XML');
			console.log('Cannot parse XML', e);
		}
	}

	return obj;
}

function loadXML (XML) {
	var xmlobj = XMLtoJSON(XML);
	if (xmlobj) {
	    console.log(xmlobj);

	    var goal_r = getHolderByName("holder");
	    var org_r = getHolderByName("holder4");
		var domain_r = getHolderByName("holder5");
		var agent_r = Raphael("holder6",0,0)
		var acq_r = getHolderByName("holder7");
		var know_r = getHolderByName("holder8");
		var inter_r = getHolderByName("holder9");
		var beh_r = getHolderByName("holder10");
		var r = getHolderByName("holder12");
		goalm_shapes = [];
		orgm_shapes = [];
		domainm_shapes = [];
		agentm_shapes = [];
		acquaintancem_shapes = [];
		knowledgem_shapes = [];
		interactionm_shapes = [];
		behaviourm_shapes = [];
		behaviourim_shapes = [];
		cpnm_shapes = [];

		goalm_connections = [];
		orgm_connections = [];
		domainm_connections = [];
		agentm_connections = [];
		acquaintancem_connections = [];
		knowledgem_connections = [];
		interactionm_connections = [];
		behaviourm_connections = [];
		cpnm_connections = [];

//---------------------------------------------------------------
//------------------------ LOADING ------------------------------
//---------------------------------------------------------------

//GOAL MODEL
		goTo("GoalModel");
		var goalxml = xmlobj.shapes.goalmodel.shape;
		goalxml = Array.isArray(goalxml) ? goalxml : [goalxml];

		if (goalxml && goalxml != []) {
			goalxml.forEach(function(goal) {
				if (goal) {
					var newGoal = goal_r.image("images/"+goal.imagetype+".png", parseInt(goal.x), parseInt(goal.y), parseInt(goal.width), parseInt(goal.height));
					
					newGoal.constraints = symLine(goal.constraints);
					newGoal.description = symLine(goal.description);
					newGoal.generalImagetype = goal.generalImagetype;
					newGoal.id = parseInt(goal.id);
					newGoal.imagetype = goal.imagetype;
					newGoal.simplename = symLine(goal.name);
					newGoal.responsibilities = symLine(goal.responsibilities);

					setShapeLabel(newGoal, symLine(goal.name), getCorrectLabelPosByShapeImagetype(newGoal.id, "GoalModel"));	
					setShapeControls(newGoal);

					goalm_shapes.push(newGoal);
				}
			});
		}

		var goalconxml = xmlobj.connections.goalmodelconnections.connection;
		goalconxml = Array.isArray(goalconxml) ? goalconxml : [goalconxml];

		if (goalconxml) {
			goalconxml.forEach(function(con) {
				if (con) {
					var from = parseInt(con.from);
					var to = parseInt(con.to);
					var fromShape = goalm_shapes.find(function(shape){ return shape.id == from });
					var toShape = goalm_shapes.find(function(shape){ return shape.id == to });;

					var connection = makeConnection(fromShape,toShape, con.contype);
					setConnectionLabel(connection, symLine(con.name));
				}
			});
		}
		
//ORGANIZATON MODEL
		goTo("OrganizationModel");
		var orgxml = xmlobj.shapes.organizationmodel.shape;
		orgxml = Array.isArray(orgxml) ? orgxml : [orgxml];

		if (orgxml) {
			orgxml.forEach(function(org) {
				if (org)  {
					var newOrg = org_r.image("images/"+org.imagetype+".png", parseInt(org.x), parseInt(org.y), parseInt(org.width), parseInt(org.height));
					
					newOrg.constraints = symLine(org.constraints);
					newOrg.description = symLine(org.description);
					newOrg.generalImagetype = org.generalImagetype;
					newOrg.id = parseInt(org.id);
					newOrg.imagetype = org.imagetype;
					newOrg.simplename = symLine(org.name);
					newOrg.responsibilities = symLine(org.responsibilities);

					setShapeLabel(newOrg, symLine(org.name), getCorrectLabelPosByShapeImagetype(newOrg.id, "OrganizationModel"));	
					setShapeControls(newOrg);

					orgm_shapes.push(newOrg);
				}	
			});
		}

		var orgconxml = xmlobj.connections.organizationmodelconnections.connection;
		orgconxml = Array.isArray(orgconxml) ? orgconxml : [orgconxml];

		if (orgconxml) {
			orgconxml.forEach(function(con) {
				if (con) {
					var from = parseInt(con.from);
					var to = parseInt(con.to);
					var fromShape = orgm_shapes.find(function(shape){ return shape.id == from });
					var toShape = orgm_shapes.find(function(shape){ return shape.id == to });;

					var connection = makeConnection(fromShape,toShape, con.contype);
					setConnectionLabel(connection, symLine(con.name));
				}
			});
		}

//DOMAIN MODEL
		goTo("DomainModel");
		var domainxml = xmlobj.shapes.domainmodel.shape;
		domainxml = Array.isArray(domainxml) ? domainxml : [domainxml];

		if (domainxml) { 
			domainxml.forEach(function(dom) {
				if (dom) { 
					var newDom = domain_r.image("images/"+dom.imagetype+".png", parseInt(dom.x), parseInt(dom.y), parseInt(dom.width), parseInt(dom.height));

					newDom.constraints = symLine(dom.constraints);
					newDom.description = symLine(dom.description);
					newDom.generalImagetype = dom.generalImagetype;
					newDom.id = parseInt(dom.id);
					newDom.imagetype = dom.imagetype;
					newDom.simplename = symLine(dom.name);
					newDom.responsibilities = symLine(dom.responsibilities);

					setShapeLabel(newDom, symLine(dom.name), getCorrectLabelPosByShapeImagetype(newDom.id, "DomainModel"));	
					setShapeControls(newDom);

					domainm_shapes.push(newDom);
				}
			});
		}

		var domainconxml = xmlobj.connections.domainmodelconnections.connection;
		domainconxml = Array.isArray(domainconxml) ? domainconxml : [domainconxml];

		if (domainconxml) {
			domainconxml.forEach(function(con) {
				if (con) {
					var from = parseInt(con.from);
					var to = parseInt(con.to);
					var fromShape = domainm_shapes.find(function(shape){ return shape.id == from });
					var toShape = domainm_shapes.find(function(shape){ return shape.id == to });;

					var connection = makeConnection(fromShape,toShape, con.contype);
					setConnectionLabel(connection, symLine(con.name));
				}
			});
		}

//AGENT MODEL
		goTo("AgentModel");
		var agentxml = xmlobj.shapes.agentmodel.shape;
		agentxml = Array.isArray(agentxml) ? agentxml : [agentxml];

		if (agentxml) {
			agentxml.forEach(function(a) {
				if (a) {
					var newA = agent_r.image("images/"+a.imagetype+".png", 0,0,0,0);
					newA.id = parseInt(a.id);
					newA.description = symLine(a.description);
					newA.imagetype = symLine(a.imagetype);
					newA.responsibilitiesID = symLine(a.responsibilitiesID);
					newA.roles = symLine(a.roles);
					newA.simplename = symLine(a.name);
					setShapeLabel(newA, a.name);

					agentm_shapes.push(newA);
				}	
			});
		}

//ACQUAINTANCE MODEL
		goTo("AcquaintanceModel");
		var acqxml = xmlobj.shapes.acquaintancemodel.shape;
		acqxml = Array.isArray(acqxml) ? acqxml : [acqxml];

		if (acqxml) { 
			acqxml.forEach(function(a) {
				if (a && a.imagetype === 'Agent') {
					var newAc = acq_r.image("images/"+a.imagetype+".png", parseInt(a.x), parseInt(a.y), parseInt(a.width), parseInt(a.height));

					newAc.constraints = symLine(a.constraints);
					newAc.description = symLine(a.description);
					newAc.generalImagetype = a.generalImagetype;
					newAc.id = parseInt(a.id);
					newAc.imagetype = a.imagetype;
					newAc.simplename = symLine(a.name);
					newAc.responsibilities = symLine(a.responsibilities);
					newAc.roles = symLine(a.roles);
			
					setShapeLabel(newAc, symLine(a.name), getCorrectLabelPosByShapeImagetype(newAc.id, "AcquaintanceModel"));	
					setShapeControls(newAc);

					acquaintancem_shapes.push(newAc);
				}
			});
		}

		goTo("AcquaintanceModel");
		acquaintancem_shapes.forEach(function(xr) {
			if (acqxml) {
				acqxml.forEach(function(a) {
					if (a && xr.imagetype == 'Role' && xr.id == a.id) {
						xr.attr({x: parseInt(a.x), y:parseInt(a.y)});
					} 
				});
			}
		});
		fixConnectionAndLabelPositions();

		var acquaintanceconxml = xmlobj.connections.acquaintancemodelconnections.connection;
		acquaintanceconxml = Array.isArray(acquaintanceconxml) ? acquaintanceconxml : [acquaintanceconxml];

		if (acquaintanceconxml) {
			acquaintanceconxml.forEach(function(con) {
				if (con) { 
					var from = con.from;
					var to = con.to;
					var fromShape = acquaintancem_shapes.find(function(shape){ return shape.id == from });
					var toShape = acquaintancem_shapes.find(function(shape){ return shape.id == to });;

					var connection = makeConnection(fromShape,toShape, con.contype);
					setConnectionLabel(connection, symLine(con.name));
				}
			});
		}


// Knowledge model
		goTo("KnowledgeModel");
		var knoxml = xmlobj.shapes.knowledgemodel.shape;
		knoxml = Array.isArray(knoxml) ? knoxml : [knoxml];

		if (knoxml) {
			knoxml.forEach(function(k) {
				if (k) {
					if(k.imagetype=="Agent"){
						var newK = know_r.image("images/resource.png", parseInt(k.x), parseInt(k.y), parseInt(k.width), parseInt(k.height));
					} else {
						var newK = know_r.image("images/resource2.png", parseInt(k.x), parseInt(k.y), parseInt(k.width), parseInt(k.height));
					}
					newK.id = k.id;
					newK.imagetype = k.imagetype;
					newK.generalImagetype = k.generalImagetype;
					newK.simplename = k.name;	
					newK.description = k.description;
					newK.attributes = k.attributes;
					newK.methods = k.methods;
					newK.roles = k.roles;

					setShapeLabel(newK, symLine(k.name), getCorrectLabelPosByShapeImagetype(newK.id, "KnowledgeModel"));	
					setShapeControls(newK);

					knowledgem_shapes.push(newK);
				}
			});
		}
		goTo("KnowledgeModel");
		var knoconxml = xmlobj.connections.knowledgemodelconnections.connection;
		knoconxml = Array.isArray(knoconxml) ? knoconxml : [knoconxml];

		if (knoconxml) {
			knoconxml.forEach(function(con) {
				if (con) {
					var from = parseInt(con.from);
					var to = parseInt(con.to);
					var fromShape = knowledgem_shapes.find(function(shape){ return shape.id == from });
					var toShape = knowledgem_shapes.find(function(shape){ return shape.id == to });;

					var connection = makeConnection(fromShape,toShape, con.contype);
					setConnectionLabel(connection, symLine(con.name));
				}
			});
		}

// Interaction model
		goTo("InteractionModel");
		var imxml = xmlobj.shapes.interactionmodel.shape;
		imxml = Array.isArray(imxml) ? imxml : [imxml];

		if (imxml) {
			imxml.forEach(function(i) {
				if (i) {
					var newI = inter_r.image("images/Agent_Interaction.png", parseInt(i.x), parseInt(i.y), parseInt(i.width), parseInt(i.height));
					newI.id = i.id;
					newI.imagetype = i.imagetype;
					newI.generalImagetype = i.generalImagetype;
					newI.simplename = i.name;
					newI.description = i.description;
					newI.attributes = i.attributes;
					newI.roles = i.roles;

					setShapeLabel(newI, symLine(i.name), getCorrectLabelPosByShapeImagetype(newI.id, "InteractionModel"));	
					setShapeControls(newI);

					interactionm_shapes.push(newI);
				}
			});
		}
			
		goTo("InteractionModel");
		var inconxml = xmlobj.connections.interactionmodelconnections.connection;
		inconxml = Array.isArray(inconxml) ? inconxml : [inconxml];

		if (inconxml) {
			inconxml.forEach(function(con) {
				if (con) {
					var from = parseInt(con.from);
					var to = parseInt(con.to);
					var fromShape = interactionm_shapes.find(function(shape){ return shape.id == from });
					var toShape = interactionm_shapes.find(function(shape){ return shape.id == to });;

					var connection = makeConnection(fromShape,toShape, con.contype);
					setConnectionLabel(connection, symLine(con.name));
				}
			});
		}
			
//Behaviour model

		goTo("BehaviourModel");			
		var behxml = xmlobj.shapes.behaviourmodel.shape;
		behxml = Array.isArray(behxml) ? behxml : [behxml];

		if (behxml) {
			behxml.forEach(function(b) {
				if (b) {
					if (b.imagetype === 'Agent') {
						var newB = beh_r.image("images/Agent_Interaction.png", parseInt(b.x), parseInt(b.y), parseInt(b.width), parseInt(b.height));
					
						setShapeLabel(newB, symLine(b.name), getCorrectLabelPosByShapeImagetype(newB.id, "BehaviourModel"));

						if(newB.name.getBBox().width > newB.getBBox().width * 7/10) {
							newB.attr("width", newB.name.getBBox().width + shapes[newShapePosition].name.getBBox().width*4/10)
						}

						newB.header = r.rect(newB.name.getBBox().x + 1,
												newB.name.getBBox().y,
												newB.getBBox().width * 7/10,
												newB.name.getBBox().height);		
						newB.node.setAttribute("typeof", "agent");
						newB.node.setAttribute("agentid", b.id);
					} else {
						var newB = beh_r.image("images/" + b.imagetype.toLowerCase() + ".png", parseInt(b.x), parseInt(b.y), parseInt(b.width), parseInt(b.height));
						setShapeLabel(newB, symLine(b.name), getCorrectLabelPosByShapeImagetype(newB.id, "BehaviourModel"));		
					}
					
					newB.id = b.id;
					newB.imagetype = b.imagetype;
					newB.generalImagetype = b.generalImagetype;
					newB.simplename = b.name;
					newB.description = b.description;
					newB.attributes = b.attributes;
					newB.roles = b.roles;

					setShapeControls(newB);

					behaviourm_shapes.push(newB);
				}
			});
		}	

		goTo("BehaviourModel");	
		var behconxml = xmlobj.connections.behaviourmodelconnections.connection;
		behconxml = Array.isArray(behconxml) ? behconxml : [behconxml];

		if (behconxml) {
			behconxml.forEach(function(con) {
				if (con) {
					var from = parseInt(con.from);
					var to = parseInt(con.to);
					var fromShape = behaviourm_shapes.find(function(shape){ return shape.id == from });
					var toShape = behaviourm_shapes.find(function(shape){ return shape.id == to });;

					var connection = makeConnection(fromShape,toShape, con.contype);
					setConnectionLabel(connection, symLine(con.name));
				}
			});
		}
			
			
			
			

		//Switch to first model
		goTo("GoalModel");
	}
}

function symLine (val) {
	return val
		.replace(/({!n!})/gim, '\n')
		.replace(/({!b!})/gim, '•')
}
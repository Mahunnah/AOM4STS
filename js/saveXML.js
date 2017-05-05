//=============================================================================================================================
//========================================= GENERATING CPN FILE ===============================================================
//=============================================================================================================================

var randomXMLIDs = [];
$( document ).ready(function() {
		$('#save_model').click(function(){
			var XML = generateXML();

			//write XML
			writeXML($('#model_name').val(), XML);

			//add link to page
			cpn_url = location.href.match(/^(http.+\/)[^\/]+$/ )[1]+"/savefiles/"+$('#model_name').val()+".cpn";
    		say('<a href="'+cpn_url+'">CPN file</a> created');
  
		});
});

	//add link to page:
	function addCPNlinkToPage(){
		cpn_url = location.href.match(/^(http.+\/)[^\/]+$/ )[1]+"/savefiles/"+$('#model_name').val()+".cpn";

		$.get(cpn_url).done(function() { 
        		say('<a href="'+cpn_url+'">CPN file</a> created');
    		}).fail(function() { 
        		say('CPN file does not exist!');
    		});		
	}

	//GENERATED XML IS HERE:
	function generateXML() {
		var XML = 

			'<?xml version="1.0" encoding="iso-8859-1"?>\n'+
			'<!DOCTYPE workspaceElements PUBLIC "-//CPN//DTD CPNXML 1.0//EN" "http://cpntools.org/DTD/6/cpn.dtd">\n'+

			'<workspaceElements>\n'+
			'<generator tool="CPN Tools" version="4.0.0" format="6"/>\n'+
			'  <cpnet>\n'+
			'    <globbox>\n'+
			'      <block id="ID1412310166">\n'+
			'        <id>Standard priorities</id>\n'+
			'        <ml id="ID1412310255">val P_HIGH = 100;\n'+
			'          <layout>val P_HIGH = 100;</layout>\n'+
			'        </ml>\n'+
			'        <ml id="ID1412310292">val P_NORMAL = 1000;\n'+
			'          <layout>val P_NORMAL = 1000;</layout>\n'+
			'        </ml>\n'+
			'        <ml id="ID1412310322">val P_LOW = 10000;\n'+
			'          <layout>val P_LOW = 10000;</layout>\n'+
			'        </ml>\n'+
			'      </block>\n'+
			'      <block id="ID1">\n'+
			'        <id>Standard declarations</id>\n'+
			'        <color id="ID85042">\n'+
			'          <id>UNIT</id>\n'+
			'          <unit/>\n'+
			'          <layout>colset UNIT = unit;</layout>\n'+
			'        </color>\n'+
			'        <color id="ID4">\n'+
			'          <id>BOOL</id>\n'+
			'          <bool/>\n'+
			'        </color>\n'+
			'        <color id="ID3">\n'+
			'          <id>INT</id>\n'+
			'          <int/>\n'+
			'        </color>\n'+
			'        <color id="ID1412312409">\n'+
			'          <id>INTINF</id>\n'+
			'          <intinf/>\n'+
			'          <layout>colset INTINF = intinf;</layout>\n'+
			'        </color>\n'+
			'        <color id="ID1412312425">\n'+
			'          <id>TIME</id>\n'+
			'          <time/>\n'+
			'          <layout>colset TIME = time;</layout>\n'+
			'        </color>\n'+
			'        <color id="ID1412322990">\n'+
			'          <id>REAL</id>\n'+
			'          <real/>\n'+
			'          <layout>colset REAL = real;</layout>\n'+
			'        </color>\n'+
			'        <color id="ID5">\n'+
			'          <id>STRING</id>\n'+
			'          <string/>\n'+
			'        </color>\n'+
			getDataTypes() + '\n'+
			getVars()  + '\n'+
			'	   </block>\n'+
    		'	 </globbox>\n'+
    		'	 <page id="ID6">\n'+
			'	   <pageattr name="Generated CPN"/>\n'+
			getConditions() + '\n'+
			getActivities() + '\n'+
			getArcs() + '\n'+
			'       <constraints/>\n'+
			'    </page>\n'+
			'    <instances>\n'+
			'      <instance id="ID2149" page="ID6"/>\n'+
			'    </instances>\n'+
			'    <options>\n'+
			'      <option name="realtimestamp">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="fair_be">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="global_fairness">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="outputdirectory">\n'+
			'        <value>\n'+
			'          <text>&lt;same as model&gt;</text>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="extensions.10008.enable">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="extensions.10005.enable">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="extensions.10001.enable">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="extensions.10007.enable">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="extensions.10004.enable">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="extensions.10003.enable">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="extensions.10006.enable">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="extensions.10002.enable">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="extensions.10007.options.discover">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repavg">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repciavg">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repcount">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repfirstval">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="replastval">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repmax">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repmin">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repssquare">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repssqdev">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repstddev">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repsum">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="repvariance">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="avg">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="ciavg">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="count">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="firstval">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="lastval">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="max">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="min">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="ssquare">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="ssqdev">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="stddev">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="sum">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="variance">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="firstupdate">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="interval">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="lastupdate">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedavg">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedciavg">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedcount">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedfirstval">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedlastval">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedmax">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedmin">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedssquare">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedssqdev">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedstddev">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedsum">\n'+
			'        <value>\n'+
			'          <boolean>true</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'      <option name="untimedvariance">\n'+
			'        <value>\n'+
			'          <boolean>false</boolean>\n'+
			'        </value>\n'+
			'      </option>\n'+
			'    </options>\n'+
			'   <binders>\n'+
			'     <cpnbinder id="ID2222" \n'+
			'				 x="363" \n'+
			'				 y="139" \n'+
			'				 width="600" \n'+
            '				 height="400">\n'+
			'        <sheets>\n'+
			'          <cpnsheet id="ID2215"\n'+
			'                    panx="-6.000000"\n'+
			'                    pany="-5.000000"\n'+
			'                    zoom="1.000000"\n'+
			'                    instance="ID2149">\n'+
			'            <zorder>\n'+
			'              <position value="0"/>\n'+
			'            </zorder>\n'+
			'          </cpnsheet>\n'+
			'        </sheets>\n'+
			'        <zorder>\n'+
			'          <position value="0"/>\n'+
			'        </zorder>\n'+
			'      </cpnbinder>\n'+
			'    </binders>\n'+
			'    <monitorblock name="Monitors"/>\n'+
			'    <IndexNode expanded="true">\n'+
			'      <IndexNode expanded="false"/>\n'+
			'      <IndexNode expanded="false"/>\n'+
			'      <IndexNode expanded="false">\n'+
			'        <IndexNode expanded="false"/>\n'+
			'        <IndexNode expanded="false"/>\n'+
			'        <IndexNode expanded="false"/>\n'+
			'        <IndexNode expanded="false"/>\n'+
			'        <IndexNode expanded="false">\n'+
			'          <IndexNode expanded="false">\n'+
			'            <IndexNode expanded="false">\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'            </IndexNode>\n'+
			'            <IndexNode expanded="false">\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'              <IndexNode expanded="false"/>\n'+
			'            </IndexNode>\n'+
			'          </IndexNode>\n'+
			'          <IndexNode expanded="false">\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'            <IndexNode expanded="false"/>\n'+
			'          </IndexNode>\n'+
			'        </IndexNode>\n'+
			'        <IndexNode expanded="false">\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'        </IndexNode>\n'+
			'        <IndexNode expanded="false">\n'+
			'          <IndexNode expanded="false"/>\n'+
			'        </IndexNode>\n'+
			'      </IndexNode>\n'+
			'      <IndexNode expanded="false"/>\n'+
			'      <IndexNode expanded="false">\n'+
			'        <IndexNode expanded="false">\n'+
			'          <IndexNode expanded="true"/>\n'+
			'          <IndexNode expanded="true"/>\n'+
			'          <IndexNode expanded="true"/>\n'+
			'        </IndexNode>\n'+
			'        <IndexNode expanded="true">\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'          <IndexNode expanded="false"/>\n'+
			'        </IndexNode>\n'+
			'      </IndexNode>\n'+
			'      <IndexNode expanded="false"/>\n'+
			'      <IndexNode expanded="true"/>\n'+
			'    </IndexNode>\n'+
			'  </cpnet>\n'+
			'</workspaceElements>';



			return XML;
	}

	function getRandomXMLID(){
		var idnum = 'ID';

		for (var i = 0; i < 10; i++) {
			idnum += randomNumber(0,9).toString();
		}

		if (randomXMLIDs.indexOf(idnum) == -1) {
			randomXMLIDs.push(idnum);
		} else {
			idnum = getRandomXMLID();
		}

		return idnum; 
	}

	function getDataTypes(){
		var dataTypeXML = "";

		for (var i = 0; i < cpnm_shapes.length; i++) {
			if (cpnm_shapes[i].conditionType === "post") {
				var datatype = (cpnm_shapes[i] && cpnm_shapes[i].variable && cpnm_shapes[i].variable.attrs && cpnm_shapes[i].variable.attrs.text) || "UNNAMED";
				var productsArray = datatype.split("x");
				var productVar = productsArray.join("*");
				var products = "";

				for (var p = 0; p < productsArray.length; p++) {
					products += "<id>" + productsArray[p] + "</id>\n";
				}

				dataTypeXML += 

				'<color id="'+ getRandomXMLID() +'">\n'+
		        '  <id>'+ datatype +'</id>\n'+
		        '  <product>\n'+
		      		products + 
		        '  </product>\n'+
		        '  <layout>colset ' + datatype + '=product ' + productVar + ';</layout>\n'+
		        '</color>';
			}
		}

		return dataTypeXML;
	}

	function getVars(){
		var varsXML = '';
		var defaultDataType = '';
		var defaultVarName = 'undefined';

		for(var i = 0; i < cpnm_connections.length; i++) {
			if(cpnm_connections[i].from && cpnm_connections[i].from.conditionType === 'pre') {
				varsXML += 	
					'<var id="'+ getRandomXMLID() +'">\n'+
			          '<type>\n'+
			          '  <id>' + ((cpnm_connections[i].from.variable && cpnm_connections[i].from.variable.attrs && cpnm_connections[i].from.variable.attrs.text) || defaultDataType) + '</id>\n'+
			          '</type>\n'+
			          '<id>' + ((cpnm_connections[i].name && cpnm_connections[i].name.attrs && cpnm_connections[i].name.attrs.text) || defaultVarName ) + '</id>\n'+
			          '<layout>var ' + ((cpnm_connections[i].name && cpnm_connections[i].name.attrs && cpnm_connections[i].name.attrs.text) || defaultVarName ) + ' : ' + ((cpnm_connections[i].from.variable && cpnm_connections[i].from.variable.attrs && cpnm_connections[i].from.variable.attrs.text) || defaultDataType) + ';</layout>\n'+
			        '</var>';
			}
	   	}

	   	return varsXML;
	}

	function getConditions(){
		var centerX = $('#'+r.name).width()/2;
		var centerY = $('#'+r.name).height()/2;
		//var newX = cpnm_shapes[i].attr('x') - centerX;

		var conditionsXML = '';
		var z = 0;
		for (var i = 0; i < cpnm_shapes.length; i++) {
			if (cpnm_shapes[i].imagetype.toLowerCase() === "condition") {
				var datatype = (cpnm_shapes[i] && cpnm_shapes[i].variable && cpnm_shapes[i].variable.attrs && cpnm_shapes[i].variable.attrs.text) || '';
				var xmlid = getRandomXMLID();
				cpnm_shapes[i].XMLID = xmlid;

				conditionsXML += 
				'<place id="'+ xmlid +'">\n'+
				'	<posattr x="' + (cpnm_shapes[i].attr('x') - centerX) + '" y="' + (centerY - cpnm_shapes[i].attr('y')) + '"/>\n'+
				'  <text>' + cpnm_shapes[i].simpleName + '</text>\n'+
				'  <ellipse w="' + cpnm_shapes[i].attr('width') + '" h="' + cpnm_shapes[i].attr('height') + '"/>\n'+
				'  <token x="' + (-1 * cpnm_shapes[i].attr('width')) + '" y="' + (cpnm_shapes[i].attr('height')/2) + '"/>\n'+
				'  <marking x="0.000000" y="0.000000" hidden="false">\n'+
				'    <snap snap_id="0" anchor.horizontal="0" anchor.vertical="0"/>\n'+
				'  </marking>\n'+
				'  <type id="'+ getRandomXMLID() +'">\n'+
				'    <posattr x="' + (cpnm_shapes[i].attr('x') - centerX + cpnm_shapes[i].attr('width')/2) + '" y="' + (centerY - cpnm_shapes[i].attr('y') - cpnm_shapes[i].attr('height')/2) + '"/>\n'+
				'    <text tool="CPN Tools" version="4.0.0">' + datatype + '</text>\n'+
				'  </type>\n'+
				'</place>';
			}
    	}

	    return conditionsXML;
	}

	function getActivities() {
		var centerX = $('#'+r.name).width()/2;
		var centerY = $('#'+r.name).height()/2;
		var activitiesXML = '';

		for (var i = 0; i < cpnm_shapes.length; i++) {
			if (cpnm_shapes[i].imagetype.toLowerCase() === "activity") {
				var xmlid = getRandomXMLID();
				cpnm_shapes[i].XMLID = xmlid;

				activitiesXML += 
			      '<trans id="'+ xmlid +'" explicit="false">\n'+
			      '  <posattr x="' + (cpnm_shapes[i].attr('x') - centerX) + '" y="' + (centerY - cpnm_shapes[i].attr('y')) + '"/>\n'+
			      '  <text>' + cpnm_shapes[i].simpleName + '</text>\n'+
			      '  <box w="' + cpnm_shapes[i].attr('width') + '" h="' + cpnm_shapes[i].attr('height') + '"/>\n'+
			      '</trans>';
			}
		}

		return activitiesXML;
	}

	function getArcs() {
		var centerX = $('#'+r.name).width()/2;
		var centerY = $('#'+r.name).height()/2;

	    var arcsXML = '';

	    for(var i = 0; i < cpnm_connections.length; i++) {
	    	var activityXMLID = null;
	    	var orientation = null;
	    	var conditionXMLID = null;
	    	var varPosX = null;
	    	var vasPosY = null;

	    	if (cpnm_connections[i].from.imagetype.toLowerCase() === "activity") {
	    		activityXMLID = cpnm_connections[i].from.XMLID;
	    		orientation = 'TtoP'
	    		conditionXMLID = cpnm_connections[i].to.XMLID;
	    	} else if (cpnm_connections[i].to.imagetype.toLowerCase() === "activity") {
	    		activityXMLID = cpnm_connections[i].to.XMLID;
	    		orientation = 'PtoT'
	    		conditionXMLID = cpnm_connections[i].from.XMLID;
	    	}

	    	var varPosX = (Math.abs((cpnm_connections[i].from.attr('x') + cpnm_connections[i].from.attr('width')/2) + (cpnm_connections[i].to.attr('x') + cpnm_connections[i].to.attr('width')/2))/2) - centerX;
	    	var varPosY = centerY - (Math.abs((cpnm_connections[i].from.attr('y') + cpnm_connections[i].from.attr('height')/2) + (cpnm_connections[i].to.attr('y') + cpnm_connections[i].to.attr('height')/2))/2);

	    	if (activityXMLID && orientation && conditionXMLID) {
			    arcsXML += 
			        '<arc id="'+ getRandomXMLID() +'" orientation="' + orientation + '" order="1">\n'+
			        '  <posattr x="0.000000" y="0.000000"/>\n'+
			        '  <arrowattr headsize="1.200000" currentcyckle="2"/>\n'+
			        '  <transend idref="' + activityXMLID + '"/>\n'+
			        '  <placeend idref="' + conditionXMLID + '"/>\n'+
			        '  <annot id="'+ getRandomXMLID() +'">\n'+
			        '    <posattr x="' + varPosX + '" y="' + varPosY + '"/>\n'+
			        '    <text tool="CPN Tools" version="4.0.0">' + ((cpnm_connections[i].name && cpnm_connections[i].name.attr("text")) || '') + '</text>\n'+
			        '  </annot>\n'+
			        '</arc>';
		    }
	    }

			return arcsXML;
	}

	function promptSaveXML() {
		var XML = generateXML();

		var blob = new Blob([XML], {
	    	type: 'text/plain;charset=ISO-8859-1', 
  			encoding: "ISO-8859-1"
		});
		saveAs(blob, "generated.cpn");
	}


//=============================================================================================================================
//========================================= SAVING MODELS AS XML ==============================================================
//=============================================================================================================================

$( document ).ready(function() {
	$('#save_model_xml').click(function(){
		var modelsXML = generateModelsXML();

		var blob = new Blob([modelsXML], {
	    	type: 'text/plain;charset=ISO-8859-1', 
  			encoding: "ISO-8859-1"
		});
		saveAs(blob, "models.xml");
	});
});

function generateModelsXML() {
	var modelsXML = 
	'<?xml version="1.0" encoding="UTF-8"?>\n' +
	'<root>\n'+
	'<shapes>\n'+
		generate_goalm_shapes_XML() +
		generate_orgm_shapes_XML() +
		generate_domainm_shapes_XML() +
		generate_agentm_shapes_XML() + 
		generate_acquaintancem_shapes_XML() +
		generate_knowledgem_shapes_XML() +
		generate_interactionm_shapes_XML() +
		generate_behaviourm_shapes_XML() +
		generate_behaviourim_shapes_XML() +
		generate_cpnm_shapes_XML() +
	'</shapes>\n'+
	'<connections>\n'+
		generate_goalm_connections_XML() +
		generate_orgm_connections_XML() +
		generate_domainm_connections_XML() +
		generate_acqm_connections_XML() +
		generate_knowledgem_connections_XML() +
		generate_interactionm_connections_XML() +
		generate_behaviourm_connections_XML() +
		generate_cpnm_connections_XML() +
	'</connections>\n' +
	'</root>';

	return modelsXML;
}

//Shapes
function generate_goalm_shapes_XML() {
	var goalmXML = '<goalmodel>\n';
	goalm_shapes.forEach(function(goalshape){
		var bbox = goalshape.getBBox();

		goalmXML +=
		'<shape>\n'+
			'<id>' + cleanValue(goalshape.id) + '</id>\n'+
			'<x>' + cleanValue(bbox.x) + '</x>\n'+
			'<y>' + cleanValue(bbox.y) + '</y>\n'+
			'<width>' + cleanValue(bbox.width) + '</width>\n'+
			'<height>' + cleanValue(bbox.height) + '</height>\n'+
			'<imagetype>' + cleanValue(goalshape.imagetype) + '</imagetype>\n'+
			'<generalImagetype>' + cleanValue(goalshape.generalImagetype) + '</generalImagetype>\n'+
			'<name>' + cleanValue(goalshape.name.attr('text')) + '</name>\n'+
			'<description>' + cleanValue(goalshape.description) + '</description>\n'+
			'<constraints>' + cleanValue(goalshape.constraints) + '</constraints>\n'+
			'<responsibilities>' + cleanValue(goalshape.responsibilities) + '</responsibilities>\n'+
		 '</shape>\n';
	});
	goalmXML += '</goalmodel>\n';

	return goalmXML;
}

function generate_orgm_shapes_XML() {
	var orgmXML = '<organizationmodel>\n';
	orgm_shapes.forEach(function(orgshape){
		var bbox = orgshape.getBBox();

		orgmXML +=
		'<shape>\n'+
			'<id>' + cleanValue(orgshape.id) + '</id>\n'+
			'<x>' + cleanValue(bbox.x) + '</x>\n'+
			'<y>' + cleanValue(bbox.y) + '</y>\n'+
			'<width>' + cleanValue(bbox.width) + '</width>\n'+
			'<height>' + cleanValue(bbox.height) + '</height>\n'+
			'<imagetype>' + cleanValue(orgshape.imagetype) + '</imagetype>\n'+
			'<generalImagetype>' + cleanValue(orgshape.generalImagetype) + '</generalImagetype>\n'+
			'<name>' + cleanValue(orgshape.name.attr('text')) + '</name>\n'+
			'<description>' + cleanValue(orgshape.description) + '</description>\n'+
			'<constraints>' + cleanValue(orgshape.constraints) + '</constraints>\n'+
			'<responsibilities>' + cleanValue(orgshape.responsibilities) + '</responsibilities>\n'+
		'</shape>\n';
	});
	orgmXML += '</organizationmodel>\n';

	return orgmXML;
}

function generate_domainm_shapes_XML() {
	var domainmXML = '<domainmodel>\n';
	domainm_shapes.forEach(function(domainshape){
		var bbox = domainshape.getBBox();

		domainmXML +=
		'<shape>\n'+
			'<id>' + cleanValue(domainshape.id) + '</id>\n'+
			'<x>' + cleanValue(bbox.x) + '</x>\n'+
			'<y>' + cleanValue(bbox.y) + '</y>\n'+
			'<width>' + cleanValue(bbox.width) + '</width>\n'+
			'<height>' + cleanValue(bbox.height) + '</height>\n'+
			'<imagetype>' + cleanValue(domainshape.imagetype) + '</imagetype>\n'+
			'<generalImagetype>' + cleanValue(domainshape.generalImagetype) + '</generalImagetype>\n'+
			'<name>' + cleanValue(domainshape.name.attr('text')) + '</name>\n'+
			'<description>' + cleanValue(domainshape.description) + '</description>\n'+
			'<constraints>' + cleanValue(domainshape.constraints) + '</constraints>\n'+
			'<responsibilities>' + cleanValue(domainshape.responsibilities) + '</responsibilities>\n'+
		'</shape>\n';
	});
	domainmXML += '</domainmodel>\n';

	return domainmXML;
}

function generate_agentm_shapes_XML() {
	var agentXML = '<agentmodel>\n';
	agentm_shapes.forEach(function(agentshape) {
		agentXML += 
		'<shape>\n'+
			'<id>' + cleanValue(agentshape.id) + '</id>\n'+
			'<imagetype>' + cleanValue(agentshape.imagetype) + '</imagetype>\n'+
			'<name>' + cleanValue(agentshape.name.attr('text')) + '</name>\n'+
			'<description>' + cleanValue(agentshape.description) + '</description>\n'+
			'<roles>' + cleanValue(agentshape.roles) + '</roles>\n'+
			'<responsibilitiesID>' + cleanValue(agentshape.responsibilitiesID) + '</responsibilitiesID>\n'+
		'</shape>\n';
	});
	agentXML += '</agentmodel>\n';

	return agentXML;
}

function generate_acquaintancem_shapes_XML() {
	var acqXML = '<acquaintancemodel>\n';
	acquaintancem_shapes.forEach(function(shape) {
		var bbox = shape.getBBox();

		acqXML +=
		'<shape>\n'+
			'<id>' + cleanValue(shape.id) + '</id>\n'+
			'<x>' + cleanValue(bbox.x) + '</x>\n'+
			'<y>' + cleanValue(bbox.y) + '</y>\n'+
			'<width>' + cleanValue(bbox.width) + '</width>\n'+
			'<height>' + cleanValue(bbox.height) + '</height>\n'+
			'<imagetype>' + cleanValue(shape.imagetype) + '</imagetype>\n'+
			'<generalImagetype>' + cleanValue(shape.generalImagetype) + '</generalImagetype>\n'+
			'<name>' + cleanValue(shape.name.attr('text')) + '</name>\n'+
			'<description>' + cleanValue(shape.description) + '</description>\n'+
			'<constraints>' + cleanValue(shape.constraints) + '</constraints>\n'+
			'<responsibilities>' + cleanValue(shape.responsibilities) + '</responsibilities>\n'+
			'<roles>' + cleanValue(shape.roles) + '</roles>\n'+
		'</shape>\n';
	});
	acqXML += '</acquaintancemodel>\n';

	return acqXML;
}

function generate_knowledgem_shapes_XML() {
	var knowledgeXML = '<knowledgemodel>\n';
	knowledgem_shapes.forEach(function(shape) {
		var bbox = shape.getBBox();

		knowledgeXML +=
		'<shape>\n'+
			'<id>' + cleanValue(shape.id) + '</id>\n'+
			'<x>' + cleanValue(bbox.x) + '</x>\n'+
			'<y>' + cleanValue(bbox.y) + '</y>\n'+
			'<width>' + cleanValue(bbox.width) + '</width>\n'+
			'<height>' + cleanValue(bbox.height) + '</height>\n'+
			'<imagetype>' + cleanValue(shape.imagetype) + '</imagetype>\n'+
			'<generalImagetype>' + cleanValue(shape.generalImagetype) + '</generalImagetype>\n'+
			'<name>' + cleanValue((shape.simplename || '~nameless')) + '</name>\n'+
			'<description>' + cleanValue(shape.description) + '</description>\n'+
			'<attributes>' + cleanValue(shape.attributes) + '</attributes>\n'+
			'<methods>' + cleanValue(shape.methods) + '</methods>\n'+
			'<roles>' + cleanValue(shape.roles) + '</roles>\n'+
		'</shape>\n';
	});
	knowledgeXML += '</knowledgemodel>\n';

	return knowledgeXML;
}

function generate_interactionm_shapes_XML() {
	var interactionXML = '<interactionmodel>\n';
	interactionm_shapes.forEach(function(shape) {
		var bbox = shape.getBBox();

		interactionXML +=
		'<shape>\n'+
			'<id>' + cleanValue(shape.id) + '</id>\n'+
			'<x>' + cleanValue(bbox.x) + '</x>\n'+
			'<y>' + cleanValue(bbox.y) + '</y>\n'+
			'<width>' + cleanValue(bbox.width) + '</width>\n'+
			'<height>' + cleanValue(bbox.height) + '</height>\n'+
			'<imagetype>' + cleanValue(shape.imagetype) + '</imagetype>\n'+
			'<generalImagetype>' + cleanValue(shape.generalImagetype) + '</generalImagetype>\n'+
			'<name>' + cleanValue(shape.name.attr('text')) + '</name>\n'+
			'<description>' + cleanValue(shape.description) + '</description>\n'+
			'<attributes>' + cleanValue(shape.attributes) + '</attributes>\n'+
			'<roles>' + cleanValue(shape.roles) + '</roles>\n'+
		'</shape>\n';
	});
	interactionXML += '</interactionmodel>\n';

	return interactionXML;
}

function generate_behaviourm_shapes_XML() {
	var behaviourXML = '<behaviourmodel>\n';
	behaviourm_shapes.forEach(function(shape) {
		var bbox = shape.getBBox();

		behaviourXML +=
		'<shape>\n'+
			'<id>' + cleanValue(shape.id) + '</id>\n'+
			'<x>' + cleanValue(bbox.x) + '</x>\n'+
			'<y>' + cleanValue(bbox.y) + '</y>\n'+
			'<width>' + cleanValue(bbox.width) + '</width>\n'+
			'<height>' + cleanValue(bbox.height) + '</height>\n'+
			'<imagetype>' + cleanValue(shape.imagetype) + '</imagetype>\n'+
			'<generalImagetype>' + cleanValue(shape.generalImagetype) + '</generalImagetype>\n'+
			'<name>' + cleanValue(shape.name.attr('text')) + '</name>\n'+
			'<description>' + cleanValue(shape.description) + '</description>\n'+
			'<attributes>' + cleanValue(shape.attributes) + '</attributes>\n'+
			'<roles>' + cleanValue(shape.roles) + '</roles>\n'+
		'</shape>\n';
	});
	behaviourXML += '</behaviourmodel>\n';

	return behaviourXML;
}

function generate_behaviourim_shapes_XML() {
	var behaviouriXML = '<behaviourinterfacemodel>\n';
	behaviourim_shapes.forEach(function(shape) {
		var bbox = shape.getBBox();

		behaviouriXML +=
		'<shape>\n'+
			'<id>' + cleanValue(shape.id) + '</id>\n'+
			'<x>' + cleanValue(bbox.x) + '</x>\n'+
			'<y>' + cleanValue(bbox.y) + '</y>\n'+
			'<width>' + cleanValue(bbox.width) + '</width>\n'+
			'<height>' + cleanValue(bbox.height) + '</height>\n'+
			'<imagetype>' + cleanValue(shape.imagetype) + '</imagetype>\n'+
			'<generalImagetype>' + cleanValue(shape.generalImagetype) + '</generalImagetype>\n'+
			'<name>' + cleanValue(shape.name.attr('text')) + '</name>\n'+
			'<description>' + cleanValue(shape.description) + '</description>\n'+
			'<attributes>' + cleanValue(shape.attributes) + '</attributes>\n'+
			'<roles>' + cleanValue(shape.roles) + '</roles>\n'+
		'</shape>\n';
	});
	behaviourim_data.forEach(function(dobj) {
		behaviouriXML +=
		'<data>\n'+
			'<activityName>' + cleanValue(dobj.activityName) + '</activityName>\n' +
			'<activityVal>' + cleanValue(dobj.activityVal) + '</activityVal>\n' +
			'<i>' + cleanValue(dobj.i) + '</i>\n' +
			'<postArr>' + cleanValue(JSON.stringify(dobj.postArr)) + '</postArr>\n' +
			'<postArr>' + cleanValue(JSON.stringify(dobj.postArr)) + '</postArr>\n' +
		'</data>\n';
	});
	behaviouriXML += '</behaviourinterfacemodel>\n';

	return behaviouriXML;
}

function generate_cpnm_shapes_XML() {
	var cpnXML = '<cpnmodel>\n';
	cpnm_shapes.forEach(function(shape) {
		var bbox = shape.getBBox();

		cpnXML +=
		'<shape>\n'+
			'<id>' + cleanValue(shape.id) + '</id>\n'+
			'<x>' + cleanValue(bbox.x) + '</x>\n'+
			'<y>' + cleanValue(bbox.y) + '</y>\n'+
			'<width>' + cleanValue(bbox.width) + '</width>\n'+
			'<height>' + cleanValue(bbox.height) + '</height>\n'+
			'<imagetype>' + cleanValue(shape.imagetype) + '</imagetype>\n'+
			'<generalImagetype>' + cleanValue(shape.generalImagetype) + '</generalImagetype>\n'+
			'<name>' + cleanValue(shape.name.attr('text')) + '</name>\n'+
			'<description>' + cleanValue(shape.description) + '</description>\n'+
			'<attributes>' + cleanValue(shape.attributes) + '</attributes>\n'+
			'<roles>' + cleanValue(shape.roles) + '</roles>\n'+
			'<conditionType>' + cleanValue(shape.conditionType) + '</conditionType>\n'+
		'</shape>\n';
	});
	cpnXML += '</cpnmodel>\n';

	return cpnXML;
}

//Connections
function generate_goalm_connections_XML() {
	var goalconXML = '<goalmodelconnections>\n';
	goalm_connections.forEach(function(connection) {

		goalconXML +=
		'<connection>\n' + 
			'<from>' + cleanValue(connection.from.id) + '</from>\n'+
			'<to>' + cleanValue(connection.to.id) + '</to>\n'+
			'<contype>' + cleanValue(connection.contype) + '</contype>\n'+
			'<name>' + cleanValue(connection.name.attr('text')) + '</name>\n'+
		'</connection>\n';
	});
	goalconXML += '</goalmodelconnections>\n';

	return goalconXML;
}

function generate_orgm_connections_XML() {
	var orgconXML = '<organizationmodelconnections>\n';
	orgm_connections.forEach(function(connection) {

		orgconXML +=
		'<connection>\n' + 
			'<from>' + cleanValue(connection.from.id) + '</from>\n'+
			'<to>' + cleanValue(connection.to.id) + '</to>\n'+
			'<contype>' + cleanValue(connection.contype) + '</contype>\n'+
			'<name>' + cleanValue(connection.name.attr('text')) + '</name>\n'+
		'</connection>\n';
	});
	orgconXML += '</organizationmodelconnections>\n';

	return orgconXML;
}

function generate_domainm_connections_XML() {
	var domainconXML = '<domainmodelconnections>\n';
	domainm_connections.forEach(function(connection) {

		domainconXML +=
		'<connection>\n' + 
			'<from>' + cleanValue(connection.from.id) + '</from>\n'+
			'<to>' + cleanValue(connection.to.id) + '</to>\n'+
			'<contype>' + cleanValue(connection.contype) + '</contype>\n'+
			'<name>' + cleanValue(connection.name.attr('text')) + '</name>\n'+
		'</connection>\n';
	});
	domainconXML += '</domainmodelconnections>\n';

	return domainconXML;
}

function generate_acqm_connections_XML() {
	var acqconXML = '<acquaintancemodelconnections>\n';
	acquaintancem_connections.forEach(function(connection) {

		acqconXML +=
		'<connection>\n' + 
			'<from>' + cleanValue(connection.from.id) + '</from>\n'+
			'<to>' + cleanValue(connection.to.id) + '</to>\n'+
			'<contype>' + cleanValue(connection.contype) + '</contype>\n'+
			'<name>' + cleanValue(connection.name.attr('text')) + '</name>\n'+
		'</connection>\n';
	});
	acqconXML += '</acquaintancemodelconnections>\n';

	return acqconXML;
}

function generate_knowledgem_connections_XML() {
	var knowledgeconXML = '<knowledgemodelconnections>\n';
	knowledgem_connections.forEach(function(connection) {

		knowledgeconXML +=
		'<connection>\n' + 
			'<from>' + cleanValue(connection.from.id) + '</from>\n'+
			'<to>' + cleanValue(connection.to.id) + '</to>\n'+
			'<contype>' + cleanValue(connection.contype) + '</contype>\n'+
			'<name>' + cleanValue(connection.name.attr('text')) + '</name>\n'+
		'</connection>\n';
	});
	knowledgeconXML += '</knowledgemodelconnections>\n';

	return knowledgeconXML;
}

function generate_interactionm_connections_XML() {
	var interactionconXML = '<interactionmodelconnections>\n';
	interactionm_connections.forEach(function(connection) {

		interactionconXML +=
		'<connection>\n' + 
			'<from>' + cleanValue(connection.from.id) + '</from>\n'+
			'<to>' + cleanValue(connection.to.id) + '</to>\n'+
			'<contype>' + cleanValue(connection.contype) + '</contype>\n' +
			'<imagetype>' + cleanValue(connection.imagetype) + '</imagetype>\n'+
			'<name>' + cleanValue(connection.name.attr('text')) + '</name>\n' +
		'</connection>\n';
	});
	interactionconXML += '</interactionmodelconnections>\n';

	return interactionconXML;
}

function generate_behaviourm_connections_XML() {
	var behaviourconXML = '<behaviourmodelconnections>\n';
	behaviourm_connections.forEach(function(connection) {

		behaviourconXML +=
		'<connection>\n' + 
			'<from>' + cleanValue(connection.from.id) + '</from>\n'+
			'<to>' + cleanValue(connection.to.id) + '</to>\n'+
			'<contype>' + cleanValue(connection.contype) + '</contype>\n' +
			'<imagetype>' + cleanValue(connection.imagetype) + '</imagetype>\n'+
			'<name>' + cleanValue(connection.name.attr('text')) + '</name>\n' +
		'</connection>\n';
	});
	behaviourconXML += '</behaviourmodelconnections>\n';

	return behaviourconXML;
}

function generate_cpnm_connections_XML() {
	var cpnconXML = '<cpnmodelconnections>\n';
	cpnm_connections.forEach(function(connection) {

		cpnconXML +=
		'<connection>\n' + 
			'<from>' + cleanValue(connection.from.id) + '</from>\n'+
			'<to>' + cleanValue(connection.to.id) + '</to>\n'+
			'<contype>' + cleanValue(connection.contype) + '</contype>\n'+
			'<name>' + cleanValue(connection.name.attr('text')) + '</name>\n'+
		'</connection>\n';
	});
	cpnconXML += '</cpnmodelconnections>\n';

	return cpnconXML;
}

function cleanValue(val) {
	return (val || '').toString()
		.replace(/(<|>)/gim, '')
		.replace(/\n/gim, '{!n!}')
		.replace(/•/gim, '{!b!}');
}
<?php

if(isset($_POST['file']) && isset($_POST['json'])){
	$file = "savefiles/".$_POST['file'].".json"; 	

	if(file_exists($file)){
		if (strpos($file,'_S') == false) {
			echo "Saving vertices failed! Please choose another name!";
		}
		if (strpos($file,'_C') == false) {
			echo "Saving edges failed! Please choose another name!";
		}
	}
	else{
		$fh = fopen($file, 'w') or die("can't open file");
		$stringData = $_POST['json'];
		fwrite($fh, $stringData);
		fclose($fh);
		echo "Saved!";
	}
}
else{
	echo "Saving failed!";
}

?>
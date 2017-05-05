<?php

if(isset($_POST['file']) && isset($_POST['xml'])){
	$file = "savefiles/".$_POST['file'].".cpn"; 	

	if(file_exists($file)){
		echo "Creating CPN file failed! Please choose another name.";
	}
	else{
		$fh = fopen($file, 'w') or die("can't open file");
		$stringData = $_POST['xml'];
		fwrite($fh, $stringData);
		fclose($fh);
		echo "CPN file saved!";
	}
}
else{
	echo "Saving CPN file failed!";
}

?>
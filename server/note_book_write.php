<?php
	$a=file_get_contents("php://input","r");
	$myfile = fopen("my_note.txt", "w") or die("Unable to open file!");
	fwrite($myfile,$a);
	fclose($myfile);
	echo "write msg success:".$a;
?>

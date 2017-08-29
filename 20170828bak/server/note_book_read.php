<?php
	$myfile = fopen("my_note.txt", "r") or die("Unable to open file!");
	echo fread($myfile,filesize("my_note.txt"));
	fclose($myfile);
	// print("good");
?>



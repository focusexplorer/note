<?php
session_start();
if(!isset($_SESSION['valid_user']))
{
	echo '<br/>the user hasn\'t login\n';
	echo 'login to use text book';
	// require("../authentication/login.php");
}

$db=new mysqli("localhost","root","","notebook");
if($db->connect_errno)
{
	echo "$db->connect_error";
	exit(-1);
}
$re=$db->query("select text_page from  user_info where mail='".$_SESSION['valid_user']."';");
if($re)
{
	$r=$re->fetch_assoc();
	echo $r["text_page"];
}
$re->close();
$db->close();
?>

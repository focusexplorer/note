<?php
session_start();
if(!isset($_SESSION['valid_user']))
{
	echo '<br/>the user hasn\'t login';
	require("../authentication/login.php");
}

$c=file_get_contents("php://input","r");
echo "server recv text is:".$c;
$dbc=new mysqli("localhost","root","","notebook");
if(!$dbc)
{
	echo "new mysqli error";
	exit(-1);
}
$c1=$dbc->escape_string($c);
$re=$dbc->query("update user_info set text_page='".$c1."' where mail='".$_SESSION['valid_user']."'");
echo gettype($re);
echo $dbc->error;

?>
<?php
session_start();
echo $_POST['mail'];
echo '<br/>';
echo $_POST['password'];
echo '<br/>';
$dbc=new mysqli('localhost','root','','notebook');
if(mysqli_connect_errno())
{
	echo 'connection error'.mysqli_connect_error();
	exit();
}
$m=$dbc->escape_string($_POST['mail']);
$p=$dbc->escape_string($_POST['password']);
$query='select * from user_info where mail="'.$m.'" and password="'.$p.'";';
$result=$dbc->query($query);
echo '<br/>result:'.gettype($result);
if(!$result)
{
	echo '<br/> query error';
	exit();
}
if(!$result->num_rows)
{
	echo '<br/> the userid or password is wrong';
	exit();
}
else
{
	$_SESSION['valid_user']=$_POST['mail'];
	echo '<br/>login successfully';
}	
require('main.php');

?>

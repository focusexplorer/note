<?php
session_start();
echo $_POST['user'];
echo '<br/>';
echo $_POST['password'];
echo '<br/>';
echo $_POST['login'];
echo '<br/>';
$dbc=new mysqli('localhost','root','purper','test');
if(mysqli_connect_errno())
{
	echo 'connection error'.mysqli_connect_error();
	exit();
}
$query='select * from auth where userid="'.$_POST['user'].'" and password="'.$_POST['password'].'";';
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
	$_SESSION['valid_user']=$_POST['user'];
	echo '<br/>login successfully';
}	
require('main.php');

?>

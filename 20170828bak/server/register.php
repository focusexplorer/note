<?php
echo $_POST['user'];
echo '<br/>';
echo $_POST['password'];
$dbc=new mysqli('localhost','root','purper','test');
if(mysqli_connect_errno())
{
	echo 'Connection to database failed'.mysqli_connect_error();
	exit();
}
$query='insert into auth values ("'.$_POST['user'].'","'.$_POST['password'].'");';
echo '<br/>'.$query;
$result=$dbc->query($query);
echo '<br/>'.gettype($result);
if(!$result)
{
	echo 'query error ';
	exit();
}

echo '<br/>query result:'.$result;
$dbc->close();
require('login.html');
?>

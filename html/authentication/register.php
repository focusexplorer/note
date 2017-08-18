<?php
echo $_POST['mail'];
echo '<br/>';
echo $_POST['password'];
$dbc=new mysqli('localhost','root','','notebook');
if(mysqli_connect_errno())
{
	echo 'Connection to database failed'.mysqli_connect_error();
	exit();
}
$m=$dbc->escape_string($_POST['mail']);
$p=$dbc->escape_string($_POST['password']);
$query='insert into user_info values ("'.$m.'","'.$p.'",now(),"");';
echo '<br/>'.$query;
$result=$dbc->query($query);
echo '<br/>'.gettype($result);
if(!$result)
{
	echo 'query error:'.$dbc->error;
	exit();
}

echo '<br/>query result:'.$result;
$dbc->close();
require('login.html');
?>

<?php
session_start();
if(!isset($_SESSION['valid_user']))
{
	echo 'the user hasn\'t login';
	exit();
}
unset($_SESSION['valid_user']);
echo 'the user:'.$_SESSION['valid_user'].'has logout';
?>

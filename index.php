<?php
session_start();
if(!isset($_SESSION['valid_user']))
{
	require('index.html');
	exit(0);
}
require('paper.html');
exit(0);
?>
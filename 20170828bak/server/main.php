<?php
session_start();
if(!isset($_SESSION['valid_user']))
{
	echo '<br/>the user hasn\'t login';
	exit();
}
?>
<html>
<head>
</head>
<body>
the world is changing
</body>
</html>
<?php
echo '<br/>the user has login';
echo '<br/><a href="logout.php">logout</a>';
?>

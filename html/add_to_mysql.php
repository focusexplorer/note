<?php

$c=file_get_contents("php://input","r");
echo "server recv text is:".$c;
$dbc=new mysqli("localhost","root","","notebook");
if(!$dbc)
{
	echo "new mysqli error";
	exit(-1);
}
$c1=$dbc->escape_string($c);
$re=$dbc->query("update user_info set text_page='".$c1."' where mail='jssjway@qq.com'");
echo gettype($re);
echo $dbc->error;

?>
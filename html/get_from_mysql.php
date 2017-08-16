<?php
$db=new mysqli("localhost","root","","notebook");
if($db->connect_errno)
{
	echo "$db->connect_error";
	exit(-1);
}
$re=$db->query("select text_page from  user_info where mail='jssjway@qq.com'");
if($re)
{
	$r=$re->fetch_assoc();
	echo $r["text_page"];
}
$re->close();
$db->close();
?>

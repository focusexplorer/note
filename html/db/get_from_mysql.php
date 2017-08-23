<?php
session_start();
if(!isset($_SESSION['valid_user']))
{
	echo 'not login';
	exit(-1);
}

//read data from post 
$c=file_get_contents("php://input","r");
$jd=json_decode($c);

//connect to mysql
$db=new mysqli("localhost","root","","notebook");
if($db->connect_errno)
{
	echo "$db->connect_error";
	exit(-1);
}

//do query
do
{
	$re=$db->query("select touch_time,text_page from  user_info where mail='".$_SESSION['valid_user']."';");
	if(!$re)
	{
		echo "query error";
		break;
	}
	$r=$re->fetch_assoc();

	//prepare result data;
	$e=array();
	$e["version"]=$jd->version;
	$e["command"]="cmd_get_data_rsp";
	$e["get_data_rsp"]["touch_time"]=$r["touch_time"];
	$e["get_data_rsp"]["text"]=$r["text_page"];
	echo json_encode($e);

	$re->close();
}while(false);
$db->close();
?>

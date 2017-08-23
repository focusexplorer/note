<?php
session_start();
if(!isset($_SESSION['valid_user']))
{
	echo 'not login';
	exit(0);
}
//read post
$c=file_get_contents("php://input","r");
$jd=json_decode($c);

//prepare the return value
$rv['version']=$jd->version;
$rv['command']='cmd_push_data_rsp';

//connect mysql
$dbc=new mysqli("localhost","root","","notebook");
if($dbc->errno)
{
	error_log("new mysqli error:$dbc->errno");
	exit(-1);
}
do{
	//read touch time and compare
	$re=$dbc->query("select touch_time from user_info where mail='".$_SESSION['valid_user']."'");
	if(!$re)
	{
		error_log("query error");
		$rv["error"]="query error";
		break;
	}
	$f=$re->fetch_assoc();
	$d1=date($jd->push_data_req->touch_time);
	$d2=$f['touch_time'];
	if($d1!=$d2)
	{
		error_log("the last touch time is not the equal");
		$rv["error"]="touch time dismatch, get_data first";
		break;
	}
	$re->close();
	
	//set value;
	$d=date("Y-m-d H:i:s");
	$a=$dbc->escape_string($jd->push_data_req->text);
	$re=$dbc->query("update user_info set text_page='".$a."', touch_time='".$d."' where mail='".$_SESSION['valid_user']."'");
	if(!$re)
	{
		echo "query error ";
		$rv['error']='query error';
		break;
	}
	$rv['push_data_rsp']['touch_time']=$d;
	// $re->close();
}while(false);
$dbc->close();
echo json_encode($rv);

?>


















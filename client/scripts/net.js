if(typeof(NET)=="object") alert("NET has been defined");

var POST_CONTENT;


function update_and_send()
{
	if(HAS_CHANGED==0)
	{
		return;
	}
	console.info("HAS_CHANGED:"+HAS_CHANGED);
	HAS_CHANGED=0;
	
	update_plan();
	update_done();
	push_content_to_server();
	
}
//--------------------------------------------------------------server interact
function get_xmlhttp()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}
function get_server_content()
{
	// for(i=0;i<7;i++)
	// {
		// UNCERTAINTY[i]={"date":today.toDateString(),"level":1,"aim":i.toString()};
	// }
	var cp=new Object();
	cp.version=VERSION;
	cp.command="get_data";
	
	POST_CONTENT=window.JSON.stringify(cp);
	var xmlhttp=get_xmlhttp();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log("get sever plan:"+xmlhttp.responseText);
			var t=window.JSON.parse(xmlhttp.responseText);
			console.log("get version is:"+t.version);
			UNCERTAINTY=t.data.plan;
			CONTROL=t.data.done;
		}
	}
	xmlhttp.open("POST",READ_CGI,false);
	xmlhttp.send(POST_CONTENT);
}
function push_content_to_server()
{
	// alert("push_content_to_server");
	
	var cp=new Object();
	cp.version=VERSION;
	cp.command="push_data";
	cp.data=new Object();
	cp.data.plan=UNCERTAINTY;
	cp.data.done=CONTROL;
	
	POST_CONTENT=window.JSON.stringify(cp);
	
	var xmlhttp=get_xmlhttp();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST",WRITE_CGI,false);
	xmlhttp.send(POST_CONTENT);
}

function flogin()
{
	var cp=new Object();
	cp.version=VERSION;
	cp.user_name=document.getElementById("input_username").value;
	cp.user_password=document.getElementById("input_password").value;
	if(!check_empty(cp.user_name)) return ;
	if(!check_empty(cp.user_password)) return ;
	
	cp.user_password=hex_md5(cp.user_password);
	POST_CONTENT=window.JSON.stringify(cp);
	console.info(POST_CONTENT);
	
	var xmlhttp=get_xmlhttp();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST",LOGIN_CGI,true);
	xmlhttp.send(POST_CONTENT);
}
function flogin()
{
	var cp=new Object();
	cp.version=VERSION;
	cp.command="login";
	cp.user_name=document.getElementById("input_username").value;
	cp.user_password=document.getElementById("input_password").value;
	if(!check_empty(cp.user_name)) return ;
	if(!check_empty(cp.user_password)) return ;
	
	cp.user_password=hex_md5(cp.user_password);
	POST_CONTENT=window.JSON.stringify(cp);
	console.info(POST_CONTENT);
	
	var xmlhttp=get_xmlhttp();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST",LOGIN_CGI,true);
	xmlhttp.send(POST_CONTENT);
}
function fregister()
{
	var cp=new Object();
	cp.version=VERSION;
	cp.command="register";
	cp.user_name=document.getElementById("input_username").value;
	cp.user_password=document.getElementById("input_password").value;
	cp.mail=document.getElementById("input_mail").value;
	if(!check_empty(cp.user_name)) return ;
	if(!check_empty(cp.user_password)) return ;
	if(!check_empty(cp.mail)) return ;
	
	cp.user_password=hex_md5(cp.user_password);
	POST_CONTENT=window.JSON.stringify(cp);
	console.info(POST_CONTENT);
	
	var xmlhttp=get_xmlhttp();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST",REGISTER_CGI,true);
	xmlhttp.send(POST_CONTENT);
}
function check_empty(str)
{
	if(str.length==0)
	{
		alert("string is empty");
		return false;
	}
	return true;
}
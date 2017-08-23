
var TOUCH_TIME="";
var LAST_GET_TIME=0;
var NEED_SAVE=false;

window.onload=function()
{
	// var b=document.getElementById("save");
	// b.addEventListener("input",function(){
		// this.style.color="red";
	// });
	// b.addEventListener("propertychange",function(){
		// this.style.color="red";
	// });

	
	
	var ta=document.getElementById("whole_txt");
	// ta.addEventListener("input",function(){
		// document.getElementById("save").style.color="red";
	// });
	// ta.addEventListener("propertychange",function(){
		// document.getElementById("save").style.color="red";
	// });	
	ta.oninput=function(){
		NEED_SAVE=true;
	};
	ta.onpropertychange=function(){
		NEED_SAVE=true;
	};
	
	ta.onblur=fsave;//save when save textarea
	document.getElementsByTagName("body")[0].onbeforeunload=fsave;//save when close the web
	setInterval(fsave,10000);
	document.getElementsByTagName("body")[0].onpageshow=fget;//called when come back from a link
	// document.getElementsByTagName("body")[0].onfocus=fget;//add get in case of someone edit the content from somewhere else
	
}
window.onfocus=fget;//add get in case of someone edit the content from somewhere else


function fget()
{
	//avoid too frequently get
	var now=(new Date()).getTime();
	if(now-LAST_GET_TIME<5000)
	{
		console.log("too frequently, last_get_time:",LAST_GET_TIME," now:",now);
		return;
	}
	LAST_GET_TIME=now;
		
		
	var xmlhttp=get_xmlhttp();
	var c=new Object();
	c.version=VERSION;
	c.command="cmd_get_data_req";
	POST_CONTENT=window.JSON.stringify(c);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText=='not login')
			{
				// window.location.href=curWwwPath.substring(0.pos)+'authentication/login.html';
				window.location.href='authentication/login.html';
				// window.location.href='index.html';//this will lead to dead loop
				return;
			}
			console.log("fget from server:"+xmlhttp.responseText);
			var r=window.JSON.parse(xmlhttp.responseText);
			if(r.error==null)
			{
				var ta=document.getElementById("whole_txt");
				ta.value=r.get_data_rsp.text;
				TOUCH_TIME=r.get_data_rsp.touch_time;
			}
			else{
				document.getElementById("whole_txt").value=r.error;
			}
			
		}
	}
	xmlhttp.open("POST","db/get_from_mysql.php",false);
	xmlhttp.send(POST_CONTENT);
}
function fsave()
{
	if(!NEED_SAVE)
	{
		// console.log("has saved, no need to save again");
		return ;
	}
	
	var ta=document.getElementById("whole_txt");
	console.log(ta.value);
	var c=new Object();
	c.version=VERSION;
	c.command="cmd_push_data_req";
	c.push_data_req=new Object();
	c.push_data_req.touch_time=TOUCH_TIME;
	c.push_data_req.text=ta.value;
	POST_CONTENT=window.JSON.stringify(c);
	
	var xmlhttp=get_xmlhttp();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText=='not login')
			{
				window.location.href='../authentication/login.html';
				return;
			}
			console.log("server response:"+xmlhttp.responseText);
			var t=window.JSON.parse(xmlhttp.responseText);
			if(t.error==null)
			{
				TOUCH_TIME=t.push_data_rsp.touch_time;
				// var b=document.getElementById("save");
				// b.style.color="green";
				NEED_SAVE=false;
			}
			else{
				// document.getElementById("save").style.color='red';
				console.log(t.error);
			}
		}
	}
	xmlhttp.open("POST","db/add_to_mysql.php",false);
	xmlhttp.send(POST_CONTENT);
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
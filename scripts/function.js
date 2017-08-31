
var TOUCH_TIME="";
var LAST_GET_TIME=0;
var SAVE_CONTROL=new Object;
SAVE_CONTROL.need_save=false;
SAVE_CONTROL.last_edit_time=(new Date).getTime();
var CUR_TIME=(new Date).getTime();

window.onload=function()
{
	
	document.getElementById('online_flag').hidden="hidden";
	
	var ta=document.getElementById("whole_txt");
	// ta.addEventListener("input",function(){
		// document.getElementById("save").style.color="red";
	// });
	// ta.addEventListener("propertychange",function(){
		// document.getElementById("save").style.color="red";
	// });	
	ta.oninput=function(){
		SAVE_CONTROL.need_save=true;
		SAVE_CONTROL.last_edit_time=CUR_TIME;
	};
	ta.onpropertychange=function(){
		SAVE_CONTROL.need_save=true;
		SAVE_CONTROL.last_edit_time=CUR_TIME;
	};
	
	ta.onblur=fsave;//save when save textarea
	document.getElementsByTagName("body")[0].onbeforeunload=fsave;//save when close the web
	// setInterval(fsave,10000);//save too frequently;change saving in update_loop when no edit in last 7 seconds
	
	//document.getElementsByTagName("body")[0].onpageshow=fget;//called when come back from a link
	//window.onfocus=fget;//add get in case of someone edit the content from somewhere else
	document.getElementById("whole_txt").onfocus=fget;//get when text_area get focused; so the last two method can be commentted;
	fget();//get on when the page is onload
	
	setInterval(update,1000);
}

function update()
{
	CUR_TIME=(new Date).getTime();
	//auto save  7 seconds after last_edit_time;
	if(CUR_TIME-SAVE_CONTROL.last_edit_time>=7000)
	{
		fsave();
	}
	
	if(navigator.onLine)
	{
		// document.getElementById('online_flag').style.visibility="hidden";
		document.getElementById('online_flag').hidden="hidden";
	}
	else{
		// document.getElementById('online_flag').style.visibility="visible";
		console.log("internet is not connected");
		var ol=document.getElementById('online_flag');
		ol.removeAttribute("hidden");
	}
}
function fget()
{
	//avoid too frequently get=
	if(CUR_TIME-LAST_GET_TIME<=7000)
	{
		console.log("too frequently, last_get_time:",LAST_GET_TIME," now:",CUR_TIME);
		return;
	}
	LAST_GET_TIME=CUR_TIME;
		
		
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
				ta.innerHTML=r.get_data_rsp.text;
				TOUCH_TIME=r.get_data_rsp.touch_time;
			}
			else{
				document.getElementById("whole_txt").innerHTML=r.error;
			}
			
		}
	}
	xmlhttp.open("POST","db/get_from_mysql.php",false);
	xmlhttp.send(POST_CONTENT);
}
function fsave()
{
	if(!SAVE_CONTROL.need_save)
	{
		// console.log("has saved, no need to save again");
		return ;
	}
	
	var ta=document.getElementById("whole_txt");
	console.log(ta.innerHTML);
	var c=new Object();
	c.version=VERSION;
	c.command="cmd_push_data_req";
	c.push_data_req=new Object();
	c.push_data_req.touch_time=TOUCH_TIME;
	c.push_data_req.text=ta.innerHTML;
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
				SAVE_CONTROL.need_save=false;
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
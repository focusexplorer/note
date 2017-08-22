window.onload=function()
{
	fget();
	
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
		document.getElementById("save").style.color="red";
	};
	ta.onpropertychange=function(){
		document.getElementById("save").style.color="red";
	};
}
function fget()
{
	var xmlhttp=get_xmlhttp();
	var c=new Object();
	c.version=VERSION;
	c.command="cmd_get_data_req";
	POST_CONTENT=window.JSON.stringify(c);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log("get sever plan:"+xmlhttp.responseText);
			var r=window.JSON.parse(xmlhttp.responseText);
			
			var ta=document.getElementById("whole_txt");
			ta.value=r.get_data_rsp.text;
			TOUCH_TIME=r.get_data_rsp.touch_time;
		}
	}
	xmlhttp.open("POST","db/get_from_mysql.php",false);
	xmlhttp.send(POST_CONTENT);
}
function fsave()
{
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
			console.log("server response:"+xmlhttp.responseText);
			var t=window.JSON.parse(xmlhttp.responseText);
			if(t.error==null)
			{
				TOUCH_TIME=t.push_data_rsp.touch_time;
				var b=document.getElementById("save");
				b.style.color="green";
			}
			else{
				document.getElementById("save").style.color='red';
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
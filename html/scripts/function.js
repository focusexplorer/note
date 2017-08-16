window.onload=function()
{
	fget();
}
function fget()
{
	var xmlhttp=get_xmlhttp();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log("get sever plan:"+xmlhttp.responseText);
			// var t=window.JSON.parse(xmlhttp.responseText);
			
			var ta=document.getElementById("whole_txt");
			ta.value=xmlhttp.responseText;
		}
	}
	xmlhttp.open("POST","get_from_mysql.php",false);
	xmlhttp.send("");
}
function fsave()
{
	var ta=document.getElementById("whole_txt");
	console.log(ta.value);
	
	var xmlhttp=get_xmlhttp();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log("server response:"+xmlhttp.responseText);
			// var t=window.JSON.parse(xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST","add_to_mysql.php",false);
	xmlhttp.send(ta.value);
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
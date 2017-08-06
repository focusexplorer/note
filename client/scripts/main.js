
var UNCERTAINTY=new Array();
var CONTROL=new Array();
var id_plan="plan";
var id_done="done";

var HAS_CHANGED=0;

window.onload=function ()
{
	get_server_content();
	
	var fr=document.getElementById(id_plan);
	for(i=0;i<UNCERTAINTY.length;i++)
	{
		var ut=create_new_item(UNCERTAINTY[i].date,UNCERTAINTY[i].level,UNCERTAINTY[i].aim,0);
		fr.appendChild(ut);
	}
	// fr.addEventListener("dragover",allowDrop);
	// fr.addEventListener("drop",drop);
	
	var frc=document.getElementById(id_done);
	for(i=0;i<CONTROL.length;i++)
	{
		var ut=create_new_item(CONTROL[i].date,CONTROL[i].level,CONTROL[i].aim,1);
		frc.appendChild(ut);
	}
	
	var add=document.getElementById("add");
	add.onclick=function(){
		var c=document.getElementById("new_thing");
		var ut=create_new_item(TIME.get_date().toDateString(),"4",c.value,0);
		var fr=document.getElementById(id_plan);
		fr.appendChild(ut);
		sort_items(ut);
		HAS_CHANGED++;
	};
	
	// var aims=document.getElementsByClassName("aim");
	// for(i=0;i<aims.length;i++)
	// {
		// aims[i].style.height=aims[i].scrollHeight+"px";
	// }
	
				// fr.insertBefore(fr.childNodes[1],fr.childNodes[0]);
				// var t=fr.childNodes[5];
				// fr.childNodes[5]=fr.childNodes[1];
				// fr.childNodes[1]=t;
	// window.scrollByPages(-0.5);
	
	//scroll to the thing doing now;
	window.location.hash="#line";
	window.scrollBy(0,-window.innerHeight/2);
	
	
	setInterval(update_and_send,1000);
}




//--------------------------------------------------------------create and delete
function create_new_item(ad,al,aa,step)
{
	var date=document.createElement("input");
	date.type="button";
	date.pvalue=ad;
	date.value=format_date(date.pvalue);
	date.setAttribute("class","date");
	var level=document.createElement("input");
	level.type="number";
	level.value=al;
	level.min="0";
	level.max="4";
	level.onchange=function(){
		sort_items(this.parentNode);
		HAS_CHANGED++;
	}
	level.setAttribute("class","level")
	var complete_button=document.createElement("input");
	complete_button.type="button";
	complete_button.value=(step==0?"完成":"OK");
	if(step==0) complete_button.onclick=function(){
		move_item(this.parentNode);
	};
	complete_button.setAttribute("class","complete");
	var delete_button=document.createElement("input");
	delete_button.type="button";
	delete_button.value="刪除";
	delete_button.onclick=function(){
		delete_item(this.parentNode);
	};
	delete_button.setAttribute("class","delete");
	var aim=document.createElement("p");
	aim.innerHTML=aa;
	aim.pdata=aa;
	aim.onblur=function(){
		if(aim.pdata!=aim.innerHTML)
		{
			HAS_CHANGED++;
			aim.pdata=aim.innerHTML;
		}
		// aim.style.height=this.scrollHeight+"px";
		// alert(this.scrollHeight);
		// alert(aim.height);
		// aim.style.height="200px";
	}
	aim.setAttribute("contenteditable","true");
	aim.setAttribute("class","aim");
	// aim.setAttribute("draggable","false");
	// aim.addEventListener("dragstart",function(ev){ev.stopPropagation();});

	var ut=document.createElement("div");
	ut.appendChild(date);
	ut.appendChild(level);
	ut.appendChild(complete_button);
	ut.appendChild(delete_button);
	ut.appendChild(aim);
	// ut.id=BASE.create_id();
	// ut.draggable="true";
		// // ut.ondragover="allowDrop(event)";
		// // ut.ondrop="drop(event)";
	// ut.addEventListener("dragstart",drag);
	ut.setAttribute("class","divitem");
	return ut;
}
function delete_item(it)
{
	// msg=confirm("确定删除吗?");
	// if(!msg) return;
	it.parentNode.removeChild(it);
	HAS_CHANGED++;
}
function move_item(it)
{
	frc=document.getElementById(id_done);
	frc.insertBefore(it,frc.firstChild);
	it.childNodes[2].onclick=null;
	it.childNodes[2].value="OK";
	HAS_CHANGED++;
}
//--------------------------------------------------------------item
function compare_item(a,b)
{
	// alert(a.childNodes[0].pvalue);
	var time1=new Date(a.childNodes[0].pvalue);
	var time2=new Date(b.childNodes[0].pvalue);
	
	if(time1>time2)
	{
		return 1;
	}
	if(time1<time2)
	{
		return -1;
	}
	var level1=parseInt(a.childNodes[1].value);
	var level2=parseInt(b.childNodes[1].value);
	if(level1>level2){
		return 1;
	}
	else if(level1<level2){
		return -1;
	}
	else{
		return 0;
	}	
}
function sort_items(ob)
{
	var fr=document.getElementById(id_plan);	
	if(fr.childElementCount<=1)
	{
		return;
	}
	if(ob==fr.firstChild)
	{
		if(compare_item(ob,ob.nextSibling)>=0)
			return;
		var i=1;
		for(i=1;i<fr.childNodes.childElementCount-1;i++)
		{
			if(compare_item(ob,fr.childNodes[i])<=0 && compare(ob,fr.childNodes[i+1])>=0)
				break;
		}
		if(compare_item(ob,fr.lastChild)<0){
			fr.insertBefore(ob,fr.lastChild.nextSibling);
			return ;
		}else{
			fr.insertBefore(ob,fr.childNodes[i+1]);
			return;
		}
	}
	if(ob==fr.lastChild)
	{
		if(compare_item(ob,ob.previousSibling)<=0)
		{
			return;
		}
		var i=fr.childElementCount-2;
		for(;i>0;i--)
		{
			if(compare_item(ob,fr.childNodes[i])>=0 && compare_item(ob,fr.childNodes[i-1])<=0)
				break;
		}
		if(compare_item(ob,fr.firstChild)>0)
		{
			fr.insertBefore(ob,fr.firstChild);
			return;
		}else{
			fr.insertBefore(ob,fr.childNodes[i]);
			return;
		}
	}
	if(compare_item(ob,fr.firstChild)>=0)
	{
		fr.insertBefore(ob,fr.firstChild);
		return;
	}
	if(compare_item(ob,fr.lastChild)<0)
	{
		fr.insertBefore(ob,fr.lastChild.nextSibling);
		return;
	}
	for(i=0;i<fr.childElementCount-1;i++)
	{
		var a=fr.childNodes[i];
		if(a==ob) a=fr.childNodes[i-1];
		var b=fr.childNodes[i+1];
		if(b==ob) b=fr.childNodes[i+2];
		if(compare_item(a,ob)>=0 && compare_item(ob,b)>=0)
		{
			fr.insertBefore(ob,b);
			return;
		}
	}
}
//--------------------------------------------------------------array
function update_plan()
{
	var fr=document.getElementById(id_plan);
	var all_items=fr.getElementsByTagName("div");
	UNCERTAINTY=new Array();
	for(i=0;i<all_items.length;i++)
	{
		var a=all_items[i].childNodes[0].pvalue;
		var b=all_items[i].childNodes[1].value;
		var c=all_items[i].childNodes[4].innerHTML;
		UNCERTAINTY[i]={"date":a,"level":b,"aim":c};
	}
	// console.log(window.JSON.stringify(UNCERTAINTY));
}
function update_done()
{
	var frc=document.getElementById(id_done);
	var all_items=frc.getElementsByTagName("div");
	CONTROL=new Array();
	for(i=0;i<all_items.length;i++)
	{
		var a=all_items[i].childNodes[0].pvalue;
		var b=all_items[i].childNodes[1].value;
		var c=all_items[i].childNodes[4].innerHTML;
		CONTROL[i]={"date":a,"level":b,"aim":c};
	}
	// console.log(window.JSON.stringify(UNCERTAINTY));
}
// //--------------------------------------------------------------drag action
// function allowDrop(ev)
// {
	// ev.preventDefault();
// }
// function drag(ev)
// {
	// ev.dataTransfer.setData("Text",ev.target.id);
// }
// function drop(ev)
// {
	// ev.preventDefault();
	// var data=ev.dataTransfer.getData("Text");
	// var tar=ev.target;
	// while(tar.parentNode.id!=id_plan)
		// tar=tar.parentNode;
	// cur=document.getElementById(data);
	// tar.parentNode.insertBefore(cur,tar);
	// cur.childNodes[0].value=tar.childNodes[0].value;
	// cur.childNodes[1].value=tar.childNodes[1].value;
	// // cur.childNodes[2].value=tar.childNodes[2].value;
	// update_plan();
// }
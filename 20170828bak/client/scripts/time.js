if(typeof(TIME)=="object") alert("TIME has been defined");
var TIME={};
(function(){
	TIME.get_date=function ()
	{
		return new Date();
	}
}());
function PrefixInteger(num) {
 return (Array(2).join('0') + num).slice(-2);
}
function format_date(d)
{
	a=new Array("一","二","三","四","五","六","日");
	// a=new Array();
	d=new Date(d);
	
	return d.getFullYear()+'-'+PrefixInteger(d.getMonth())+'-'+PrefixInteger(d.getDate())+'  '+'周'+a[d.getDay()];
}



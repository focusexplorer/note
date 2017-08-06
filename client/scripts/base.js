if(typeof(BASE)=="object") alert("BASE has been defined");
var BASE={}
var ID=0;
(function(){
	BASE.create_id=function ()
	{
		ID++;
		return ID.toString();
	}
}());



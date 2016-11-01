function starMove(obj,json,endfn){
	clearInterval(obj.timer)
	obj.timer = setInterval(function(){

		for(var attr in json){
			var currentKey = 0
			if (attr == 'opacity') {
				if (Math.round(parseFloat(getStyle(obj,attr)*100)) == 0) {
					currentKey = 0
				}else{
					currentKey = Math.round(parseFloat(getStyle(obj,attr)*100)) || 100
				}
			}else{
				currentKey = parseInt(getStyle(obj,attr)) || 0;
			}
			var speed = (json[attr] - currentKey)/8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
			if(currentKey != json[attr]){

				if(attr == "opacity"){
					obj.style.filter = 'alpha(opacity=' +(currentKey + speed)+ ')';
					obj.style.opacity = (currentKey + speed)/100;
				}else{
					obj.style[attr] = currentKey + speed + 'px';
				}
			}else{
				clearInterval(obj.timer)
				if(endfn){
					endFn.call(obj);
				}
			}
		}
	},30);
}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}
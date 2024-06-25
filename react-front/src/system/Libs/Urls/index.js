export const goToAddress=(str)=>{
	window.location.href = str;
}
export const goToRoutes=(str,strtoFind,strToReplace)=>{
	if(str===undefined || str == null){return;}
	if(strtoFind===undefined || strtoFind == null){return;}
	if(strToReplace===undefined || strToReplace == null){return;}
	str = str.replace(`:${strtoFind}`,strToReplace);

	window.location.href = str;
}
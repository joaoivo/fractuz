export const isStringEmptyOrSpaces=(str)=>{
	return !str || str.trim() === '';
}

export const isStringJson =(str) =>{
	try {JSON.parse(str);}
	catch (e) {return false;}
	return true;
}
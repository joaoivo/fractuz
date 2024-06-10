export const isObjectEmpty=(str)=>{
	return str === null || str === undefined || Object.keys(str).length === 0;
}

export const getObectPropertiesFilter=(objectData, propertiesWanted)=> {
	if(isObjectEmpty(objectData)){return null;}

	return propertiesWanted.reduce((objectReturn, prop) => {
		if (prop in objectData) {objectReturn[prop] = objectData[prop];}
		return objectReturn;
	}, {});
 }
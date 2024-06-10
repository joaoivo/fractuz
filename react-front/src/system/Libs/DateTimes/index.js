export function getCurrentDateTimeStamp() {
	const now = new Date();
	
	const year = now.getFullYear();
	
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	
	const formattedDateTime = `${year}${month}${day}_${hours}${minutes}${seconds}`;
	
	return formattedDateTime;
}

export function getCurrentDateTimeStampFormated() {
	const now = new Date();
	
	const year = now.getFullYear();
	
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const miliSeconds = String(now.getMilliseconds()).padStart(4, '0');
	
	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${miliSeconds}`;
	
	return formattedDateTime;
}
export const useApiDefault = () => {

	class ExceptionApiDefault extends Error {
		constructor(mensagem) {
			super(mensagem);
			this.name = this.constructor.name;
			this.data = { mensagem };
		}
	}

	const methodGet = async (headerData,url) => {
		try{
			const myHeaders = new Headers();
			Object.keys(headerData).forEach((key)=>{
				myHeaders.append(key, headerData[key]);
			});
	
			const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			};

			const response = await fetch(url, requestOptions);
			if(!response.ok){	throw new ExceptionApiDefault(`Server Response NOK. Status ${response.status}; ${response.statusText}`);}
			const result 	= await response.text();
			return JSON.parse(result);

		} catch (error) {
			console.log("Server API Response Process Error:",error);
			throw new ExceptionApiDefault(`Server API Response Process Error: ${error}`);
		}
	}

	return {ExceptionApiDefault, methodGet}
}
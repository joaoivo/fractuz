export const getCaesarEncrypt =(texto, shift) => {
	return texto.split('').map(char => {
		const code = char.charCodeAt(0);
		if (code >= 65 && code <= 90) {// Letras maiúsculas
			return String.fromCharCode(((code - 65 + shift) % 26) + 65);
		} else if (code >= 97 && code <= 122) {// Letras minúsculas
			return String.fromCharCode(((code - 97 + shift) % 26) + 97);
		} else {// Outros caracteres não são alterados
			return char;
		}
	}).join('');
}

 export const getCaesarDecrypt =(texto, shift) => {
	return texto.split('').map(char => {
		const code = char.charCodeAt(0);
		if (code >= 65 && code <= 90) {// Letras maiúsculas
			return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
		} else if (code >= 97 && code <= 122) {// Letras minúsculas
			return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
		} else {// Outros caracteres não são alterados
			return char;
		}
	}).join('');
}
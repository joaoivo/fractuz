export const getCaesarEncrypt = (texto, shift) => {
	if (texto === undefined) { return ''; }
	if (shift === undefined) { shift = 1 }
	return texto.split('').map(char => {
		const code = char.charCodeAt(0);
		if (code >= 65 && code <= 90) {// Letras maiúsculas
			return String.fromCharCode(((code - 65 + shift) % 26) + 65);
		} else if (code >= 97 && code <= 122) {// Letras minúsculas
			return String.fromCharCode(((code - 97 + shift) % 26) + 97);
		} else if (code >= 48 && code <= 57) { // Números (0-9)
			return String.fromCharCode(((code - 48 + shift) % 10) + 48);
		} else if (code === 45) { // Traço '-'
			return String.fromCharCode(((code - 45 + shift) % 1) + 45); // Traço permanece como traço
		} else {// Outros caracteres não são alterados
			return char;
		}
	}).join('');
}

export const getCaesarDecrypt = (texto, shift) => {
	if (texto === undefined) { return ''; }
	if (shift === undefined) { shift = 1 }
	return texto.split('').map(char => {
		const code = char.charCodeAt(0);
		if (code >= 65 && code <= 90) {// Letras maiúsculas
			return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
		} else if (code >= 97 && code <= 122) {// Letras minúsculas
			return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
		} else if (code >= 48 && code <= 57) { // Números (0-9)
			return String.fromCharCode(((code - 48 - shift + 10) % 10) + 48);
		} else if (code === 45) { // Traço '-'
			return String.fromCharCode(((code - 45 - shift + 1) % 1) + 45); // Traço permanece como traço
		} else {// Outros caracteres não são alterados
			return char;
		}
	}).join('');
}

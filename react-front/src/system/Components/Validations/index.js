import { isObjectEmpty } from "../../Libs/Objects"
import { ExceptionSystemDefault } from "../Exceptions";
export const enumValidationBasicRules = {
	 NoValidation :  ()=>{return [];}

	,NotNull : (val)=>{
		const message="não pode ser nulo"
		if(typeof val === "string"){val=val.trim();}
		if(Array.isArray(val)){
			val=val.filter(Boolean);//remover outros valores "falsy" (como undefined, 0, false, NaN, e strings vazias "")
			if(val.length<=0){return [message];}
		}else if(!!!val){return [message];}
		return [];
	}

	,Date :(value) => {
		if((value===undefined) || (value===null) || (value==="")){return []}
		const resultNegative = [`está com o um formato de data inválido ${!!!value?"":`('${value}')` }`];
		if (typeof value !== 'string' && !(value instanceof Date)) {return resultNegative;}

		// Regex para validar formato de data YYYY-MM-DD ou DD/MM/YYYY
		const regex = /^(?:\d{4}-\d{2}-\d{2})|(?:\d{2}\/\d{2}\/\d{4})|(?:\d{2}\/\d{2}\/\d{2})$/;
		if (typeof value === 'string' && regex.test(value)) {
			const date = new Date(value);
			if(!isNaN(date)){return resultNegative;}
			return [];
		}
		if(value instanceof Date) {
			if(!isNaN(value)){return resultNegative;}
			return [];
		}

		return resultNegative;
	}

	,Time : (value) => {
		if((value===undefined) || (value===null) || (value==="")){return []}
		if (typeof value !== 'string') return [`está com tipo de dado inválido para Hora (${typeof value !== 'string'})`];

		// Regex para validar formato de hora HH:MM ou HH:MM:SS
		const regex = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;
		return regex.test(value)?[]:[`está com dado inválido para Hora ('${value}')`];
	}

	,DateTime :(value) => {
		if((value===undefined) || (value===null) || (value==="")){return []}
		const resultNegative = [`está com o um formato de data inválido ${!!!value?"":`('${value}')` }`];
		if (typeof value !== 'string') return [`está com tipo de dado inválido para Data e Hora (${typeof value !== 'string'})`];

		// Regex para validar formato de data e hora YYYY-MM-DDTHH:MM:SS ou DD/MM/YYYY HH:MM:SS
		const regex = /^(?:\d{4}-\d{2}-\d{2}T[01]\d:[0-5]\d:[0-5]\d)|(?:\d{2}\/\d{2}\/\d{4} [01]\d:[0-5]\d:[0-5]\d)$/;
		if (regex.test(value)) {
			const date = new Date(value);
			return !isNaN(date)?[]:resultNegative;
		}
		return false;
	}

	,numericOnlyDigits: (value)=>{
		if((value===undefined) || (value===null) || (value==="")){return []}
		const regex = /^\d+$/;
		return regex.test(value)?[]:["precisa ter somente dígitos"];
	}
/*
	,numericOnly
	,numericOnlyDigits : 6
	,numericOnlyPositive : 7
	,numericMonetary : 8
*/
	,CEP : (value) => {
		if((value===undefined) || (value===null) || (value==="")){return []}
		if (typeof value !== 'string' && typeof value !== 'number') return false;

		// Regex para validar formato de data YYYY-MM-DD ou DD/MM/YYYY
		const regex = /^(?:\d{5}-\d{3})$/;
		return regex.test(value);
	}
	,RG: (value)=>{
		if((value===undefined) || (value===null) || (value==="")){return []}
		if(value.length<5){return ["RG deve ter no mínimo 5 Digitos"];}
		return [];
	}
	,CPF : (value)=>{
		if((value===undefined) || (value===null) || (value==="")){return []}
		if(value.length<10){return ["precisar ter, no mínimo, 10 digítos."];}
		
		let strValidMailChar = '1234567890';
		let arrInvalidChas=[];
		let arrCharsRemove=["-","."," "];
		var ix = 0;

		for(ix=0;ix<arrCharsRemove.length;ix++){while(value.indexOf(arrCharsRemove[ix])>=0){value=value.replace(arrCharsRemove[ix],"");}}
		for(ix=0;ix<value.length;ix++){
			if(strValidMailChar.indexOf(value.substr(ix,1).toUpperCase())<0){arrInvalidChas.push(value.substr(ix,1));}
		}
		if(arrInvalidChas.length){return ["Caractere(s) inválido(s) para CPF "+arrInvalidChas.join(",")];}

		if(value.length===10){value= "0" + value;}
		var strBase 	= value.substr(0,9);
		var strVerif 	= value.substr(9,2);
		var intTotal1,intTotal2,intDigit1,intDigit2;
		intTotal1=0;
		intTotal2=0;
		for(ix=0;ix<=8;ix++){
			intTotal1+=((10-ix)*parseInt(strBase.substr(ix,1)));
			intTotal2+=((11-ix)*parseInt(strBase.substr(ix,1)));
		}
		intDigit1=((intTotal1*10)%11);
		if(intDigit1===10){intDigit1=0;}
		intTotal2 += (intDigit1*2);
		intDigit2=((intTotal2*10)%11);
		if(intDigit2===10){intDigit2=0;}
		intDigit1=(intDigit1*10)+intDigit2;
		if(intDigit1!==parseInt(strVerif)){return ["digitos verificadores não estão corretos"];}
	}
	,CNPJ: (value)=> {
		if((value===undefined) || (value===null) || (value==="")){return []}
		const erros = [];
		if (/[^0-9.\-/]/.test(value)) {
			erros.push("contém caracteres não numéricos.");
			return erros;
		}
		if (value.length !== 14) {
			erros.push("deve ter 14 dígitos.");
			return erros;
		}

		const cnpjsInvalidos = [
			"00000000000000",
			"11111111111111",
			"22222222222222",
			"33333333333333",
			"44444444444444",
			"55555555555555",
			"66666666666666",
			"77777777777777",
			"88888888888888",
			"99999999999999"
		];

		if (cnpjsInvalidos.includes(value)) {
			erros.push("inválido.");
			return erros;
		}

		const validarDigito = (value, pos) => {
			let numeros = value.substring(0, pos);
			let soma = 0;
			let posMultiplicador = pos - 7;

			for (let i = pos; i >= 1; i--) {
				soma += numeros.charAt(pos - i) * posMultiplicador--;
				if (posMultiplicador < 2) {
				posMultiplicador = 9;
				}
			}

			const resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
			return resultado === parseInt(value.charAt(pos));
		};

		if (!validarDigito(value, 12)) {erros.push("Dígito verificador 1 inválido.");}	 
		if (!validarDigito(value, 13)) {erros.push("Dígito verificador 2 inválido.");}

		return erros;
	}
	,Email:(value)=>{
		if((value===undefined) || (value===null) || (value==="")){return []}
		let result =[];
		if(value.indexOf("@")<0){result.push("E-MAIL sem o Domínio '@algo.com'");}
		else if(value.indexOf("@")<3){result.push("E-MAIL precisa ter 3 caractéres antes do '@' (Arroba)");}
		else if(value.indexOf(".",value.indexOf("@"))<(value.indexOf("@")+2)){result.push("precisa ter '.' (ponto) após o '@' (Arroba)");}
		var strValidMailChar = '1234567890-_.@ABCDEFGHIJKLMNOPQRSTUVXYWZ';
		var ix=0;
		var intArrobCont=0;
		for(ix=0;ix<value.length;ix++){
			if(strValidMailChar.indexOf(value.substr(ix,1).toUpperCase())<0){result.push("Caractere inválido para email (<b>"+value.substr(ix,1)+"</b>)");}
			intArrobCont = intArrobCont + (value.substr(ix,1)==="@"?1:0);
		}
		if(intArrobCont>=2){result.push("Só é permitido haver um '@' (arroba) no e-mail");}
		return result;
	}
	,Phone:(value)=>{
		if((value===undefined) || (value===null) || (value==="")){return []}
		let result = [];
		if(value.length<10){result.push("TELEFONE tem que ter no mínimo 10 dígitos");}
		else{
			var arrDDD = ['11','12','13','14','15','16','17','18','19','21','22','24','27','28','31','32','33','34','35','37','38','41','42','43','44','45','46','47','48','49','51','53','54','55','61','62','63','64','65','66','67','68','69','71','73','74','75','77','79','81','82','83','84','85','86','87','88','89','91','92','93','94','95','96','97','98','99'];
			var ix = 0;
			var blnExists = false;
			for(ix=0;ix<arrDDD.length;ix++ ){ blnExists = blnExists || (arrDDD[ix]===value.substr(0,2)); }
			if(!blnExists){result.push("TELEFONE Está com DDD inválido");}
		}
		var strValidMailChar = '1234567890';
		for(ix=0;ix<value.length;ix++){
			if(strValidMailChar.indexOf(value.substr(ix,1).toUpperCase())<0){result.push("Caractere inválido para Celular (<b>"+value.substr(ix,1)+"</b>)");}
		}
		return result;
	}
	//,Mobile:15
	,Password: (value)=>{
		if((value===undefined) || (value===null) || (value==="")){return []}
		if(value){value=value.trim();}
		let result = [];
		const lengthMin = 6;
		const lengthMax = 20;
		if(value.length<lengthMin||value.length>lengthMax){result.push(`precisa ter entre ${lengthMin} e ${lengthMax} caractéres alfanumericos`);}

		const strLettersTiny	="abcdefghijklmnopqrstuvxywz";
		const strLettersCapital="ABCDEFGHIJKLMNOPQRSTUVXYWZ";
		const strNumbersChas	="0123456789";
		const strNoSpecialChars=strLettersTiny+strLettersCapital+strNumbersChas;
		let ix =0;
		let qtdTinyChars=0;
		let qtdCapitalChars=0;
		let qtdNumbersChas=0;
		let qtdSpecialChas=0;
		let sequenceCharCodes=[];
		let sequenceQtdData=0;
		let sequenceQtdMaxData=0;
		let strValueUpperCase=value.toUpperCase();
		for(ix=0;ix<value.length;ix++){
			if(strLettersTiny.indexOf(		value.substr(ix,1))>=0){qtdTinyChars	++;}
			if(strLettersCapital.indexOf(	value.substr(ix,1))>=0){qtdCapitalChars++;}
			if(strNumbersChas.indexOf(		value.substr(ix,1))>=0){qtdNumbersChas	++;}
			if(strNoSpecialChars.indexOf(	value.substr(ix,1))< 0){qtdSpecialChas	++;}
			sequenceCharCodes.push(strValueUpperCase.charCodeAt(ix));
		}
		var sequenceCharCodesDiference=[sequenceCharCodes[0]];
		for(ix=0;ix<sequenceCharCodes.length-1;ix++){sequenceCharCodesDiference.push((ix<=0?sequenceCharCodesDiference[0]:sequenceCharCodes[ix])-sequenceCharCodes[ix+1]);}
		for(ix=1;ix<sequenceCharCodesDiference.length;ix++){
			if(sequenceCharCodesDiference[ix-1]===sequenceCharCodesDiference[ix]){
				if(sequenceQtdData<=0){sequenceQtdData=2;}
				else{sequenceQtdData++;}
			}else{sequenceQtdData=0;}
			if(sequenceQtdData>sequenceQtdMaxData){sequenceQtdMaxData=sequenceQtdData;}
		}
		if(!qtdTinyChars			){result.push("precisa ter no mínimo 1 caractéres minúsculo");}
		//if(!qtdCapitalChars		){result.push("precisa ter no mínimo 1 caractéres maiúsculo");}
		if(!qtdNumbersChas		){result.push("precisa ter no mínimo 1 dígito numérico");}
		//if(!qtdSpecialChas		){result.push("precisa ter no mínimo 1 caractéres especial");}

		return result;
	}
}

export const enumCommonVarType ={
	 basicString 	: 0 //default
	,basicObject 	: 1
	,basicInteger 	: 2
	,basicLong 		: 3
	,basicDecimal 	: 4
	,basicDouble 	: 5
	,basicDateTime : 6
	,basicBool 		: 7
}
export default function useValidationsDefaults(){
	const getFieldValidationList=(fields)=>{
		
		if(isObjectEmpty(fields)){throw new ExceptionSystemDefault("objeto de Campos de Validação sem conteúdo");}
		const fieldsName = Object.getOwnPropertyNames(fields);
		const ValidationBasicRulesFunctionNames = Object.getOwnPropertyNames(enumValidationBasicRules);
		const resultGeneral = {};
		let isFirstInvalidFieldFocused = false;

		fieldsName.forEach((fieldName,fieldIndex)=>{
			let resultField = [];
			// o return aqui tem o mesmo efeito de um continue
			if(!("refValue" in fields[fieldName])){return;}
			let thisField = fields[fieldName];
			let thisFieldRef = thisField.refValue;
			let thisFieldValue = thisFieldRef.current.inputRef.current.value;

			if(!("Validation" in thisField) || isObjectEmpty(thisField.Validation)){return;}
			let fieldValidation = thisField.Validation;
			
			if(("valueMin" in fieldValidation) && (thisFieldValue<fieldValidation.valueMin)){
				resultField.push(`Valor abaixo do mínimo (${fieldValidation.valueMin})`);
			}
			
			if(("valueMax" in fieldValidation) && (thisFieldValue>fieldValidation.valueMax)){
				resultField.push(`Valor abaixo do mínimo (${fieldValidation.valueMax})`);
			}

			if(("lengthMin" in fieldValidation) && (thisFieldValue.length<fieldValidation.lengthMin)){
				resultField.push(`Mínimo de (${fieldValidation.lengthMin}) caractéres`);
			}

			if(("lengthMax" in fieldValidation) && (thisFieldValue.length>fieldValidation.lengthMax)){
				resultField.push(`Máximo de (${fieldValidation.lengthMax}) caractéres`);
			}

			if(("basicRules" in fieldValidation) && Array.isArray(fieldValidation.basicRules) && (fieldValidation.basicRules.length>0)){
				fieldValidation.basicRules.forEach((validationRule,validationIndex)=>{
					ValidationBasicRulesFunctionNames.forEach((functionName, functionIndex)=>{
						if(validationRule.trim().toUpperCase()!==functionName.trim().toUpperCase()){return;}
						let validationTmpResult = enumValidationBasicRules[functionName](thisFieldValue);
						if(validationTmpResult.length>0){
							resultField = resultField.concat(validationTmpResult);
							if(!isFirstInvalidFieldFocused && fieldsName.length >1){
								isFirstInvalidFieldFocused=true;
								thisFieldRef.current.setFocus();
								thisFieldRef.current.scrollIntoView();
							}
						}
					})
				})
			}

			if(resultField.length>0){
				resultGeneral[fieldName]=resultField;
				thisFieldRef.current.statusMessage_setWarning(resultField);
			}else{
				thisFieldRef.current.statusMessage_setNormal("");
			}

		});
		return resultGeneral;
	}

	const isFieldsValid=(fields)=>{
		const  resultValid = getFieldValidationList(fields);
		const  errorFieldsList = Object.getOwnPropertyNames(resultValid);
		return errorFieldsList.length<=0;
	}

	return {getFieldValidationList,isFieldsValid}
}
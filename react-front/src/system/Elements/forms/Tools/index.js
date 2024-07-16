import { isObjectEmpty } from "../../../Libs/Objects";
import { ExceptionSystemDefault } from "../../../Components/Exceptions";

export const formTools ={
	getObjectFromFormData:(fields)=>{		
		if(isObjectEmpty(fields)){throw new ExceptionSystemDefault("objeto de Campos de Validação sem conteúdo");}
		const fieldsName = Object.getOwnPropertyNames(fields);
		const resultGeneral = {};
		fieldsName.forEach((fieldName,fieldIndex)=>{
			if(!("refValue" in fields[fieldName])){return;}
			if(!("fieldID" in fields[fieldName])){return;}

			// console.log("fields[fieldName].refValue.current.inputRef.current.type.toUpperCase()",fields[fieldName].refValue.current.inputRef.current.type.toUpperCase());
			if(fields[fieldName].refValue.current.inputRef.current.type.toUpperCase()==="CHECKBOX"){
				resultGeneral[fields[fieldName].fieldID] = fields[fieldName].refValue.current.inputRef.current.checked;
			}else{
				resultGeneral[fields[fieldName].fieldID] = fields[fieldName].refValue.current.value;
			}
		});
		return resultGeneral;
	}
}
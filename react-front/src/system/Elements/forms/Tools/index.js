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

			let thisField = fields[fieldName];

			if(fields[fieldName].refValue.current.inputRef.current.type.toUpperCase()==="CHECKBOX"){
				resultGeneral[fields[fieldName].fieldID] = fields[fieldName].refValue.current.inputRef.current.checked;
			}else{
				if(	("Validation" in thisField) 
					&& (isObjectEmpty(thisField.Validation))
					&& ("basicRules" in thisField.Validation)
					&& (thisField.Validation.basicRules.includes("NotNull"))){
					
					resultGeneral[fields[fieldName].fieldID] = fields[fieldName].refValue.current.inputRef.current.value;
				}else{
					resultGeneral[fields[fieldName].fieldID] = !fields[fieldName].refValue.current.inputRef.current.value?null:fields[fieldName].refValue.current.inputRef.current.value
				}
			}
		});
		return resultGeneral;
	}

	,loadDataObjectToForm:(fields, values)=>{
		if(isObjectEmpty(fields)){throw new ExceptionSystemDefault("objeto de Campos de Carga sem conteúdo");}
		const fieldsName = Object.getOwnPropertyNames(fields);
		fieldsName.forEach((fieldName,fieldIndex)=>{
			if(!("refValue" in fields[fieldName])){return;}
			if(!("fieldID" in fields[fieldName])){return;}
			if(!(fields[fieldName].fieldID in values)){return;}

			if(fields[fieldName].refValue.current.inputRef.current.type.toUpperCase()==="CHECKBOX"){
				fields[fieldName].refValue.current.inputRef.current.checked = values[fields[fieldName].fieldID];
			}else{
				fields[fieldName].refValue.current.inputRef.current.value = values[fields[fieldName].fieldID];
			}
		})
	}
}
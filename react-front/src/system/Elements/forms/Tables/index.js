import { forwardRef, useImperativeHandle, useState } from 'react';

///temporary
import { fieldsTbFieldsConfig } from '../../../../pages/private/Field';

import './index.css';
import { isObjectEmpty } from '../../../Libs/Objects';

const GetHeadersInputs = (props)=>{
	return(
		<thead>
			<tr>
			{ 	Object.getOwnPropertyNames(props.fields).map((fieldName,fieldIndex)=>{
					let fieldProp = props.fields[fieldName];
					let inputLabel = fieldProp.fieldID;

					if(	("tinyTable" in fieldProp) && (!isObjectEmpty(fieldProp.tinyTable)) 
						&& ("labelText" in fieldProp.tinyTable)){
							inputLabel = fieldProp.tinyTable.labelText
					}
					return (<th key={`header_${fieldIndex}`} >{inputLabel}</th>)
				})
			}
			<th>...</th>
			</tr>
		</thead>
	)
}

const GetBodysInputs = (props,datas)=>{
	return(
		<tbody>
			<tr>
			{ 	Object.getOwnPropertyNames(props.fields).map((fieldName,fieldIndexX)=>{
					let inputType = 'text';
					let fieldProp = props.fields[fieldName];
					let inputProp = {};

					if(	("tinyTable" in fieldProp) && (!isObjectEmpty(fieldProp.tinyTable)) ){
						if ("inputType" in fieldProp.tinyTable) {inputType = fieldProp.tinyTable.inputType}
						if ("inputProp" in fieldProp.tinyTable) {inputProp = fieldProp.tinyTable.inputProp}
					}

					if(	("Validation" in fieldProp) && (!isObjectEmpty(fieldProp.Validation))){
						if("lengthMax" in fieldProp.Validation && (inputType==="text")){inputProp.maxLength = fieldProp.Validation.lengthMax}
					}

					if(inputType==="select"){
						return (<th key={`newFieldRow_${fieldIndexX}`} >
							<select key={`newFieldInput_${fieldIndexX}`} {...inputProp}>
							<option></option>
								{ fieldProp.tinyTable.selectOptions &&
									fieldProp.tinyTable.selectOptions.map((optionVal,optionValIndexZ)=>{
										return (<option  key={`newFieldOption_${fieldIndexX}_${optionValIndexZ}`} >{optionVal}</option>)
									})
								}
							</select>
						</th>)
					}else{
						return (<th key={`newFieldRow_${fieldIndexX}`} >
							<input key={`newFieldinput_${fieldIndexX}_input`} type={inputType} {...inputProp}/>
						</th>)
					}
				})
			}

			<th>x</th>
			</tr>
		</tbody>
	)
}

export const TableDinamoFieldDefault = forwardRef(({children, ...props}, ref)=>{
	const [rowInputs, setRowInputs ] = useState({});

	const getGridRowsInputList=()=>{ return (rowInputs);}
	const setGridRowsInputList=(inputRows)=>{ setRowInputs(inputRows);}

	useImperativeHandle(ref, () => {
		return{
			 getGridRowsInputList
			,setGridRowsInputList
		}
	},[]);

	return(
		<div className="fixTableHead wtdhGeneral_duz24pc_24" style={{border: "1px solid black", borderRadius: "5px"}}>
			<table className="wtdhGeneral_duz24pc_24">
				<GetHeadersInputs fields={fieldsTbFieldsConfig}/>
				<GetBodysInputs 	fields={fieldsTbFieldsConfig} datas={[]}/>
			</table>
		</div>
	)
})
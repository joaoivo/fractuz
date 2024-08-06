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

					if(	("tinyTable" in fieldProp) && (!isObjectEmpty(fieldProp.tinyTable)) 
						&& ("inputType" in fieldProp.tinyTable)){
							inputType = fieldProp.tinyTable.inputType
					}
					return (<th key={`newField_${fieldIndexX}`} >
						<input key={`newField_${fieldIndexX}_input`} type={inputType}/>
					</th>)
				})
			}
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
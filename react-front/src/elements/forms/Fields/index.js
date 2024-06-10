import { isObjectEmpty } from "../../../system/Libs/Objects"

export const defaultFieldProperties = {
	 fields:{
		idPrefix:"lbl"
	}
}

export const getFieldLabelTagID = (props)=>{
	let returnText = defaultFieldProperties.fields.idPrefix
	if(!isObjectEmpty(props) && 'params' in props){returnText+=props.params.fieldID}
	return returnText;
}

export const getFieldLabelText =(props)=>{
	let returnText = "";
	if(!isObjectEmpty(props) && 'params' in props){returnText+=props.params.labelText}
	return returnText;
}

export const getFieldLabelStyle =(props)=>{
	let returnObj = {
		 display:"block"

		,border:"1px solid black"
		,borderRadius:"5px"

		,margin:"3px"
		,padding:"3px"
	};

	if(!isObjectEmpty(props) && 'params' in props){
		if(!isObjectEmpty(props.params) && 'fieldLabelStyle' in props.params){
			Object.keys(props.params.fieldLabelStyle).forEach((key, index)=>{
				returnObj[key]=props.params.fieldLabelStyle[key];
			})
		}
	}

	return returnObj;
}

export const LayoutFieldDefault=({children,props})=>{
	return(
		<label id={getFieldLabelTagID(props)} style={getFieldLabelStyle(props)}>
			<div>
				<span>{getFieldLabelText(props)}:</span>
				<span>{typeof children==='function'? children() : children}</span>
			</div>
			<div></div>
		</label>
	)
}
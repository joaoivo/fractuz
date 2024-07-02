import { forwardRef, useImperativeHandle, useState } from 'react';
import { isObjectEmpty } from "../../../Libs/Objects"

export const setFormFieldValuesStates =(formFieldStates,setStateFormFieldFunction,event,key)=>{
	const dataTemp = formFieldStates;
	dataTemp[key] = event.target.value;
	setStateFormFieldFunction(dataTemp);
}

export const LayoutFieldDefault= forwardRef(({children, ...props}, ref)=>{

	const [statusMessage		, statusMessage_set ] = useState([]);
	const [fieldStyleTheme	, fieldStyleTheme_set ] = useState("normal");

	const setInternalStatusMessage =(message)=>{
		if(typeof message === "string"){statusMessage_set([message]);}
		else if(Array.isArray(message)){statusMessage_set( message );}
	}

	const stylesThemes = {
		 normal:{
			 label	:{border:"1px solid black"}
			,message	:{
				 border:"0px solid #00000000"
				,backgroundColor:"#00000000"
			}
		}
		,warning:{
			 label	:{
				 border:"1px solid orange"
				,backgroundColor:"#ff440055"
			}
			,message	:{
				 border:"1px solid #ff440066"
				,backgroundColor:"#ff440099"
			}
		}
		,error:{
			label		:{border:"1px solid red"}
		  ,message	:{border:"1px solid #aa5500ff"}
	  }
	}

	const getFieldDivMessageStyle= () =>{
		let result = stylesThemes[fieldStyleTheme].message;
		result["fontSize"]="12px";
		result["padding"]="3px";
		result["borderBottomLeftRadius"]="8px";
		result["borderBottomRightRadius"]="8px";
		result["marginTop"]="2px";
		result["maxHeight"]="40px";
		result["overflowY"]=statusMessage.length<=0?"hidden":"scroll";
		result["display"]="block";
		result["transition"]="background-color 0.4s, height 0.3s";

		return result;
	}

	useImperativeHandle(ref, () => {
		return{
			 statusMessage
			,statusField_setNormal(message){setInternalStatusMessage(message);	fieldStyleTheme_set("normal")}
			,statusField_setWarning(message){setInternalStatusMessage(message);fieldStyleTheme_set("warning")}
			,statusField_setError (message){setInternalStatusMessage(message);	fieldStyleTheme_set("error")}
		}
	},[statusMessage]);

	const defaultFieldProperties = {
		fields:{
			idPrefix:"lbl"
		}
	}

	const getFieldLabelTagID = (props)=>{
		let returnText = defaultFieldProperties.fields.idPrefix
		if(!isObjectEmpty(props) && 'params' in props){returnText+=props.params.fieldID}
		return returnText;
	}

	const getFieldLabelText =(props)=>{
		let returnText = "";
		if(!isObjectEmpty(props) && 'params' in props){returnText+=props.params.labelText}
		return returnText;
	}

	const getFieldLabelStyle =(props)=>{
		let returnObj = {
			 display:"block"

			,border:"1px solid black"
			,borderRadius:"5px"

			,margin:"3px"
			,padding:"3px"
			,transition: "background-color 0.4s"
		};

		if(!isObjectEmpty(props) && 'params' in props){
			if(!isObjectEmpty(props.params) && 'fieldLabelStyle' in props.params){
				Object.keys(props.params.fieldLabelStyle).forEach((key, index)=>{
					returnObj[key]=props.params.fieldLabelStyle[key];
				})
			}
		}

		let styleFromStatus = stylesThemes[fieldStyleTheme];
		if(!isObjectEmpty(styleFromStatus) && 'label' in styleFromStatus){
			Object.keys(styleFromStatus.label).forEach((key, index)=>{
				returnObj[key]=styleFromStatus.label[key];
			})
		}

		return returnObj;
	}

	return(
		<label id={getFieldLabelTagID(props)} style={getFieldLabelStyle(props)}>
			<div>
				<span style={{color:"#000000cc", fontSize:"14px",fontStyle:"italic"}}>{getFieldLabelText(props)}:</span>
				<span>{typeof children==='function'? <children {...props}/> : children}</span>
			</div>
			<div style={getFieldDivMessageStyle()}>
				{statusMessage.map((message, index)=>{return <div key={index}>{message}</div>})}
			</div>
		</label>
	)
})
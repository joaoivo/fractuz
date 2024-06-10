import { isObjectEmpty } from "../../../system/Libs/Objects"


export const defaultButtonProperties = {
	Buttons:{
		idPrefix:"btn"
	}
}

export const getButtonLabelTagID = (props)=>{
	let returnText = defaultButtonProperties.Buttons.idPrefix
	if(!isObjectEmpty(props) && 'params' in props){returnText+=props.params.ButtonID}
	return returnText;
}

export const getButtonLabelText =(props)=>{
	let returnText = "";
	if(!isObjectEmpty(props) && 'params' in props){returnText+=props.params.labelText}
	return returnText;
}

export const getButtonLabelStyle =(props)=>{
	let returnObj = {
		display:"block"

		,border:"1px solid black"
		,borderRadius:"5px"

		,margin:"3px"
		,padding:"3px"
	};

	if(!isObjectEmpty(props) && 'params' in props){
		if(!isObjectEmpty(props.params) && 'ButtonLabelStyle' in props.params){
			Object.keys(props.params.ButtonLabelStyle).forEach((key, index)=>{
				returnObj[key]=props.params.ButtonLabelStyle[key];
			})
		}
	}

	return returnObj;
}




export const LayoutButtonDefault=({children,...props})=>{
	console.log("props",props);
	console.log("children",children);
	const internalOnClick = (event)=>{
		
		if(isObjectEmpty(props)){return;}
		console.log("foi")
		if(("onClickEvent" in props) && (typeof props.onClickEvent==='function')){
			props.onClickEvent(event);
		}
	}

	return(
		<button id={getButtonLabelTagID(props)} style={getButtonLabelStyle(props)} onClick={internalOnClick}>
			<span>{typeof children==='function'? children() : children}</span>
		</button>
	)
}
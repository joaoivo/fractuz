import React, { useState } from 'react';

import {LayoutFieldDefault} from '../index'
import { isObjectEmpty } from '../../../../system/Libs/Objects';

export function TextFieldDefault(props){

	const [textValue, setTextValue] = useState('');
	const getValue = () =>{return(textValue);}
	const setValue = (value)=>{setTextValue(value)}

	const internalOnKeyPressed = (event)=>{
		setTextValue(event.target.value);
		if(isObjectEmpty(props)){return;}

		if(("onKeyPressEvent" in props) && (typeof props.onKeyPressEvent==='function')){props.onKeyPressEvent(event);}
	}

	return(
		<LayoutFieldDefault props={props}>
			<input type='text' value={textValue} onChange={internalOnKeyPressed} style={{width:"100%"}}/>
		</LayoutFieldDefault>
	)
}
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import {LayoutFieldDefault} from '../index'

export const TextFieldDefault = forwardRef(({children, ...props}, ref)=>{

	const inputRef = useRef(null);
	const inputLayoutRef = useRef(null);
	const [value, setValue ] = useState("");

	useImperativeHandle(ref, () => {
		return{
			 setFocus(){inputRef.current.focus();inputRef.current.scrollIntoView();}
			,scrollIntoView(){inputRef.current.scrollIntoView();}
			,inputRef
			,value
			,setValue

			,statusMessage_clean			(){inputLayoutRef.current.statusMessage_set("");}
			,statusMessage_set			(message){inputLayoutRef.current.statusMessage_set(message);}
			,statusMessage_setNormal	(message){inputLayoutRef.current.statusField_setNormal(message);}
			,statusMessage_setWarning	(message){inputLayoutRef.current.statusField_setWarning(message);}
			,statusMessage_setError		(message){inputLayoutRef.current.statusField_setError(message);}
		}
	},[value]);

	return(
		<LayoutFieldDefault {...props} ref={inputLayoutRef}>
			<input type='text' ref={inputRef} value={value} onChange={(e)=>{setValue(e.target.value)}} style={{width:"100%", backgroundColor:"#ffffff88", border:"0px solid #ffffff11", borderRadius:"4px", padding:"4px",outline:"none"}}/>
		</LayoutFieldDefault>
	)
})
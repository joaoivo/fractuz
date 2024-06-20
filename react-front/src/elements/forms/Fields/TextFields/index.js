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
			,setStatusMessage(message){inputLayoutRef.current.setStatusMessage(message);}
			,cleanStatusMessage(){inputLayoutRef.current.setStatusMessage("");}

		}
	},[value]);

	return(
		<LayoutFieldDefault {...props} ref={inputLayoutRef}>
			<input type='text' value={value} onChange={(e)=>{setValue(e.target.value)}} style={{width:"100%"}}/>
		</LayoutFieldDefault>
	)
})
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import {LayoutFieldDefault} from '../index'
import useValidationsDefaults from '../../../../Components/Validations'

export const CheckboxFieldDefault = forwardRef(({children, ...props}, ref)=>{
	const { isFieldsValid } = useValidationsDefaults();

	const inputRef = useRef(null);
	const inputLayoutRef = useRef(null);
	const [value, setValue ] = useState(false);

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
			<input type='checkbox' 
				ref={inputRef}
				value={value}
				
				onChange={(e)=>{setValue(e.target.value)}}
				onBlur={()=>{isFieldsValid({field:props.params})}}
				
				style={{
					width:"100%"
					, backgroundColor:"#ffffff88"
					, border:"0px solid #ffffff11"
					, borderRadius:"4px"
					, marginTop:"6px"
					, outline:"none"
					, transform: "scale(2)"
				}}

			/>
		</LayoutFieldDefault>
	)
});
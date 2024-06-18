import {LayoutFieldDefault} from '../index'
import { isObjectEmpty } from '../../../../system/Libs/Objects';

export function TextFieldDefault(props){

	const internalOnChanged = (event)=>{
		if(isObjectEmpty(props)){return;}
		if(	!isObjectEmpty(props) 
			&& 'params' 			in props
			&& 'onChangeEvent' in props.params
			&& (typeof props.params.onChangeEvent==='function')){

			props.params.onChangeEvent(event);
		}
	}

	const getEvent_internalOnChanged=(props)=>{
		if(	!isObjectEmpty(props) 
			&& 'params' 			in props
			&& 'onChangeEvent' in props.params){

			return internalOnChanged;
		}
		return ()=>{};
	}
	return(
		<LayoutFieldDefault props={props}>
			<input type='text' value={props.params.value || ''} onChange={getEvent_internalOnChanged(props)} style={{width:"100%"}}/>
		</LayoutFieldDefault>
	)
}
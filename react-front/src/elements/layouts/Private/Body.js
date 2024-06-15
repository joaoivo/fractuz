import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useContextConsole } from '../../../system/Contexts/Console';
import { isArrayEmptyOrNull } from '../../../system/Libs/Arrays';

export const LayoutPrivateBody = forwardRef(({children, ...props}, ref) => {
	const { addHistory } = useContextConsole();
	const [formMessages	, setFormMessages	] = useState([]);

	function MessagesToPanel_get 	(){return formMessages}
	function MessagesToPanel_clean(){setFormMessages([])}
	function MessagesToPanel_set 	(val){
		const processedVal = typeof val === "string" ? [val] : val;
		setFormMessages(processedVal);
	}

	function MessagesToPanel_add 	(val){
		let data = []
		if(!isArrayEmptyOrNull(formMessages) || Array.isArray(formMessages)){data = formMessages;}
		addHistory(val);
		data.push(val);
		setFormMessages(data);
	}

	useImperativeHandle(ref, () => ({
		MessagesToPanel_get,
		MessagesToPanel_clean,
		MessagesToPanel_set,
		MessagesToPanel_add
	}));

	return (
		<div className="wtdhGeneral_duz24vw_20" style={{border :"1px solid gray", borderRadius: "10px", padding: "5px" }}>
			<h1>{props && props.title && props.title}</h1>
			<hr/>
			<div style={{width:"100%"}}>
				{children}
			</div>
			{formMessages.length > 0 && 
				<div><hr/>
					<div>Messages</div>
					{formMessages.map((message, index)=>{return <div key={index}>{message}</div>})}
				</div>
			}
		</div>
	);
});
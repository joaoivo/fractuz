import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useContextConsole } from '../../../system/Contexts/Console';
import { isArrayEmptyOrNull } from '../../../system/Libs/Arrays';

export const LayoutPrivateBody = forwardRef(({children, ...props}, ref) => {
	const { addHistoryLog } = useContextConsole();
	const [formMessages, setFormMessages	] = useState([]);

	React.useEffect(() => {
		document.addEventListener("keydown", function (event) {
			if (event.keyCode !== 13 || (event.target.nodeName !== "INPUT" && event.target.nodeName !== "BUTTON")) {return;}
			var divForm = document.getElementById("divForm");
			var form = [... divForm.querySelectorAll('input'),
							... divForm.querySelectorAll('button')];
			if(form.length <=1){return;}

			var index = Array.prototype.indexOf.call(form, event.target);
			index++;
			if(index>=form.length){index=(form.length % (index));}
			form[index].focus();
		});
	}, [])

	function MessagesToPanel_get 	(){return formMessages}
	function MessagesToPanel_clean(){setFormMessages([])}
	function MessagesToPanel_set 	(val){

		let processedVal = [];
		if(typeof val === "string"){
			processedVal = [val];
			addHistoryLog(val);
		}else if(Array.isArray(val)){
			processedVal = val;
			addHistoryLog(val[val.length-1]);
		}else{
			processedVal = [val.toString()];
			addHistoryLog(val.toString());
		}

		setFormMessages(processedVal);
	}

	function MessagesToPanel_add 	(val){
		let data = []
		if(!isArrayEmptyOrNull(formMessages) || Array.isArray(formMessages)){data = formMessages;}
		addHistoryLog(val);
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
		<div id="divForm" className="wtdhGeneral_duz24pc_24" style={{border :"1px solid gray", borderRadius: "10px", padding: "5px" }}>
			<h1>{props && props.title && props.title}</h1>
			<hr/>
			<div style={{width:"100%"}}>
				{children}
			</div>
			{formMessages.length > 0 && 
				<div className="wtdhGeneral_duz24pc_24" style={{padding:"10px"}}><hr/>
					<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
						<span><h2>Mensagens</h2></span>
						<button onClick={MessagesToPanel_clean}>X</button>
					</div>
					<div>
						{formMessages.map((message, index)=>{return <div key={index}>{message}</div>})}
					</div>
				</div>
			}
		</div>
	);
});
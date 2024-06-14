import { createContext, useContext , useState } from 'react';
import { useContextConsole } from '../../../system/Contexts/Console';
import { isArrayEmptyOrNull } from '../../../system/Libs/Arrays';

const ContextPrivadeLayoutBody = createContext({});

export function ContextPrivadeLayoutBodyProvider({ children,...props }) {
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

	return (
		<ContextPrivadeLayoutBody.Provider value={{ MessagesToPanel_get,MessagesToPanel_set,MessagesToPanel_clean,MessagesToPanel_add }}>
			<div className="wtdhGeneral_duz24vw_20" style={{border :"1px solid gray", borderRadius:"5px", margin:"5px", display:"block" }}>
				<h1>{props && props.title && props.title}</h1>
				<hr/>
				<div>
					{children}
				</div>
				{formMessages.length > 0 && 
					<div><hr/>
						<div>Messages</div>
						{formMessages.map((message, index)=>{return <div key={index}>{message}</div>})}
					</div>
				}
			</div>
		</ContextPrivadeLayoutBody.Provider>
	);
}

export function useContextPrivadeLayoutBody(){
	return useContext(ContextPrivadeLayoutBody);
}
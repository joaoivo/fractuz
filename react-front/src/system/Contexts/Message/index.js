import React, { createContext, useContext, useRef } from 'react';
import imgLoading00 from './imgs/load00.gif';

const ContextPanelMessage = createContext({});
export function ContextPanelMessageProvider({ children }) {
	const divMessageBoxRef = useRef(null);
	const imgMessageBoxRef = useRef(null);
	const divBoxMessageHeadersRef = useRef(null);
	const divBoxMessageMessageRef = useRef(null);
	const divBoxMessageDetailsRef = useRef(null);
	const divBoxMessageButtomsRef = useRef(null);

	const jsonMessageType={
		 ok 		:{img:imgLoading00	,header:"OK"				,pnlButtoms:true	,btnOK:true	,btnCancel:false	,backgroundColor:"#0000ff44"}
		,waiting	:{img:imgLoading00	,header:"Aguarde"			,pnlButtoms:false	,btnOK:true	,btnCancel:false	,backgroundColor:"DarkCyan"}
		,warning	:{img:imgLoading00	,header:"Atenção"			,pnlButtoms:true	,btnOK:true	,btnCancel:false	,backgroundColor:"DarkCyan"}
		,alert	:{img:imgLoading00	,header:"Atenção"			,pnlButtoms:true	,btnOK:true	,btnCancel:true	,backgroundColor:"yellow"}
		,cuidado	:{img:imgLoading00	,header:"Cuidado"			,pnlButtoms:true	,btnOK:true	,btnCancel:false	,backgroundColor:"Orange"}
		,prompt	:{img:imgLoading00	,header:"Questionamento",pnlButtoms:true	,btnOK:true	,btnCancel:false	,backgroundColor:"white"}
		,error	:{img:imgLoading00	,header:"Erro"				,pnlButtoms:true	,btnOK:true	,btnCancel:false	,backgroundColor:"Maroon"}
	};

	const messageBoxOpen = (obj,message,tittle,details,buttomOK,buttomCancel) => {
		if(!obj){return;}
		if (!divMessageBoxRef.current) {return;}
		divMessageBoxRef.current.style.display = "flex";
		
		setTimeout(() => {
			if (divMessageBoxRef.current) {
				divMessageBoxRef.current.style.opacity = 1;
			}
		}, 300); // Duration of the transition

		if(message===undefined		){message="";}
		if(details===undefined		){details="";}
		if(buttomOK===undefined		){buttomOK="OK";}
		if(buttomCancel===undefined){buttomCancel="Cancelar";}
		divMessageBoxRef.current.style.backgroundColor = obj.backgroundColor;

		if(imgMessageBoxRef.current){imgMessageBoxRef.current.src=obj.img;}
		
		if(divBoxMessageHeadersRef.current){
			if(tittle!==undefined){divBoxMessageHeadersRef.current.innerHTML=tittle;}
			else if(!("header" in obj)){divBoxMessageHeadersRef.current.innerHTML=obj.header;}
		}

		if(divBoxMessageMessageRef.current && message			){divBoxMessageMessageRef.current.innerHTML=message;}
		if(divBoxMessageDetailsRef.current && details			){divBoxMessageDetailsRef.current.innerHTML=details;}

		if(divBoxMessageButtomsRef.current	){divBoxMessageButtomsRef.current.style.display=obj.pnlButtoms?"flex":"none";}
	};

	const messageBoxClose = () => {
		if (!divMessageBoxRef.current) {return;}
		divMessageBoxRef.current.style.opacity = 0;
		//divMessageBoxRef.current.style.display = "none";
		setTimeout(() => {
			if (divMessageBoxRef.current) {
				divMessageBoxRef.current.style.display = "none";
			}
		}, 300); // Duration of the transition
	};

	function messageBoxOpen_ok			(message,tittle,details){messageBoxOpen(jsonMessageType.ok		,message,tittle,details);}
	function messageBoxOpen_waiting	(message,tittle,details){messageBoxOpen(jsonMessageType.waiting,message,tittle,details);}
	function messageBoxOpen_warning	(message,tittle,details){messageBoxOpen(jsonMessageType.warning,message,tittle,details);}
	function messageBoxOpen_alert		(message,tittle,details){messageBoxOpen(jsonMessageType.alert	,message,tittle,details);}
	function messageBoxOpen_prompt	(message,tittle,details){messageBoxOpen(jsonMessageType.prompt	,message,tittle,details);}
	function messageBoxOpen_error		(message,tittle,details){messageBoxOpen(jsonMessageType.error	,message,tittle,details);}

	return (
		<ContextPanelMessage.Provider value={{messageBoxClose, messageBoxOpen_ok, messageBoxOpen_waiting ,messageBoxOpen_warning
				,messageBoxOpen_alert,messageBoxOpen_prompt,messageBoxOpen_error}}>
			{children}
			<button onClick={()=>messageBoxOpen_ok("mensagem de vitória","deu certo","foi dificil mas chegamos la")}>teste</button>
			<div ref={divMessageBoxRef} className="messageBackground wtdhGeneral_dec10pc_10 generalDisposition_horizDisp_center generalDisposition_verticDisp_center hghtGeneral_dec10pc_10"  style={{opacity:"0", transition: "opacity 0.5s" }}>

				<div id="divMessageBoxPanel" className="generalDisposition_horizDisp_center border" style={{border:"1px solid black",borderRadius: "15px", backgroundColor:"#0055ffdd", padding:"10px"}}>
					<div style={{width:"20%"}}>
						<img ref={imgMessageBoxRef} className="wtdhGeneral_dec10pc_10" style={{maxWidth:"100%"}}/>
					</div>
					<div style={{width:"80%"}}>
						<h1  ref={divBoxMessageHeadersRef} className="wtdhGeneral_dec10pc_10">Aguarde...</h1>
						<h4  ref={divBoxMessageMessageRef} className="wtdhGeneral_dec10pc_10">message</h4>
						<div ref={divBoxMessageDetailsRef} className="wtdhGeneral_dec10pc_10">Details</div>
						<div ref={divBoxMessageButtomsRef} className="wtdhGeneral_dec10pc_10 generalDisposition_horizDisp_center">
							<div className="wtdhGeneral_dec10pc_01"></div>
							<button id="btnBoxMessageCancel" className="general_margin20 wtdhGeneral_dec10pc_04 general_hide" onClick={messageBoxClose}>Cancelar</button>
							<div className="wtdhGeneral_dec10pc_01"></div>
							<button id="btnBoxMessageOK" 		className="general_margin20 wtdhGeneral_dec10pc_04 general_hide" onClick={messageBoxClose}>OK</button>
						</div>
					</div>
				</div>

			</div>
		</ContextPanelMessage.Provider>
	);
}

export function useContextPanelMessage() {
	return useContext(ContextPanelMessage);
}

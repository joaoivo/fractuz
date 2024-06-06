import React, { useState,useEffect } from "react";
import { useContextAuth } from '../../../system/Contexts/Auth';
import { useContextConsole } from "../../../system/Contexts/Console";

export default function Login(){

	const [email,setEmail]=useState('');
	const [password,setPassword]=useState('');

	const {isAuthenticated, logout} = useContextAuth();
	const {addHistoryLog,getCurrentDateTimeStampFormated} = useContextConsole();

	const teste = ()=>{
		addHistoryLog("clicou em entrar");
	}

	return(
		<div>
			<div><label>E-mail:	<input type="email" 		value={email} 		onChange={(e)=>setEmail(e.target.value)}/></label></div>
			<div><label>Password:<input type="password" 	value={password} 	onChange={(e)=>setPassword(e.target.value)}/></label></div>
			<div>
				<button onClick={teste}>Entrar</button>
			</div>
		</div>
	);
}

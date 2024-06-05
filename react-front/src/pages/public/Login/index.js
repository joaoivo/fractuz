import React, { Component,useState,useEffect } from "react";
import { useAuth } from '../../../system/auth';

export default function Login(){

	const [email,setEmail]=useState('');
	const [password,setPassword]=useState('');
	const {alunos, setAlunos, logout} = useAuth();
	

	useEffect(
		()=>{logout();} //didMount
		,[]
	)

	return(
		<div>
			<div><label>E-mail:	<input type="email" 		value={email} 		onChange={(e)=>setEmail(e.target.value)}/></label></div>
			<div><label>Password:<input type="password" 	value={password} 	onChange={(e)=>setPassword(e.target.value)}/></label></div>
			<div>
				<button>Entrar</button>
			</div>
		</div>
	);
}

import { useState } from "react";
import { useContextAuth } from '../../../system/Contexts/Auth';
import { useContextConsole } from "../../../system/Contexts/Console";

import {useApiFractuz} from "../../../components/api/fractus";

import { routesPrivatePages } from "../../routes";
import { goToAddress } from "../../../system/Libs/Urls";

import { TreatmentExceptions } from "../../../components/exception";

export default function Login(){

	const [email,setEmail]=useState('jims_ibr@yahoo.com.br');
	const [password,setPassword]=useState('a1b2c3d4');
	const { getLoginToken } = useApiFractuz();

	const {login, isUserAuthenticated} = useContextAuth();
	const {addHistoryLog} = useContextConsole();
	const {treatExceptions} = TreatmentExceptions();

	const handleLogin = async ()=>{
		try {

			const response = await getLoginToken({mail:email, pass:password});
			if(response.code!==0){
				alert("Login não autorizado. Verifique o status no Log.")
				addHistoryLog(`Login não autorizado: {code:${response.code}, title:${response.tittle}}`);
				return;
			}

			let messages = login(response.dataList[0]);
			if(messages.length>0){ 
				alert("Dados de resposta de login não válidos. Verifique status no LOG!")
				addHistoryLog("Dados de resposta de login não válidos:["+messages.join("<br/>")+"]");
				return;
			}

			if(!isUserAuthenticated()){
				alert("para tudo! que não gravou o login direito")
				addHistoryLog(`o safado não guardou a variavel de sessão`);
				return
			}

			addHistoryLog(`Usuário ${response.dataList[0].name} devidamente logado, redirecionando para a Home`);
			goToAddress(routesPrivatePages.Home.path);

		} catch (error) {
			treatExceptions(error,"Autênticação de Usuário");
		}
	}

	return(
		<div>
			<div><label>E-mail:	<input type="email" 		value={email} 		onChange={(e)=>setEmail(e.target.value)}/></label></div>
			<div><label>Password:<input type="password" 	value={password} 	onChange={(e)=>setPassword(e.target.value)}/></label></div>
			<div>
				<button onClick={handleLogin}>Entrar</button>
			</div>
		</div>
	);
}

import { useState } from "react";
import { useContextAuth } from '../../../system/Contexts/Auth';
import { useContextConsole } from "../../../system/Contexts/Console";

import {useApiFractuz} from "../../../components/api/fractus";

import { routesPrivatePages } from "../../routes";
import { goToAddress } from "../../../system/Libs/Urls";

export default function Login(){

	const [email,setEmail]=useState('jims_ibr@yahoo.com.br');
	const [password,setPassword]=useState('a1b2c3d4');
	const { getLoginToken } = useApiFractuz();

	const {login, isUserAuthenticated, ExceptionContextAuth} = useContextAuth();
	const {addHistoryLog} = useContextConsole();

	const handleLogin = async ()=>{
		try {

			const response = await getLoginToken(email, password);
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

			addHistoryLog(`Usuário ${response.dataList[0].name} devidamente logado, redirecionando para a Home`);

			if(!isUserAuthenticated()){
				alert("para tudo que não gravou o login direito")
				addHistoryLog(`o safado não guardou a variavel de sessão`);
			}

			goToAddress(routesPrivatePages.Home.path);

		} catch (error) {
			alert("Erro ao tentar logar. Verifique o Log.");
			if (error instanceof ExceptionContextAuth) {
				console.error('Exceção personalizada capturada:', error.message);
				console.error('Dados adicionais:', error);

				const errorData = JSON.stringify(error);
				addHistoryLog(`Erro no processo interno de autenticação: Mensagen: '${error.message}' 
					\n dados gerais: '${errorData}'
					\n Stack do Erro '${error.stack}'`);
				return;
			 }
			// Lidar com o erro aqui, se necessário
			alert("Erro ao tentar logar. Verifique status no Log.");
			console.log("Erro ao tentar logar. Verifique status no Log.",error);
			
			addHistoryLog("Erro ao obter o token de login:"+ error);
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

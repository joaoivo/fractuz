import React,{ useRef} from "react";
import { useContextAuth } from '../../../system/Contexts/Auth';
import { useContextConsole } from "../../../system/Contexts/Console";
import { useContextPanelMessage } from "../../../system/Contexts/Message";

import { useApiFractuzUsers } from "../../../components/api/fractus/Users";

import { routesPrivatePages } from "../../routes";
import { goToAddress } from "../../../system/Libs/Urls";

import { TreatmentExceptions } from "../../../components/exception";
import useValidationsDefaults from "../../../system/Components/Validations";

import { LayoutPrivateBody } from "../../../elements/layouts/Private/Body";
import { TextFieldDefault, PassFieldDefault } from '../../../system/Elements/forms/Fields/TextFields';
import { formTools } from "../../../system/Elements/forms/Tools";
import { LayoutButtonDefault } from "../../../system/Elements/forms/Buttons";

export default function Login(){
	const { getLoginToken } = useApiFractuzUsers();
	const { isFieldsValid } = useValidationsDefaults();

	const {login, isUserAuthenticated} = useContextAuth();
	const {addHistoryLog} = useContextConsole();
	const {messageBoxOpen_ok,messageBoxOpen_warning,messageBoxOpen_error} = useContextPanelMessage();
	const {treatExceptions} = TreatmentExceptions();

	const layoutFormRef = useRef(null);
	const refLoginMail= useRef("");
	const refLoginPass= useRef("");

	const loginConfig={
		loginForm:{
			fields:{
				email:{
					labelText:"Email de Login"
					,fieldID:"Mail"
					,refValue:refLoginMail
					,Validation:{
						 lengthMin:3
						,lengthMax:200
						,basicRules:["NotNull","Email"]
					}
				}
				,password:{
					labelText:"Senha de Login"
					,fieldID:"Password"
					,refValue:refLoginPass
					,Validation:{
						 basicRules:["NotNull","Password"]
					}
				}
			}
			,commands:{
				handleLogin : async ()=>{
					try {
						if(!isFieldsValid(loginConfig.loginForm.fields)){
							let message ="O login não pode acontecer devido a dados inválidos. Por favor revise-os para prosseguir.";
							messageBoxOpen_warning(message, "Login não efetuado");
							layoutFormRef.current.MessagesToPanel_set(message);
							return;
						}

						const requestData = formTools.getObjectFromFormData(loginConfig.loginForm.fields);
						const response = await getLoginToken(requestData);

						if(!response.isSuccess){
							let message =`Login não autorizado: ${response.description}`
							messageBoxOpen_warning(message, "Login não efetuado");
							addHistoryLog(message);
							return;
						}
			
						let messages = login(response.dataList[0]);
						if(messages.length>0){ 
							messageBoxOpen_error("Dados de resposta de login não válidos. Verifique status no LOG!")
							addHistoryLog("Dados de resposta de login não válidos:["+messages.join("<br/>")+"]");
							return;
						}
			
						if(!isUserAuthenticated()){
							messageBoxOpen_ok("para tudo! que não gravou o login direito")
							addHistoryLog(`o safado não guardou a variavel de sessão`);
							return
						}
			
						addHistoryLog(`Usuário ${response.dataList[0].name} devidamente logado, redirecionando para a Home`);
						goToAddress(routesPrivatePages.Home.path);
			
					} catch (error) {
						treatExceptions(error,"Autênticação de Usuário");
					}
				}
			}
		}
	}
	return(
		<div className="wtdhGeneral_duz24vw_07">
			<LayoutPrivateBody title="Login de Usuário" ref={layoutFormRef}>
				<div>
					<TextFieldDefault params={loginConfig.loginForm.fields.email} ref={refLoginMail}/>
					<PassFieldDefault params={loginConfig.loginForm.fields.password} ref={refLoginPass}/>
				</div>
				<div>
					<LayoutButtonDefault onClickEvent={loginConfig.loginForm.commands.handleLogin}>Login</LayoutButtonDefault>
				</div>
			</LayoutPrivateBody>
		</div>
	);
}

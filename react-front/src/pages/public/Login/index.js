import React,{ useRef,useEffect} from "react";
import { useContextAuth } from '../../../system/Contexts/Auth';
import { useContextConsole } from "../../../system/Contexts/Console";
import { useContextPanelMessage } from "../../../system/Contexts/Message";


import { routesPrivatePages } from "../../routes";
import { goToAddress } from "../../../system/Libs/Urls";

import { TreatmentExceptions } from "../../../components/exception";
import useValidationsDefaults from "../../../system/Components/Validations";

import { LayoutPrivateBody } from "../../../elements/layouts/Private/Body";
import { TextFieldDefault, PassFieldDefault } from '../../../system/Elements/forms/Fields/TextFields';
import { formTools } from "../../../system/Elements/forms/Tools";
import { LayoutButtonDefault } from "../../../system/Elements/forms/Buttons";

export default function Login(){
	const { isFieldsValid } = useValidationsDefaults();

	const {login} = useContextAuth();
	const {addHistoryLog} = useContextConsole();
	const {messageBoxOpen_ok,messageBoxOpen_warning,messageBoxOpen_error} = useContextPanelMessage();
	const {treatExceptions} = TreatmentExceptions();

	const layoutFormRef = useRef(null);
	const refLoginMail= useRef("");
	const refLoginPass= useRef("");

	useEffect(() => {
		addHistoryLog("Acessada página de login");
	}, []);

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
						let messages = await login(requestData);
						if(messages.length>0){ 
							messageBoxOpen_error("Dados de resposta de login não válidos. Verifique status no LOG!")
							addHistoryLog("Dados de resposta de login não válidos:["+messages.join("<br/>")+"]");
							return;
						}

						addHistoryLog(`Usuário ${requestData.Mail} devidamente logado, redirecionando para a Home`);
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

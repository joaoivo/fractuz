import { useState } from 'react';
import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'

//import { ContextPrivadeLayoutBodyProvider } from '../../../elements/layouts/Private/Body';

import { setFormFieldValuesStates } from '../../../elements/forms/Fields';

import { TextFieldDefault } from '../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } from '../../../elements/forms/Buttons';

import { useApiFractuz } from '../../../components/api/fractus';
import { useContextConsole } from '../../../system/Contexts/Console';
import { useContextPrivadeLayoutBody, ContextPrivadeLayoutBodyProvider } from '../../../elements/layouts/Private/Body';

import { TreatmentExceptions } from '../../../components/exception';

export default function Application(){
	const { getApplicationList, addApplication} = useApiFractuz();
	const { addHistoryLog 							} = useContextConsole();
	const { MessagesToPanel_set 					} = useContextPrivadeLayoutBody();
	const { treatExceptions							} = TreatmentExceptions();

	const [applicationSearchFieldsValues	, setApplicationSearchFieldsValues	] = useState({});
	const [applicationSearchResults			, setApplicationSearchResults			] = useState({});
	const [applicationRegisterFieldsValues	, setApplicationRegisterFieldsValues] = useState({});

	const [applicationDisplayType				, setApplicationDisplayType			] = useState(0);

	const applicationConfig ={
		 seachForm:{
			fields:{
				appName:{
					 labelText:"Nome da Aplicação"
					,fieldID:"name"
					,onChangeEvent:(e)=>{ setFormFieldValuesStates(applicationSearchFieldsValues, setApplicationSearchFieldsValues,e,"Name");}
				}
				,appDesc:{
					 labelText:"Descrição"
					,fieldID:"description"
					,fieldLabelStyle:{backgroundColor:"#50505090"}
					,onChangeEvent:(e)=>{ setFormFieldValuesStates(applicationSearchFieldsValues, setApplicationSearchFieldsValues,e,"Description");}
				}
			}
			,commands:{
				toggleDisplayType:	()=>{
					setApplicationDisplayType((applicationDisplayType!==0?0:1));
				}
				,searchApplications : async ()=>{
					try{
						const response = await getApplicationList(applicationSearchFieldsValues);
						setApplicationSearchResults(response);
						addHistoryLog("Pesquisa de Aplicações executada");
						MessagesToPanel_set("Pesquisa de Aplicações executada")
					} catch (error) {
						treatExceptions(error,"Pesquisa de Aplicações");
						MessagesToPanel_set("Erro na Pesquisa de Aplicações executada")
					}
				}
			}
		}
		
		,registerForm:{
			fields:{
				appName:{
					 labelText:"Nome da Aplicação"
					,fieldID:"name"
					,onChangeEvent:(e)=>{ setFormFieldValuesStates(applicationRegisterFieldsValues, setApplicationRegisterFieldsValues,e,"Name");}
				}
				,appDesc:{
					 labelText:"Descrição"
					,fieldID:"description"
					,fieldLabelStyle:{backgroundColor:"#50505090"}
					,onChangeEvent:(e)=>{ setFormFieldValuesStates(applicationRegisterFieldsValues, setApplicationRegisterFieldsValues,e,"Description");}
				}
			}
			,commands:{
				toggleDisplayType:	()=>{
					setApplicationDisplayType((applicationDisplayType!==0?0:1));
				}
				,addApplications : async ()=>{
					try{
						const response = await addApplication({},applicationRegisterFieldsValues);
						addHistoryLog("Adição de Aplicações executada");
						console.log("response",response);
						setApplicationDisplayType(0);
					} catch (error) {
						treatExceptions(error,"Adição de Aplicações");
					}
				}
			}
		}
	}

	const ApplicationDisplayType ={
		 Search: ()=>(
				<div>
					<div className="wtdhGeneral_duz24vw_20 generalDisposition_horizDisp_spaceBetween">
						<TextFieldDefault params={applicationConfig.seachForm.fields.appName}/>
						<TextFieldDefault params={applicationConfig.seachForm.fields.appDesc}/>
						<LayoutButtonDefault onClickEvent={applicationConfig.seachForm.commands.searchApplications}>Pesquisar</LayoutButtonDefault>
						<LayoutButtonDefault onClickEvent={applicationConfig.seachForm.commands.toggleDisplayType}>Novo</LayoutButtonDefault>
					</div>
					<div>
						<h4>lista de resultados</h4>
						<div>{applicationSearchResults ? <i>Algum Resultados</i>:<i>Sem Resultados de Pesquisa</i>}</div>
					</div>
				</div>
			)
		,Register : ()=>(
			<div>
				<div className="wtdhGeneral_duz24vw_20 generalDisposition_horizDisp_spaceBetween">
					<TextFieldDefault params={applicationConfig.registerForm.fields.appName}/>
					<TextFieldDefault params={applicationConfig.registerForm.fields.appDesc}/>
					<LayoutButtonDefault onClickEvent={applicationConfig.registerForm.commands.addApplications}>Salvar</LayoutButtonDefault>
					<LayoutButtonDefault onClickEvent={applicationConfig.registerForm.commands.toggleDisplayType}>Cancelar</LayoutButtonDefault>
				</div>
			</div>
		)
	}

	if(applicationDisplayType!==1){
		return(
			<ContextPrivadeLayoutBodyProvider title="Applications> Consulta">
				<ApplicationDisplayType.Search/>
			</ContextPrivadeLayoutBodyProvider>
		)
	}else{
		return(
			<ContextPrivadeLayoutBodyProvider title="Applications> Cadastro">
				<ApplicationDisplayType.Register/>
			</ContextPrivadeLayoutBodyProvider>
		)
	}
}
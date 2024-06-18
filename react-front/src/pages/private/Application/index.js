import { useState, useRef } from 'react';
import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'

import { setFormFieldValuesStates } from '../../../elements/forms/Fields';

import { TextFieldDefault } from '../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } from '../../../elements/forms/Buttons';

import { useApiFractuz } from '../../../components/api/fractus';
import { LayoutPrivateBody } from '../../../elements/layouts/Private/Body';

import { TreatmentExceptions } from '../../../components/exception';
import { ApplicationGridViewer } from './GridViewer';

export default function Application(){
	const { getApplicationList, addApplication} = useApiFractuz();
	const { treatExceptions							} = TreatmentExceptions();

	const [applicationSearchFieldsValues	, setApplicationSearchFieldsValues	] = useState({});
	const [applicationSearchResults			, setApplicationSearchResults			] = useState({});
	const [applicationRegisterFieldsValues	, setApplicationRegisterFieldsValues] = useState({});
	const [applicationDisplayType				, setApplicationDisplayType			] = useState(0);
	
	const layoutRef = useRef(null);

	const applicationConfig ={
		 seachForm:{
			fields:{
				appName:{
					 labelText:"Nome da Aplicação"
					,fieldID:"Name"
					,onChangeEvent:(e)=>{ setFormFieldValuesStates(applicationSearchFieldsValues, setApplicationSearchFieldsValues,e,"Name");}
					,value: applicationSearchFieldsValues.Name
				}
				,appDesc:{
					 labelText:"Descrição"
					,fieldID:"Description"
					,fieldLabelStyle:{backgroundColor:"#50505090"}
					,onChangeEvent:(e)=>{ setFormFieldValuesStates(applicationSearchFieldsValues, setApplicationSearchFieldsValues,e,"Description");}
					,value: (applicationSearchFieldsValues.Description)
				}
			}
			,commands:{
				toggleDisplayType:	()=>{setApplicationDisplayType((applicationDisplayType!==0?0:1));}
				,searchApplications : async ()=>{
					try{
						const response = await getApplicationList(applicationSearchFieldsValues);
						setApplicationSearchResults(response);
						let complement = 	response.length<= 0 ? "Não houve registros nestes critérios":
												response.length===1 ? "1 aplicação encontrada":
																			 response.length.toString()+ " Aplicações encontradas"
						layoutRef.current.MessagesToPanel_set("Pesquisa de Aplicações executada: "+complement);
					} catch (error) {
						treatExceptions(error,"Pesquisa de Aplicações");
						layoutRef.current.MessagesToPanel_set("Erro na Pesquisa de Aplicações: "+error);
					}
				}
			}
		}
		
		,registerForm:{
			fields:{
				appName:{
					 labelText:"Nome da Aplicação"
					,fieldID:"Name"
					,onChangeEvent:(e)=>{ setFormFieldValuesStates(applicationRegisterFieldsValues, setApplicationRegisterFieldsValues,e,"Name");}
				}
				,appDesc:{
					 labelText:"Descrição"
					,fieldID:"Description"
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
						layoutRef.current.MessagesToPanel_set(response.description);
						setApplicationDisplayType(0);
					} catch (error) {
						treatExceptions(error,"Adição de Aplicações");
						layoutRef.current.MessagesToPanel_set("Erro na Adição de Aplicações: "+error);
					}
				}
			}
		}
	}

	const ApplicationDisplayType ={
		 Search: ()=>(
				<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
					<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween" style={{padding:"5px"}}>
						<TextFieldDefault params={applicationConfig.seachForm.fields.appName}/>
						<TextFieldDefault params={applicationConfig.seachForm.fields.appDesc}/>
						<LayoutButtonDefault onClickEvent={applicationConfig.seachForm.commands.searchApplications}>Pesquisar</LayoutButtonDefault>
						<LayoutButtonDefault onClickEvent={applicationConfig.seachForm.commands.toggleDisplayType}>Novo</LayoutButtonDefault>
					</div>
					<div className="wtdhGeneral_duz24pc_24">
						<div>{applicationSearchResults.length > 0 &&
							<div>
								<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
									<h2>
										<i>
											{applicationSearchResults.length === 1 ? "1 aplicação encontrada":applicationSearchResults.length.toString() + " Aplicações encontradas" }  
										</i>
									</h2>
									<button onClick={()=>setApplicationSearchResults([])}>X</button>
								</div>
								<div style={{maxHeight:"25vh",overflowY:"auto", padding:"5px"}} className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceAround">
									{applicationSearchResults.map((app,idx)=>{
										return <ApplicationGridViewer key={idx} Application={app}/>
									})}
								</div>
							</div>}
						</div>
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
			<LayoutPrivateBody title="Applications> Consulta" ref={layoutRef}>
				<ApplicationDisplayType.Search/>
			</LayoutPrivateBody>
		)
	}else{
		return(
			<LayoutPrivateBody title="Applications> Cadastro" ref={layoutRef}>
				<ApplicationDisplayType.Register/>
			</LayoutPrivateBody>
		)
	}
}
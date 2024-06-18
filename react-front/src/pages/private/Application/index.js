import { useState, useRef , useCallback} from 'react';
import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'

import { TextFieldDefault } from '../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } from '../../../elements/forms/Buttons';

import { useApiFractuz } from '../../../components/api/fractus';
import { LayoutPrivateBody } from '../../../elements/layouts/Private/Body';

import { TreatmentExceptions } from '../../../components/exception';
import { ApplicationGridDataViewer } from './ApplicationGridDataViewer';
import { Grid } from '../../../elements/forms/Grids';

export default function Application(){
	const { getApplicationList, addApplication} = useApiFractuz();
	const { treatExceptions							} = TreatmentExceptions();

	//const [applicationSearchFieldsValues	, setApplicationSearchFieldsValues	] = useState({});
	const [applicationSearchResults			, setApplicationSearchResults			] = useState({});
	//const [applicationRegisterFieldsValues	, setApplicationRegisterFieldsValues] = useState({});
	const [applicationDisplayType				, setApplicationDisplayType			] = useState(0);

	const layoutRef = useRef(null);
	const gridRef = useRef(null);

	const refSeachName= useRef("");
	const refSeachDesc= useRef("");
	const refRegisName= useRef("");
	const refRegisDesc= useRef("");

	const applicationConfig ={
		 seachForm:{
			fields:{
				appName:{
					 labelText:"Nome da Aplicação"
					,fieldID:"Name"
				}
				,appDesc:{
					 labelText:"Descrição"
					,fieldID:"Description"
					,fieldLabelStyle:{backgroundColor:"#50505090"}
				}
			}
			,commands:{
				toggleDisplayType:	()=>{setApplicationDisplayType((applicationDisplayType!==0?0:1));}
				,searchApplications : async ()=>{
					try{
						
						const applicationSearchFieldsValues = {Name:refSeachName.current.value, Description:refSeachDesc.current.value}
						const response = await getApplicationList(applicationSearchFieldsValues);
						gridRef.current.setGridList(response);
						
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
				}
				,appDesc:{
					 labelText:"Descrição"
					,fieldID:"Description"
					,fieldLabelStyle:{backgroundColor:"#50505090"}
				}
			}
			,commands:{
				toggleDisplayType:	()=>{
					setApplicationDisplayType((applicationDisplayType!==0?0:1));
				}
				,addApplications : async ()=>{
					try{
						const applicationRegisterFieldsValues = {Name:refRegisName.current.inputRef.current.value, Description:refRegisName.current.inputRef.current.value}
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
						<TextFieldDefault params={applicationConfig.seachForm.fields.appName} ref={refSeachName}/>
						<TextFieldDefault params={applicationConfig.seachForm.fields.appDesc} ref={refSeachDesc}/>
						<LayoutButtonDefault onClickEvent={applicationConfig.seachForm.commands.searchApplications}>Pesquisar</LayoutButtonDefault>
						<LayoutButtonDefault onClickEvent={applicationConfig.seachForm.commands.toggleDisplayType}>Novo</LayoutButtonDefault>
					</div>
					<div className="wtdhGeneral_duz24pc_24">
						<div>
							<Grid ref={gridRef} viewer={ApplicationGridDataViewer}/>
						</div>
					</div>
				</div>
		)
		,Register : ()=>(
			<div>
				<div className="wtdhGeneral_duz24pc_20 generalDisposition_horizDisp_spaceBetween">
					<TextFieldDefault params={applicationConfig.registerForm.fields.appName} ref={refRegisName}/>
					<TextFieldDefault params={applicationConfig.registerForm.fields.appDesc} ref={refRegisDesc}/>
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
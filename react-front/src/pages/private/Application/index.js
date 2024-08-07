import { useState, useRef , useEffect} from 'react';

import { useParams } 						from 'react-router-dom';

import { TextFieldDefault } 				from '../../../system/Elements/forms/Fields/TextFields'; ///'../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } 			from '../../../system/Elements/forms/Buttons';
import { Grid } 								from '../../../system/Elements/forms/Grids';
import { formTools } 						from '../../../system/Elements/forms/Tools';

import { useApiFractuzApplications } 	from '../../../components/api/fractus/Applications';
import useValidationsDefaults 			from '../../../system/Components/Validations';
import { useContextPanelMessage } 		from '../../../system/Contexts/Message';
import { LayoutPrivateBody } 				from '../../../elements/layouts/Private/Body';

import { TreatmentExceptions } 			from '../../../components/exception';
import { ApplicationGridDataViewer } 	from './ApplicationGridDataViewer';
import { getCaesarDecrypt } 				from '../../../system/Libs/Crypto';
import { goToAddress } 						from '../../../system/Libs/Urls';
import { routesPrivatePages } 			from '../../routes';

import { useContextConsole } from '../../../system/Contexts/Console';

import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'
import { isStringEmptyOrSpaces } from '../../../system/Libs/Strings';

export default function Application(){
	const apiApplication = useApiFractuzApplications();
	const { addHistoryLog } 	= useContextConsole();
	const { treatExceptions	} = TreatmentExceptions();
	const { isFieldsValid } = useValidationsDefaults();
	const {messageBoxOpen_ok} = useContextPanelMessage();
	
	const [applicationDisplayType	, setApplicationDisplayType] = useState(0);
	const { id } = useParams();

	const layoutFormRef = useRef(null);
	const gridRef = useRef(null);

	const refSeachName= useRef("");
	const refSeachDesc= useRef("");
	const refRegisName= useRef("");
	const refRegisDesc= useRef("");

	const addHistory = (message)=>{
		addHistoryLog(message);
		layoutFormRef.current.MessagesToPanel_set(message);
	}

	const applicationConfig ={
		 seachForm:{
			fields:{
				appName:{
					 labelText:"Nome da Aplicação"
					,fieldID:"Name"
					,refValue:refSeachName
				}
				,appDesc:{
					 labelText:"Descrição"
					,fieldID:"Description"
					,refValue:refSeachDesc
				}
			}
			,commands:{
				 toggleDisplayType:	()=>{setApplicationDisplayType((applicationDisplayType!==0?0:1));}
				,searchApplications : async ()=>{
					try{
						
						const applicationSearchFieldsValues =formTools.getObjectFromFormData(applicationConfig.seachForm.fields);
						const response = await apiApplication.httpGet(applicationSearchFieldsValues);
						gridRef.current.setGridList(response);
						
						let complement = 	response.length<= 0 ? "Não houve registros nestes critérios":
												response.length===1 ? "1 aplicação encontrada":
																			 response.length.toString()+ " Aplicações encontradas"
						addHistory("Pesquisa de Aplicações executada: "+complement);

					} catch (error) {
						let errorID = await treatExceptions(error,"Pesquisa de Aplicações");
						addHistory("Erro na Pesquisa de Aplicações: '"+error+"'. \nDetalhes do erro foram registrados sob o ID '"+errorID+"'");
					}
				}
			}
		}

		,registerForm:{
			fields:{
				 appName:{
					 labelText:"Nome da Aplicação"
					,fieldID:"Name"
					,refValue:refRegisName
					,Validation:{
						 lengthMin:3
						,lengthMax:200
						,basicRules:["NotNull"]
					}
				}
				,appDesc:{
					 labelText:"Descrição"
					,fieldID:"Description"
					,refValue:refRegisDesc
					,Validation:{
						 lengthMin:5
						,lengthMax:1000
						,basicRules:["NotNull"]
					}
				}
			}
			,commands:{
				toggleDisplayType:	()=>{
					if(!!id){goToAddress(routesPrivatePages.Application.path);}
					else{setApplicationDisplayType((applicationDisplayType!==0?0:1));}
				}
				,addApplications : async ()=>{
					try{
						if(!isFieldsValid(applicationConfig.registerForm.fields)){
							addHistory("A gravação não pode acontecer devido a dados inválidos. Por favor revise-os para prosseguir.");
							return;
						}
						const applicationRegisterFieldsValues = formTools.getObjectFromFormData(applicationConfig.registerForm.fields);//{Name:refRegisName.current.value, Description:refRegisDesc.current.value}
						let response;
						if(isStringEmptyOrSpaces(id)){
							response = await apiApplication.httpInsert({},applicationRegisterFieldsValues);
							addHistory(response.description);
							if(response.isSuccess){setApplicationDisplayType(0);}
						}else{
							applicationRegisterFieldsValues["SystemIDX"]=getCaesarDecrypt(id);
							response = await apiApplication.httpUpdate({},applicationRegisterFieldsValues);
							messageBoxOpen_ok(response.description);
							addHistory(response.description);
							if(response.isSuccess){goToAddress(routesPrivatePages.Application.path);}
						}
					} catch (error) {
						treatExceptions(error,"Salvar Aplicações");
						addHistory("Erro ao Gravar Aplicações: "+error);
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
				<Grid ref={gridRef} viewer={ApplicationGridDataViewer} layoutFormRef={layoutFormRef}/>
			</div>
		)
		,Register : ()=>(
			<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
				<TextFieldDefault params={applicationConfig.registerForm.fields.appName} ref={refRegisName}/>
				<TextFieldDefault params={applicationConfig.registerForm.fields.appDesc} ref={refRegisDesc}/>
				<LayoutButtonDefault onClickEvent={applicationConfig.registerForm.commands.addApplications}>Salvar</LayoutButtonDefault>
				<LayoutButtonDefault onClickEvent={applicationConfig.registerForm.commands.toggleDisplayType}>Cancelar</LayoutButtonDefault>
			</div>
		)
	}

	useEffect(
		()=>{
			if(gridRef!==null){
				if(gridRef.current!==null){
					if(gridRef.current.getGridList().length<=0){
						applicationConfig.seachForm.commands.searchApplications();
					}
				}
			}

			if(!!!id){return;}
			let guid = getCaesarDecrypt(id);
			const response = apiApplication.httpGet({SystemIDX:guid});
			if(response instanceof Promise){
				response.then(result => {
					if (!(result && Array.isArray(result) && result.length > 0)) {return;}
					formTools.loadDataObjectToForm(applicationConfig.registerForm.fields,result[0]);
				})
			}
		}
		,[id,apiApplication,applicationConfig.seachForm.commands]
	)

	if(applicationDisplayType!==1 && !!!id){
		return(
			<div className="wtdhGeneral_duz24vw_20">
				<LayoutPrivateBody title="Applications> Consulta" ref={layoutFormRef}>
					<ApplicationDisplayType.Search/>
				</LayoutPrivateBody>
			</div>
		)
	}else{
		return(
			<div className="wtdhGeneral_duz24vw_20">
				<LayoutPrivateBody title="Applications> Cadastro" ref={layoutFormRef}>
					<ApplicationDisplayType.Register/>
				</LayoutPrivateBody>
			</div>
		)
	}
}
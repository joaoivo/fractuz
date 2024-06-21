import { useState, useRef , useEffect} from 'react';

import { useParams } 						from 'react-router-dom';

import { TextFieldDefault } 				from '../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } 			from '../../../elements/forms/Buttons';

import { useApiFractuzApplications } 	from '../../../components/api/fractus/Applications';
import useValidationsDefaults from '../../../system/Components/Validations';
import { LayoutPrivateBody } 				from '../../../elements/layouts/Private/Body';

import { TreatmentExceptions } 			from '../../../components/exception';
import { ApplicationGridDataViewer } 	from './ApplicationGridDataViewer';
import { Grid } 								from '../../../elements/forms/Grids';
import { getCaesarDecrypt } 				from '../../../system/Libs/Crypto';
import { goToAddress } 						from '../../../system/Libs/Urls';
import { routesPrivatePages } 			from '../../routes';

import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'
import { isStringEmptyOrSpaces } from '../../../system/Libs/Strings';

export default function Application(){
	const Application = useApiFractuzApplications();
	const { treatExceptions	} = TreatmentExceptions();
	const { isFieldsValid } = useValidationsDefaults()
	
	const [applicationDisplayType	, setApplicationDisplayType] = useState(0);
	const { id } = useParams();

	const layoutFormRef = useRef(null);
	const gridRef = useRef(null);

	const refSeachName= useRef("");
	const refSeachDesc= useRef("");
	const refRegisName= useRef("");
	const refRegisDesc= useRef("");

	useEffect(
		()=>{
			if(!!!id){return;}
			let guid = getCaesarDecrypt(id);
			const response = Application.httpGet({guid:guid});
			if(response instanceof Promise){
				response.then(result => {
					if (!(result && Array.isArray(result) && result.length > 0)) {return;}
					refRegisName.current.setValue(result[0].Name);
					refRegisDesc.current.setValue(result[0].Description);
				})
			}
		}
		,[id,Application]
	)

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
				}
			}
			,commands:{
				toggleDisplayType:	()=>{setApplicationDisplayType((applicationDisplayType!==0?0:1));}
				,searchApplications : async ()=>{
					try{
						
						const applicationSearchFieldsValues = {Name:refSeachName.current.value, Description:refSeachDesc.current.value}
						const response = await Application.httpGet(applicationSearchFieldsValues);
						gridRef.current.setGridList(response);
						
						let complement = 	response.length<= 0 ? "Não houve registros nestes critérios":
												response.length===1 ? "1 aplicação encontrada":
																			 response.length.toString()+ " Aplicações encontradas"
						layoutFormRef.current.MessagesToPanel_set("Pesquisa de Aplicações executada: "+complement);

					} catch (error) {
						treatExceptions(error,"Pesquisa de Aplicações");
						layoutFormRef.current.MessagesToPanel_set("Erro na Pesquisa de Aplicações: "+error);
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
							layoutFormRef.current.MessagesToPanel_set("A gravação não pode acontecer devido a dados inválidos. Por favor revise-os para prosseguir.");
							return;
						}
						const applicationRegisterFieldsValues = {Name:refRegisName.current.value, Description:refRegisDesc.current.value}
						let response;
						if(isStringEmptyOrSpaces(id)){
							response = await Application.httpInsert({},applicationRegisterFieldsValues);							
							layoutFormRef.current.MessagesToPanel_set(response.description);
							if(response.code===0){setApplicationDisplayType(0);}
						}else{
							applicationRegisterFieldsValues["SystemIDX"]=getCaesarDecrypt(id);
							response = await Application.httpUpdate({},applicationRegisterFieldsValues);
							alert(response.description);
							layoutFormRef.current.MessagesToPanel_set(response.description);
							if(response.code===0){goToAddress(routesPrivatePages.Application.path);}
						}
					} catch (error) {
						treatExceptions(error,"Salvar Aplicações");
						layoutFormRef.current.MessagesToPanel_set("Erro ao Gravar Aplicações: "+error);
					}
				}
				,test : async ()=>{
					
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

	if(applicationDisplayType!==1 && !!!id){
		return(
			<LayoutPrivateBody title="Applications> Consulta" ref={layoutFormRef}>
				<ApplicationDisplayType.Search/>
			</LayoutPrivateBody>
		)
	}else{
		return(
			<LayoutPrivateBody title="Applications> Cadastro" ref={layoutFormRef}>
				<ApplicationDisplayType.Register/>
			</LayoutPrivateBody>
		)
	}
}
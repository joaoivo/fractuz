import { useState, useRef , useEffect} from 'react';

import { useParams } 						from 'react-router-dom';

import { TextFieldDefault } 				from '../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } 			from '../../../elements/forms/Buttons';

import { useApiFractuz } 					from '../../../components/api/fractus';
import { LayoutPrivateBody } 				from '../../../elements/layouts/Private/Body';

import { TreatmentExceptions } 			from '../../../components/exception';
import { Grid } 								from '../../../elements/forms/Grids';
import { getCaesarDecrypt } 				from '../../../system/Libs/Crypto';
import { goToAddress } 						from '../../../system/Libs/Urls';
import { routesPrivatePages } 			from '../../routes';

import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'

export default function Database () {
	const { Application} = useApiFractuz();
	const { treatExceptions							} = TreatmentExceptions();
	
	const [applicationDisplayType				, setApplicationDisplayType			] = useState(0);
	const { idApp,idDatabase } = useParams();

	const layoutRef = useRef(null);
	const gridRef = useRef(null);

	const refSeachName= useRef("");
	const refSeachDesc= useRef("");
	const refRegisName= useRef("");
	const refRegisDesc= useRef("");

	useEffect(
		()=>{
			if(!!!idApp){return;}
			let guid = getCaesarDecrypt(idApp);
			const response = Application.insert({guid:guid});
			if(response instanceof Promise){
				response.then(result => {
					if (!(result && Array.isArray(result) && result.length > 0)) {return;}
					refRegisName.current.setValue(result[0].Name);
					refRegisDesc.current.setValue(result[0].Description);
				})
			}
		}
		,[idApp,Application]
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
					,fieldLabelStyle:{backgroundColor:"#50505090"}
				}
			}
			,commands:{
				toggleDisplayType:	()=>{setApplicationDisplayType((applicationDisplayType!==0?0:1));}
				,searchApplications : async ()=>{
					try{
						
						const applicationSearchFieldsValues = {Name:refSeachName.current.value, Description:refSeachDesc.current.value}
						const response = await Application.get(applicationSearchFieldsValues);
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
					/*
					if(!!id){goToAddress(routesPrivatePages.Application.path);}
					else{setApplicationDisplayType((applicationDisplayType!==0?0:1));}
					*/
				}
				,addApplications : async ()=>{
					try{
						const applicationRegisterFieldsValues = {Name:refRegisName.current.value, Description:refRegisName.current.value}
						const response = await Application.insert({},applicationRegisterFieldsValues);
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
				{/*<Grid ref={gridRef} viewer={ApplicationGridDataViewer} layoutRef={layoutRef}/>*/}
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

	if(applicationDisplayType!==1 && !!!idApp){
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
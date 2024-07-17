import { useState, useRef , useEffect} from 'react';
import { useParams } 						from 'react-router-dom';

import { goToAddress,goToRoutes } from '../../../system/Libs/Urls';
import { routesPrivatePages } from '../../routes';

import { getCaesarDecrypt } from '../../../system/Libs/Crypto';
import { useApiFractuzDatabases } from '../../../components/api/fractus/Databases';
import { useContextPanelMessage } from '../../../system/Contexts/Message';
import useValidationsDefaults from '../../../system/Components/Validations';

import { LayoutPrivateBody } from '../../../elements/layouts/Private/Body';
import { TextFieldDefault } from '../../../system/Elements/forms/Fields/TextFields';
import { formTools } from '../../../system/Elements/forms/Tools';
import { LayoutButtonDefault } from '../../../system/Elements/forms/Buttons';
import { Grid } from '../../../system/Elements/forms/Grids';
import { DatabaseGridDataViewer } from './DatabaseGridDataViewer';

import { TreatmentExceptions } from '../../../components/exception';
import { isStringEmptyOrSpaces } from '../../../system/Libs/Strings';
import { isObjectEmpty } from '../../../system/Libs/Objects';

export default function Database () {
	const apiDatabase = useApiFractuzDatabases();
	const {messageBoxOpen_ok} = useContextPanelMessage();

	const [displayType	, setDisplayType] = useState(0);
	const { treatExceptions	} = TreatmentExceptions();
	const { isFieldsValid } = useValidationsDefaults();

	const { idApp, idDatabase } = useParams();

	const layoutFormRef = useRef(null);
	const gridRef = useRef(null);

	const refSeachName	= useRef("");
	const refSeachDesc	= useRef("");
	const refRegisName	= useRef("");
	const refRegisDesc	= useRef("");
	const refRegisOrder	= useRef("");

	const databaseConfig ={
		seachForm:{
			fields:{
				dbaseName:{
					 labelText:"Nome da Base de Dados"
					,fieldID:"Name"
					,refValue:refSeachName
				}
				,dbaseDesc:{
					 labelText:"Descrição"
					,fieldID:"Description"
					,refValue:refSeachDesc
				}
			}
			,commands:{
				toggleDisplayType:	()=>{setDisplayType((displayType!==0?0:1));}
				,searchDatabases : async ()=>{
					try{
						const databaseSearchFieldsValues =  formTools.getObjectFromFormData(databaseConfig.seachForm.fields);
						databaseSearchFieldsValues.Application = getCaesarDecrypt(idApp);
						
						const response = await apiDatabase.httpGet(databaseSearchFieldsValues);
						gridRef.current.setGridList(response);
						
						let complement = 	response.length<= 0 ? "Não houve registros nestes critérios":
												response.length===1 ? "1 Base de dados encontrada":
																			response.length.toString()+ " Base de dados encontradas"
						layoutFormRef.current.MessagesToPanel_set("Pesquisa de Base de dados executada: "+complement);

					} catch (error) {
						treatExceptions(error,"Pesquisa de Base de dados");
						layoutFormRef.current.MessagesToPanel_set("Erro na Pesquisa de Base de dados: "+error);
					}
				}
			}
		}

		,registerForm:{
			fields:{
				dbaseName:{
					labelText:"Nome da Base de Dados"
					,fieldID:"DatabaseName"
					,refValue:refRegisName
					,Validation:{
						lengthMin:3
						,lengthMax:200
						,basicRules:["NotNull"]
					}
				}
				,dbaseDesc:{
					labelText:"Descrição"
					,fieldID:"DatabaseDescription"
					,refValue:refRegisDesc
					,Validation:{
						lengthMin:5
						,lengthMax:1000
						,basicRules:["NotNull"]
					}
				}
				,dbaseOrder:{
					labelText:"Ordem"
					,fieldID:"BuildOrder"
					,refValue:refRegisOrder
					,Validation:{
						lengthMin:1
						,lengthMax:3
						,basicRules:["NotNull"]
					}
				}
			}
			,commands:{
				toggleDisplayType:	()=>{
					if(!!idDatabase){goToRoutes(routesPrivatePages.DatabaseView.path,"idApp",idApp);}
					else{setDisplayType((displayType!==0?0:1));}
				}
				,addDatabases : async ()=>{
					try{
						if(!isFieldsValid(databaseConfig.registerForm.fields)){
							layoutFormRef.current.MessagesToPanel_set("A gravação não pode acontecer devido a dados inválidos. Por favor revise-os para prosseguir.");
							return;
						}
						const databaseRegisterFieldsValues =  formTools.getObjectFromFormData(databaseConfig.registerForm.fields);
						databaseRegisterFieldsValues.Application=getCaesarDecrypt(idApp);

						let response;
						if(isStringEmptyOrSpaces(idDatabase)){
							response = await apiDatabase.httpInsert({},databaseRegisterFieldsValues);
							layoutFormRef.current.MessagesToPanel_set(response.description);
							if(response.isSuccess){setDisplayType(0);}
						}else{
							databaseRegisterFieldsValues["SystemIDX"]=getCaesarDecrypt(idDatabase);
							response = await apiDatabase.httpUpdate({},databaseRegisterFieldsValues);
							messageBoxOpen_ok(response.description);
							layoutFormRef.current.MessagesToPanel_set(response.description);
							if(response.isSuccess){goToRoutes(routesPrivatePages.DatabaseView.path,"idApp",idApp);}
						}
					} catch (error) {
						treatExceptions(error,"Salvar Base de dados");
						layoutFormRef.current.MessagesToPanel_set("Erro ao Gravar Base de dados: "+error);
					}
				}
			}
		}
	}

	const DatabaseDisplayType ={
		Search: ()=>(
			<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
				<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween" style={{padding:"5px"}}>
					<TextFieldDefault params={databaseConfig.seachForm.fields.dbaseName} ref={refSeachName}/>
					<TextFieldDefault params={databaseConfig.seachForm.fields.dbaseDesc} ref={refSeachDesc}/>
					<LayoutButtonDefault onClickEvent={databaseConfig.seachForm.commands.searchDatabases}>Pesquisar</LayoutButtonDefault>
					<LayoutButtonDefault onClickEvent={databaseConfig.seachForm.commands.toggleDisplayType}>Novo</LayoutButtonDefault>
				</div>
				<Grid ref={gridRef} viewer={DatabaseGridDataViewer} layoutFormRef={layoutFormRef}/>
			</div>
		)
		,Register : ()=>(
			<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
				<TextFieldDefault params={databaseConfig.registerForm.fields.dbaseName} ref={refRegisName}/>
				<TextFieldDefault params={databaseConfig.registerForm.fields.dbaseDesc} ref={refRegisDesc}/>
				<TextFieldDefault params={databaseConfig.registerForm.fields.dbaseOrder} ref={refRegisOrder}/>
				<LayoutButtonDefault onClickEvent={databaseConfig.registerForm.commands.addDatabases}>Salvar</LayoutButtonDefault>
				<LayoutButtonDefault onClickEvent={databaseConfig.registerForm.commands.toggleDisplayType}>Cancelar</LayoutButtonDefault>
			</div>
		)
	}


	useEffect(
		()=>{
			if(!!!idApp){
				goToAddress(routesPrivatePages.Application.path);
				return;
			}
			let guidApp 		= getCaesarDecrypt(idApp);

			if(!!idDatabase){
				let guidDatabase 	= getCaesarDecrypt(idDatabase);
				const response = apiDatabase.httpGet({SystemIDX:guidDatabase});
				if(response instanceof Promise){
					response.then(result => {
						if (!(result && Array.isArray(result) && result.length > 0)) {return;}
						formTools.loadDataObjectToForm(databaseConfig.registerForm.fields,result[0]);
					})
				}
			}else{
				const response = apiDatabase.httpGet({ApplicationIDX:guidApp});
				if(response instanceof Promise && !isObjectEmpty(gridRef.current)){
					response.then(result => {gridRef.current.setGridList(result);})
				}
			}

		}
		,[idApp,apiDatabase,idDatabase]
	)

	if(displayType!==1 && !!!idDatabase){
		return(
			<div className="wtdhGeneral_duz24vw_20">
				<LayoutPrivateBody title="Database> Consulta" ref={layoutFormRef}>
					<DatabaseDisplayType.Search/>
				</LayoutPrivateBody>
			</div>
		)
	}else{
		return(
			<div className="wtdhGeneral_duz24vw_20">
				<LayoutPrivateBody title="Database> Cadastro" ref={layoutFormRef}>
					<DatabaseDisplayType.Register/>
				</LayoutPrivateBody>
			</div>
		)
	}
}
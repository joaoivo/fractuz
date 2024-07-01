import { useState, useRef , useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { TextFieldDefault } from '../../../system/Elements/forms/Fields/TextFields';
import { LayoutButtonDefault } from '../../../system/Elements/forms/Buttons';
import { LayoutPrivateBody } from '../../../elements/layouts/Private/Body';
import useValidationsDefaults from '../../../system/Components/Validations';

import { useApiFractuzTables } from '../../../components/api/fractus/Tables';

import { TreatmentExceptions } from '../../../components/exception';

import { Grid } from '../../../system/Elements/forms/Grids';
import { TableGridDataViewer } from './TableGridDataViewer';
import { getCaesarDecrypt } from '../../../system/Libs/Crypto';
import { goToAddress } from '../../../system/Libs/Urls';
import { routesPrivatePages } from '../../routes';

import { isStringEmptyOrSpaces } from '../../../system/Libs/Strings';

import './../../../style/dimensions/dimensions_widthDozens.css'
import './../../../style/aligns/disposition.css'

export default function Tables(){
	const apiTable = useApiFractuzTables();
	const { treatExceptions	} = TreatmentExceptions();
	const { isFieldsValid } = useValidationsDefaults();
	
	const [displayType	, setDisplayType] = useState(0);
	const { id } = useParams();

	const layoutFormRef = useRef(null);
	const gridRef = useRef(null);

	const refSeachName= useRef("");
	const refSeachDesc= useRef("");

	const refRegisBuiltOrder	= useRef("");
	const refRegisName			= useRef("");
	const refRegisDesc			= useRef("");
	const refRegisDescription	= useRef("");
	const refRegisPrefix			= useRef("");
	const refRegisHistory		= useRef("");

	useEffect(
		()=>{
			if(!!!id){return;}
			let guid = getCaesarDecrypt(id);
			const response = apiTable.httpGet({guid:guid});
			if(response instanceof Promise){
				response.then(result => {
					if (!(result && Array.isArray(result) && result.length > 0)) {return;}
					refRegisName.current.setValue(result[0].Name);
					refRegisDesc.current.setValue(result[0].Description);
				})
			}
		}
		,[id,apiTable]
	)

	const tableConfig ={
		seachForm:{
			fields:{
				appName:{
					labelText:"Nome da Tabela"
					,fieldID:"Name"
				}
				,appDesc:{
					labelText:"Descrição"
					,fieldID:"Description"
				}
			}
			,commands:{
				toggleDisplayType:	()=>{setDisplayType((displayType!==0?0:1));}
				,searchTables : async ()=>{
					try{
						
						const tableSearchFieldsValues = {Name:refSeachName.current.value, Description:refSeachDesc.current.value}
						const response = await apiTable.httpGet(tableSearchFieldsValues);
						gridRef.current.setGridList(response);
						
						let complement = 	response.length<= 0 ? "Não houve registros nestes critérios":
												response.length===1 ? "1 registro encontrado":
																			response.length.toString()+ " registros encontradas"
						layoutFormRef.current.MessagesToPanel_set("Pesquisa de Tabelas executada: "+complement);

					} catch (error) {
						treatExceptions(error,"Pesquisa de Tabelas");
						layoutFormRef.current.MessagesToPanel_set("Erro na Pesquisa de Tabelas: "+error);
					}
				}
			}
		}

		,registerForm:{
			fields:{
				appName:{
					labelText:"Nome da Tabela"
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
					if(!!id){goToAddress(routesPrivatePages.Table.path);}
					else{setDisplayType((displayType!==0?0:1));}
				}
				,addTables : async ()=>{
					try{
						if(!isFieldsValid(tableConfig.registerForm.fields)){
							layoutFormRef.current.MessagesToPanel_set("A gravação não pode acontecer devido a dados inválidos. Por favor revise-os para prosseguir.");
							return;
						}
						const tableRegisterFieldsValues = {Name:refRegisName.current.value, Description:refRegisDesc.current.value}
						let response;
						if(isStringEmptyOrSpaces(id)){
							response = await apiTable.httpInsert({},tableRegisterFieldsValues);
							layoutFormRef.current.MessagesToPanel_set(response.description);
							if(response.isSuccess){setDisplayType(0);}
						}else{
							tableRegisterFieldsValues["SystemIDX"]=getCaesarDecrypt(id);
							response = await apiTable.httpUpdate({},tableRegisterFieldsValues);
							alert(response.description);
							layoutFormRef.current.MessagesToPanel_set(response.description);
							if(response.isSuccess){goToAddress(routesPrivatePages.Table.path);}
						}
					} catch (error) {
						treatExceptions(error,"Salvar Tabelas");
						layoutFormRef.current.MessagesToPanel_set("Erro ao Gravar Tabelas: "+error);
					}
				}
			}
		}
	}

	const TableDisplayTypes ={
		Search: ()=>(
			<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
				<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween" style={{padding:"5px"}}>
					<TextFieldDefault params={tableConfig.seachForm.fields.appName} ref={refSeachName}/>
					<TextFieldDefault params={tableConfig.seachForm.fields.appDesc} ref={refSeachDesc}/>
					<LayoutButtonDefault onClickEvent={tableConfig.seachForm.commands.searchApplications}>Pesquisar</LayoutButtonDefault>
					<LayoutButtonDefault onClickEvent={tableConfig.seachForm.commands.toggleDisplayType}>Novo</LayoutButtonDefault>
				</div>
				<Grid ref={gridRef} viewer={TableGridDataViewer} layoutFormRef={layoutFormRef}/>
			</div>
		)
		,Register : ()=>(
			<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
				<TextFieldDefault params={tableConfig.registerForm.fields.appName} ref={refRegisName}/>
				<TextFieldDefault params={tableConfig.registerForm.fields.appDesc} ref={refRegisDesc}/>
				<LayoutButtonDefault onClickEvent={tableConfig.registerForm.commands.addApplications}>Salvar</LayoutButtonDefault>
				<LayoutButtonDefault onClickEvent={tableConfig.registerForm.commands.toggleDisplayType}>Cancelar</LayoutButtonDefault>
			</div>
		)
	}


	if(displayType!==1 && !!!id){
		return(
			<LayoutPrivateBody title="Tables> Consulta" ref={layoutFormRef}>
				<TableDisplayTypes.Search/>
			</LayoutPrivateBody>
		)
	}else{
		return(
			<LayoutPrivateBody title="Tables> Cadastro" ref={layoutFormRef}>
				<TableDisplayTypes.Register/>
			</LayoutPrivateBody>
		)
	}
}
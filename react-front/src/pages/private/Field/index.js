import { useState, useRef , useEffect} from 'react';

import { useParams } 						from 'react-router-dom';

import { TextFieldDefault } 				from '../../../system/Elements/forms/Fields/TextFields'; ///'../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } 			from '../../../system/Elements/forms/Buttons';
import { Grid } 								from '../../../system/Elements/forms/Grids';
import { formTools } 						from '../../../system/Elements/forms/Tools';

import { useApiFractuzFields } 			from "../../../components/api/fractus/Fields";
import useValidationsDefaults 			from '../../../system/Components/Validations';
import { useContextPanelMessage } 		from '../../../system/Contexts/Message';
import { LayoutPrivateBody } 				from '../../../elements/layouts/Private/Body';

import { TreatmentExceptions } 			from '../../../components/exception';
import { FieldGridDataViewer } 			from './FieldGridDataViewer';
import { getCaesarDecrypt } 				from '../../../system/Libs/Crypto';
import { goToAddress } 						from '../../../system/Libs/Urls';
import { routesPrivatePages } 			from '../../routes';

import { useContextConsole } from '../../../system/Contexts/Console';
import { CheckboxFieldDefault } from '../../../system/Elements/forms/Fields/BoolFields';

import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'
import { isStringEmptyOrSpaces } from '../../../system/Libs/Strings';

export default function Field(){
	const apiField = useApiFractuzFields();
	const { addHistoryLog } 	= useContextConsole();
	const { treatExceptions	} = TreatmentExceptions();
	const { isFieldsValid } = useValidationsDefaults();
	const {messageBoxOpen_ok} = useContextPanelMessage();
	
	const [fieldDisplayType	, setFieldDisplayType] = useState(0);
	const { id } = useParams();

	const layoutFormRef = useRef(null);
	const gridRef = useRef(null);

	const refSeachName= useRef("");
	const refSeachDesc= useRef("");
	const refSeachType= useRef("");

	const refRegisFieldName= useRef("");
	const refRegisFieldDescription= useRef("");
	const refRegisFieldDbDataType= useRef("");
	const refRegisFieldDbDataSize= useRef("");
	const refRegisFieldDbDataSizeDecimel= useRef("");
	const refRegisFieldDefaultValue= useRef("");
	const refRegisIsPrimaryKey= useRef("");
	const refRegisIsAllowNull= useRef("");
	const refRegisIsUnique= useRef("");
	const refRegisIsInsigned= useRef("");
	const refRegisConstraintField= useRef("");
	const refRegisAppDataType= useRef("");
	const refRegisAppDataNickname= useRef("");

	const addHistory = (message)=>{
		addHistoryLog(message);
		layoutFormRef.current.MessagesToPanel_set(message);
	}

	const fieldConfig ={
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
				,appType:{
					 labelText:"Tipo"
					,fieldID:"Description"
					,refValue:refSeachType
				}
			}
			,commands:{
				 toggleDisplayType:	()=>{setFieldDisplayType((fieldDisplayType!==0?0:1));}
				,searchFields : async ()=>{
					try{
						
						const fieldSearchFieldsValues =formTools.getObjectFromFormData(fieldConfig.seachForm.fields);
						const response = await apiField.httpGet(fieldSearchFieldsValues);
						gridRef.current.setGridList(response);
						
						let complement = 	response.length<= 0 ? "Não houve registros nestes critérios":
												response.length===1 ? "1 registro encontrado":
																			 response.length.toString()+ " Registros encontradas"
						addHistory("Pesquisa de Campos executada: "+complement);

					} catch (error) {
						let errorID = await treatExceptions(error,"Pesquisa de Campos");
						addHistory("Erro na Pesquisa de Campos: '"+error+"'. \nDetalhes do erro foram registrados sob o ID '"+errorID+"'");
					}
				}
			}
		}

		,registerForm:{
			fields:{
				 appName:{
					 labelText:"Nome da Aplicação"
					,fieldID:"FieldName"
					,refValue:refRegisFieldName
					,Validation:{
						 lengthMin:3
						,lengthMax:200
						,basicRules:["NotNull"]
					}
				}
				,appDesc:{
					 labelText:"Descrição"
					,fieldID:"FieldDescription"
					,refValue:refRegisFieldDescription
					,Validation:{
						 lengthMin:5
						,lengthMax:1000
					}
				}
				,DataType :{
					 labelText:"Tipo"
					,fieldID:"FieldDbDataType"
					,refValue:refRegisFieldDbDataType
					,Validation:{
						 lengthMin:3
						,lengthMax:1000
						,basicRules:["NotNull"]
					}
				}
				,DataSize :{
					 labelText:"Tamanho"
					,fieldID:"FieldDbDataSize"
					,refValue:refRegisFieldDbDataSize
					,Validation:{
						 lengthMax:7
					}
				}
				,DataSizeDecimel :{
					 labelText:"Decimais"
					,fieldID:"FieldDbDataSizeDecimel"
					,refValue:refRegisFieldDbDataSizeDecimel
					,Validation:{
						 lengthMax:30
					}
				}
				,IsPrimaryKey :{
					 labelText:"Chave Primária"
					,fieldID:"IsPrimaryKey"
					,refValue:refRegisIsPrimaryKey
				}
				,IsAllowNull :{
					 labelText:"Permite [Null]"
					,fieldID:"IsAllowNull"
					,refValue:refRegisIsAllowNull
				}
				,IsUnique :{
					 labelText:"Chave Única"
					,fieldID:"IsUnique"
					,refValue:refRegisIsUnique
				}
				,IsInsigned :{
					 labelText:"Numérico com Sinal"
					,fieldID:"IsInsigned"
					,refValue:refRegisIsInsigned
				}
				,FieldDefaultValue :{
					 labelText:"Valor Padrão"
					,fieldID:"FieldDefaultValue"
					,refValue:refRegisFieldDefaultValue
					,Validation:{
						 lengthMax:1000
					}
				}
				,ConstraintField :{
					 labelText:"Relacionamento"
					,fieldID:"ConstraintField"
					,refValue:refRegisConstraintField
				}
				,AppDataType :{
					 labelText:"Aplicação: Type de Dados"
					,fieldID:"AppDataType"
					,refValue:refRegisAppDataType
				}
				,AppDataNickname :{
					 labelText:"Aplicação: Legenda Dados"
					,fieldID:"AppDataNickname"
					,refValue:refRegisAppDataNickname
				}
			}
			,commands:{
				toggleDisplayType:	()=>{
					if(!!id){goToAddress(routesPrivatePages.Field.path);}
					else{setFieldDisplayType((fieldDisplayType!==0?0:1));}
				}
				,addFields : async ()=>{
					try{
						if(!isFieldsValid(fieldConfig.registerForm.fields)){
							addHistory("A gravação não pode acontecer devido a dados inválidos. Por favor revise-os para prosseguir.");
							return;
						}
						const fieldRegisterFieldsValues = formTools.getObjectFromFormData(fieldConfig.registerForm.fields);
						let response;
						if(isStringEmptyOrSpaces(id)){
							response = await apiField.httpInsert({},fieldRegisterFieldsValues);
							addHistory(response.description);
							if(response.isSuccess){setFieldDisplayType(0);}
						}else{
							fieldRegisterFieldsValues["SystemIDX"]=getCaesarDecrypt(id);
							response = await apiField.httpUpdate({},fieldRegisterFieldsValues);
							messageBoxOpen_ok(response.description);
							addHistory(response.description);
							if(response.isSuccess){goToAddress(routesPrivatePages.Field.path);}
						}
					} catch (error) {
						treatExceptions(error,"Salvar Campos");
						addHistory("Erro ao Gravar Campos: "+error);
					}
				}
			}
		}
	}

	const FieldDisplayType ={
		 Search: ()=>(
			<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
				<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween" style={{padding:"5px"}}>
					<TextFieldDefault params={fieldConfig.seachForm.fields.appName} ref={refSeachName}/>
					<TextFieldDefault params={fieldConfig.seachForm.fields.appDesc} ref={refSeachDesc}/>
					<TextFieldDefault params={fieldConfig.seachForm.fields.appType} ref={refSeachType}/>
					<LayoutButtonDefault onClickEvent={fieldConfig.seachForm.commands.searchFields}>Pesquisar</LayoutButtonDefault>
					<LayoutButtonDefault onClickEvent={fieldConfig.seachForm.commands.toggleDisplayType}>Novo</LayoutButtonDefault>
				</div>
				<Grid ref={gridRef} viewer={FieldGridDataViewer} layoutFormRef={layoutFormRef}/>
			</div>
		)
		,Register : ()=>(
			<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
				<TextFieldDefault params={fieldConfig.registerForm.fields.appName} 				ref={refRegisFieldName}/>
				<TextFieldDefault params={fieldConfig.registerForm.fields.appDesc} 				ref={refRegisFieldDescription}/>
				<TextFieldDefault params={fieldConfig.registerForm.fields.DataType} 				ref={refRegisFieldDbDataType}/>
				<TextFieldDefault params={fieldConfig.registerForm.fields.DataSize} 				ref={refRegisFieldDbDataSize}/>
				<TextFieldDefault params={fieldConfig.registerForm.fields.DataSizeDecimel} 	ref={refRegisFieldDbDataSizeDecimel}/>
				<TextFieldDefault params={fieldConfig.registerForm.fields.DataSizeDecimel} 	ref={refRegisFieldDbDataSizeDecimel}/>

				<CheckboxFieldDefault params={fieldConfig.registerForm.fields.IsPrimaryKey} 	ref={refRegisIsPrimaryKey}/>
				<CheckboxFieldDefault params={fieldConfig.registerForm.fields.IsAllowNull} 	ref={refRegisIsAllowNull}/>
				<CheckboxFieldDefault params={fieldConfig.registerForm.fields.IsUnique} 		ref={refRegisIsUnique}/>
				<CheckboxFieldDefault params={fieldConfig.registerForm.fields.IsInsigned} 		ref={refRegisIsInsigned}/>

				<TextFieldDefault params={fieldConfig.registerForm.fields.FieldDefaultValue} 	ref={refRegisFieldDefaultValue}/>
				<TextFieldDefault params={fieldConfig.registerForm.fields.ConstraintField} 	ref={refRegisConstraintField}/>
				<TextFieldDefault params={fieldConfig.registerForm.fields.AppDataType} 			ref={refRegisAppDataType}/>
				<TextFieldDefault params={fieldConfig.registerForm.fields.AppDataNickname} 	ref={refRegisAppDataNickname}/>

				<LayoutButtonDefault onClickEvent={fieldConfig.registerForm.commands.addFields}>Salvar</LayoutButtonDefault>
				<LayoutButtonDefault onClickEvent={fieldConfig.registerForm.commands.toggleDisplayType}>Cancelar</LayoutButtonDefault>
			</div>
		)
	}

	useEffect(
		()=>{
			if(gridRef!==null){
				if(gridRef.current!==null){
					if(gridRef.current.getGridList().length<=0){
						fieldConfig.seachForm.commands.searchFields();
					}
				}
			}

			if(!!!id){return;}
			let guid = getCaesarDecrypt(id);
			const response = apiField.httpGet({SystemIDX:guid});
			if(response instanceof Promise){
				response.then(result => {
					if (!(result && Array.isArray(result) && result.length > 0)) {return;}
					formTools.loadDataObjectToForm(fieldConfig.registerForm.fields,result[0]);
				})
			}
		}
		,[id,apiField,fieldConfig.seachForm.commands]
	)

	if(fieldDisplayType!==1 && !!!id){
		return(
			<div className="wtdhGeneral_duz24vw_20">
				<LayoutPrivateBody title="Fields> Consulta" ref={layoutFormRef}>
					<FieldDisplayType.Search/>
				</LayoutPrivateBody>
			</div>
		)
	}else{
		return(
			<div className="wtdhGeneral_duz24vw_20">
				<LayoutPrivateBody title="Fields> Cadastro" ref={layoutFormRef}>
					<FieldDisplayType.Register/>
				</LayoutPrivateBody>
			</div>
		)
	}
}
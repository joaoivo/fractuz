import { useState } from 'react';
import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'

import { TextFieldDefault } from '../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } from '../../../elements/forms/Buttons';

import { useApiFractuz } from '../../../components/api/fractus';
import { useContextConsole } from '../../../system/Contexts/Console';

export default function Application(){
	const { getApplicationList,ExceptionApiDefault } = useApiFractuz();
	const {addHistoryLog} = useContextConsole();
	
	const [searchDataObj, setsearchDataObj] = useState({});

	const setSearchData =(event,key)=>{
		const searchDataTemp = searchDataObj;
		searchDataTemp[key] = event.target.value;
		setsearchDataObj(searchDataTemp);
	}

	const searchApplicationsFields = {
		appName:{
			 labelText:"Nome da Aplicação"
			,fieldID:"name"
			,onChangeEvent:(e)=>{ setSearchData(e,"name");}
		}
		,appDesc:{
			 labelText:"Descrição"
			,fieldID:"description"
			,fieldLabelStyle:{backgroundColor:"#50505090"}
			,onChangeEvent:(e)=>{ setSearchData(e,"desc");}
		}
	}

	const searchApplications = async ()=>{
		try{
			const response = await getApplicationList(searchDataObj);
			addHistoryLog("Pesquisa de Aplicações executada");
			console.log("response",response);
		} catch (error) {
			alert("Erro ao tentar Pesquisa de Aplicações. Verifique status no Log.");
			if (error instanceof ExceptionApiDefault) {
				console.error('Exceção personalizada capturada:', error.message);
				console.error('Dados adicionais:', error);

				const errorData = JSON.stringify(error);
				addHistoryLog(`Erro no processo interno de Pesquisa de Aplicações: Mensagen: '${error.message}' 
					\n dados gerais: '${errorData}'
					\n Stack do Erro '${error.stack}'`);
				return;
			 }
			addHistoryLog("Erro ao obter o token de login:"+ error);
		}
	}

	return(
		<div className="wtdhGeneral_duz24vw_20" style={{border :"1px solid gray" }}>
			<h1>Applications</h1>
			<hr/>

			<div>
				<div className="wtdhGeneral_duz24vw_20 generalDisposition_horizDisp_spaceBetween">
					<TextFieldDefault params={searchApplicationsFields.appName}/>
					<TextFieldDefault params={searchApplicationsFields.appDesc}/>
					<LayoutButtonDefault onClickEvent={searchApplications}>Pesquisar</LayoutButtonDefault>
				</div>
				<div>
					lista de resultados
				</div>
			</div>

		</div>
	)
}
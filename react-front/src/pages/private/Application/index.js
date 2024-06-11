import { useState } from 'react';
import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'

import { TextFieldDefault } from '../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } from '../../../elements/forms/Buttons';

export default function Application(){
	const [pesqDataObj, setPesqDataObj] = useState({});

	const setPesqData =(event,key)=>{
		const pesqDataTemp = pesqDataObj;
		pesqDataTemp[key] = event.target.value;
		setPesqDataObj(pesqDataTemp);
	}

	const searchApplicationsFields = {
		appName:{
			 labelText:"Nome da Aplicação"
			,fieldID:"name"
			,onChangeEvent:(e)=>{ setPesqData(e,"name");}
		}
		,appDesc:{
			 labelText:"Descrição"
			,fieldID:"description"
			,fieldLabelStyle:{backgroundColor:"#50505090"}
			,onChangeEvent:(e)=>{ setPesqData(e,"desc");}
		}
	}

	const pesqApplications = ()=>{
		alert("que top"); 
		console.log(pesqDataObj)
	}

	return(
		<div className="wtdhGeneral_duz24vw_20" style={{border :"1px solid gray" }}>
			<h1>Applications</h1>
			<hr/>

			<div>
				<div className="wtdhGeneral_duz24vw_20 generalDisposition_horizDisp_spaceBetween">
					<TextFieldDefault params={searchApplicationsFields.appName}/>
					<TextFieldDefault params={searchApplicationsFields.appDesc}/>
					<LayoutButtonDefault onClickEvent={pesqApplications}>Pesquisar</LayoutButtonDefault>
				</div>
				<div>
					lista de resultados
				</div>
			</div>

		</div>
	)
}
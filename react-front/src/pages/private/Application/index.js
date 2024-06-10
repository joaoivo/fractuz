//import dimensions_widthDozens from '../../../style/dimensions/dimensions_widthDozens.css'
import './../../../style/dimensions/dimensions_widthDozens.css';
import './../../../style/aligns/disposition.css'

import { TextFieldDefault } from '../../../elements/forms/Fields/TextFields';
import { LayoutButtonDefault } from '../../../elements/forms/Buttons';

const searchApplicationsFields = {
	 appName:{
		 labelText:"Nome da Aplicação"
		,fieldID:"name"
	}
	,appDesc:{
		 labelText:"Descrição"
		,fieldID:"description"
		,fieldLabelStyle:{
			backgroundColor:"#50505090"
		}
	}
}

export default function Application(){
	return(
		<div className="wtdhGeneral_duz24vw_20" style={{border :"1px solid gray" }}>
			<h1>Applications</h1>
			<hr/>

			<div>
				<div className="wtdhGeneral_duz24vw_20 generalDisposition_horizDisp_spaceBetween">
					<TextFieldDefault params={searchApplicationsFields.appName}/>
					<TextFieldDefault params={searchApplicationsFields.appDesc}/>
					<LayoutButtonDefault onClickEvent={()=>{alert("que top")}}>Pesquisar</LayoutButtonDefault>
				</div>
				<div>
					lista de resultados
				</div>
			</div>

		</div>
	)
}
import { useApiFractuzApplications } 	from "../../../components/api/fractus/Applications";
import { TreatmentExceptions } 			from "../../../components/exception";
import { getCaesarEncrypt } 				from "../../../system/Libs/Crypto";
import { goToAddress,goToRoutes } 		from "../../../system/Libs/Urls";
import { routesPrivatePages } 			from "../../routes";
import { useContextPanelMessage }		from "../../../system/Contexts/Message";

export const ApplicationGridDataViewer =(props)=>{

	const { httpDelete} = useApiFractuzApplications();
	const { treatExceptions	} = TreatmentExceptions();
	const {messageBoxOpen_ok} = useContextPanelMessage();

	const application_edit=()=>{goToAddress(routesPrivatePages.Application.path+"/"+ getCaesarEncrypt(props.Data.SystemIDX));}
	const application_delete=async ()=>{
		try{
			if(!window.confirm("Confirma a exclusão da aplicação")){return;}
			await httpDelete(props.Data.SystemIDX);

			let list = props.gridFunctions.getGridList().filter(item => item.SystemIDX !== props.Data.SystemIDX);
			props.gridFunctions.setGridList(list);
			let message ="Applicação excluída com Sucesso!";
			messageBoxOpen_ok(message);
			props.layoutFormRef.current.MessagesToPanel_set(message);
		}catch(ex){
			treatExceptions(ex,"Exclusão de Aplicações");
			props.layoutFormRef.current.MessagesToPanel_set("Erro na Exclusão de Aplicações: "+ex);
		}
	}
	const application_database=()=>{
		goToRoutes(routesPrivatePages.DatabaseView.path+"/","idApp", getCaesarEncrypt(props.Data.SystemIDX));
	}

	return(
		<div style={{border:"1px solid #00000060",borderRadius:"7px",margin:"2px", padding:"5px", maxWidth:"40vw", minWidth:"25vw"}} className="generalDisposition_horizDisp_spaceBetween">
			<div style={{maxWidth:"70%"}}>
				<h3>{props.Data.Name}</h3>
				<sup><i>{props.Data.Description}</i></sup>
				{props.Data.SystemCreationUserName &&
					<div><hr/>
						<sup>
							{props.Data.SystemCreationUserName}
							{props.Data.SystemCreationDt		&& <> ({props.Data.SystemCreationDt})</>}
							{props.Data.SystemLastUpdateUser	&& <>/({props.Data.SystemLastUpdateUser})</>}
							{props.Data.SystemLastUpdateDt	&& <> ({props.Data.SystemLastUpdateDt})</>}
						</sup>
					</div>
				}
			</div>
			<div style={{display:"flex", flexDirection:"column", margin:"5px"}}>
				<button onClick={application_edit		}>Editar</button>
				<button onClick={application_database	}>Databases</button>
				<button onClick={application_delete		}>Excluir</button>
			</div>

		</div>
	);
}
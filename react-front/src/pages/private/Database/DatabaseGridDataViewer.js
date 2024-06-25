import { useApiFractuzDatabases } from "../../../components/api/fractus/Database";
import { TreatmentExceptions } 	from "../../../components/exception";
import { getCaesarEncrypt } 		from "../../../system/Libs/Crypto";
import { goToAddress,goToRoutes } 				from "../../../system/Libs/Urls";
import { routesPrivatePages } 	from "../../routes";

export const DatabaseGridDataViewer =(props)=>{

	const { httpDelete} = useApiFractuzDatabases();
	const { treatExceptions	} = TreatmentExceptions();

	const database_edit=()=>{goToAddress(routesPrivatePages.Database.path+getCaesarEncrypt(props.Data.Application)+"/"+ getCaesarEncrypt(props.Data.SystemIDX));}
	const database_delete=async ()=>{
		try{
			if(!window.confirm("Confirma a exclusão da Base de Dados")){return;}
			await httpDelete(props.Data.SystemIDX);

			let list = props.gridFunctions.getGridList().filter(item => item.SystemIDX !== props.Data.SystemIDX);
			props.gridFunctions.setGridList(list);
			let message ="Base de dados excluída com Sucesso!";
			alert(message);
			props.layoutFormRef.current.MessagesToPanel_set(message);
		}catch(ex){
			treatExceptions(ex,"Exclusão de Base de Dados");
			props.layoutFormRef.current.MessagesToPanel_set("Erro na Exclusão de Base de Dados: "+ex);
		}
	}
	const database_table=()=>{
		goToRoutes(routesPrivatePages.DatabaseView.path+"/","idApp", getCaesarEncrypt(props.Data.SystemIDX));
	}

	return(
		<div style={{border:"1px solid #00000060",borderRadius:"7px",margin:"2px", padding:"5px", maxWidth:"40vw", minWidth:"25vw"}} className="generalDisposition_horizDisp_spaceBetween">
			<div style={{maxWidth:"70%"}}>
				<h3>{props.Data.BuildOrder} - {props.Data.DatabaseName}</h3>
				<sup><i>{props.Data.DatabaseDescription}</i></sup>
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
				<button onClick={database_edit	}>Editar</button>
				<button onClick={database_table	}>Databases</button>
				<button onClick={database_delete	}>Excluir</button>
			</div>

		</div>
	);
}
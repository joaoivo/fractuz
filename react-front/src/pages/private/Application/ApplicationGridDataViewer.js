export const ApplicationGridDataViewer =(props)=>{
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
				<button>Editar</button>
				<button>Databases</button>
				<button>Excluir</button>
			</div>

		</div>
	);
}
export const ApplicationGridViewer =(props)=>{
	return(
		<div style={{border:"1px solid #00000060",borderRadius:"7px",margin:"2px", padding:"5px", maxWidth:"40vw", minWidth:"25vw"}} className="generalDisposition_horizDisp_spaceBetween">
			<div style={{maxWidth:"70%"}}>
				<h3>{props.Application.Name}</h3>
				<sup><i>{props.Application.Description}</i></sup>
				{props.Application.SystemCreationUserName &&
					<div><hr/>
						<sup>
							{props.Application.SystemCreationUserName}
							{props.Application.SystemLastUpdateUser&& <>/{props.Application.SystemLastUpdateUser}</>}
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
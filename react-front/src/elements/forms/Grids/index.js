import { forwardRef, useImperativeHandle, useState } from 'react';

export const Grid = forwardRef(({children, ...props}, ref)=>{
	const [list, setList ] = useState([]);

	useImperativeHandle(ref, () => {
		return{
			 getGridList(){ return (list);}
			,setGridList(inputList){ setList(inputList);}
		}
	},[list]);

	if(list.length <= 0){return <></>}
	return(
		<div>
			<div className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
				<h2>
					<i>
						{list.length === 1 ? "1 aplicação encontrada":list.length.toString() + " Aplicações encontradas" }  
					</i>
				</h2>
				<button onClick={()=>setList([])}>X</button>
			</div>
			<div style={{maxHeight:"25vh",overflowY:"auto", padding:"5px"}} className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceAround">
				{list.map((app,idx)=>{
					return <props.viewer key={idx} Application={app}/>
				})}
			</div>
		</div>
	)
})

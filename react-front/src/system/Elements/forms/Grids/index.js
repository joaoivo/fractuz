import { forwardRef, useImperativeHandle, useState } from 'react';

export const Grid = forwardRef(({children, ...props}, ref)=>{
	const [list, setList ] = useState([]);

	const getGridList=()=>{ return (list);}
	const setGridList=(inputList)=>{ setList(inputList);}

	useImperativeHandle(ref, () => {
		return{
			 getGridList
			,setGridList
		}
	},[]);

	if(!Array.isArray(list)){return <></>}
	if(list.length <= 0){return <></>}
	return(
		<div 		className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
			<div 	className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceBetween">
				<h2>
					<i>{list.length === 1 ? "1 registro encontrado":list.length.toString() + " registros encontrados"}</i>
				</h2>
				<button onClick={()=>setList([])}>X</button>
			</div>
			<div style={{maxHeight:"25vh",overflowY:"auto", padding:"5px"}} className="wtdhGeneral_duz24pc_24 generalDisposition_horizDisp_spaceAround">
				{list.map((app,idx)=>{return <props.viewer key={idx} Data={app} layoutFormRef={props.layoutFormRef} gridFunctions={{getGridList,setGridList}}/>})}
			</div>
		</div>
	)
})
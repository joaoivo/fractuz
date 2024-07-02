import { useState,useEffect} from 'react';
import { useContextConsole } from "../../../system/Contexts/Console";

import './consoleLog.css';

export default function ConsoleLog() {
	const [ histories, setHistories] = useState([]);
	const [ inputValue, setInputValue] = useState('');
	const { getHistoryLog, addHistoryLog,clearHistoryLog} = useContextConsole();

	const getHistoriesTable=()=>{
		if(!histories || histories.length<=0){
			return(<div><i>Bem Vindo!</i></div>);
		}else{
			return(
				<table>
					<tbody>
					{	histories.slice().reverse().map((hist,index)=>(
							<tr key={index}>
								<td>{hist.dateTime} &#62;&#62;</td>
								<td>{hist.message}</td>
							</tr>
						))
					}
					</tbody>
				</table>
			);
		}
	}
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			addHistoryLog("usuário digitou: "+inputValue);
			setInputValue("");
			setHistories(getHistoryLog());
		}
	};

	const clearHistoryConsole = (event) => {
		clearHistoryLog();
		addHistoryLog("usuário limpou histórico do Console");
		setInputValue("");
		setHistories(getHistoryLog());
	};

	useEffect(() => {
		// No additional action needed, this effect just ensures re-rendering when logUpdated changes
  }, [histories]);

	return (
		<pre>
			<div className="generalDisposition_horizDisp_spaceBetween">
				<h1>Console Log de usuário</h1>
				<button 
					style={{
						 fontSize:"8px"
						,backgroundColor:"#00000090"
						, color:"#ffffffa0"
						, borderRadius:"3px"
						,border:"1px solid #88888810"
					}}
					
					onClick={clearHistoryConsole}
					>X</button>
			</div>
			
			<div className='consoleUserInput'>
				&#62;&#62; <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}></input>
			</div>
			<div style={{maxHeight:"50px", overflowX:"hidden", overflowY:"auto"}}>
				{getHistoriesTable()}
			</div>
		</pre>
	);
}
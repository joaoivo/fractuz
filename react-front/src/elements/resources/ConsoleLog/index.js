import React, { useState, useEffect} from 'react';
import { useContextConsole } from "../../../system/Contexts/Console";

import './consoleLog.css';

export default function ConsoleLog() {
	const [inputValue, setInputValue] = useState('');
	const { histories, addHistoryLog} = useContextConsole();

	const getHistoriesTable=()=>{
		if(!histories || histories.length<=0){
			return(<div><i>Bem Vindo!</i></div>);
		}else{
			return(
				<table>
					{	histories.slice().reverse().map((hist,index)=>(
							<tr key={index}>
								<td>{hist.dateTime} &#62;&#62;</td>
								<td>{hist.message}</td>
							</tr>
						))
					}
				</table>
			);
		}
	}
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			addHistoryLog("usuário digitou: "+inputValue);
			setInputValue("");
		}
	 };

	return (
		<pre>
			<h1>Console Log de usuário</h1>
			<div className='consoleUserInput'>
				&#62;&#62; <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}></input>
			</div>
			<div style={{maxHeight:"50px", overflowX:"hidden", overflowY:"auto"}}>
				{getHistoriesTable()}
			</div>
		</pre>
	);
}
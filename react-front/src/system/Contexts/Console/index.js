// auth.js
import { createContext, useContext } from 'react';
import { getCurrentDateTimeStampFormated } from '../../Libs/DateTimes';

const ContextConsole = createContext({});
const ConsoleHistoryMaxEntries = 100;

export const historyCriticalLevel={
	 normal 	: 0
	,warning	: 1
	,critical: 2
}

export const historyType={
	 information:0
	,error		:1
}

export function ContextConsoleProvider({ children }) {
	const ConsoleLocalStorageID = 'actionHistory';

	const addHistoryLog = (message,criticalLevel,type, link,comment)=>{
		if(criticalLevel	===undefined) {criticalLevel	= historyCriticalLevel.normal;}
		if(type				===undefined) {type				= historyType.normal;}
		if(link				===undefined) {link				= null;}
		if(comment			===undefined) {comment			= null;}

		let hist = {
			message			:message
			,criticalLevel	:criticalLevel
			,type				:type
			,link				:link
			,dateTime		:getCurrentDateTimeStampFormated()
			,comment			:comment
			,react			:0
		}

		let history = JSON.parse(localStorage.getItem(ConsoleLocalStorageID)) || [];

		// Adicionar a nova ação ao histórico
		history.push(hist);
		
		// Manter apenas as últimas `maxEntries` ações
		if (history.length > ConsoleHistoryMaxEntries) {history = history.slice(-ConsoleHistoryMaxEntries);}
		
		// Salvar o histórico atualizado no localStorage
		localStorage.setItem(ConsoleLocalStorageID, JSON.stringify(history));
	}

	function getHistoryLog() {return JSON.parse(localStorage.getItem(ConsoleLocalStorageID)) || [];}
	function clearHistoryLog() {localStorage.removeItem(ConsoleLocalStorageID);}
  
	return (
		<ContextConsole.Provider value={{ getHistoryLog,addHistoryLog,clearHistoryLog}}>
			{children}
		</ContextConsole.Provider>
	);
}

export function useContextConsole() {
	return useContext(ContextConsole);
}
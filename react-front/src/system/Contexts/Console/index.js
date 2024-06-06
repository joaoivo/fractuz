// auth.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {Navigate,useLocation } from 'react-router-dom';

const ContextConsole = createContext({});

export const historyCriticalLevel={
	 normal 	: 0
	,warning	: 1
	,critical: 2
}

export const historyType={
	 information:0
	,error		:1
}

export function getCurrentDateTimeStamp() {
	const now = new Date();
	
	const year = now.getFullYear();
	
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	
	const formattedDateTime = `${year}${month}${day}_${hours}${minutes}${seconds}`;
	
	return formattedDateTime;
}

export function getCurrentDateTimeStampFormated() {
	const now = new Date();
	
	const year = now.getFullYear();
	
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const miliSeconds = String(now.getMilliseconds()).padStart(4, '0');
	
	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${miliSeconds}`;
	
	return formattedDateTime;
}

export function ContextConsoleProvider({ children }) {
	const [histories, setHistories] = useState([]);

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

		setHistories((prevHistories) => {
			const updatedHistories = [...prevHistories, hist];
			return updatedHistories;
		});
	}

	return (
		<ContextConsole.Provider value={{ histories,getCurrentDateTimeStampFormated,getCurrentDateTimeStamp,addHistoryLog}}>
			{children}
		</ContextConsole.Provider>
	);
}

export function useContextConsole() {
	return useContext(ContextConsole);
}
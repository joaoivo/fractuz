import {	Route, Outlet,useLocation} from 'react-router-dom';

// Funcções de Layout
import LayoutPrivate from '../../elements/layouts/Private'
import LayoutPublic 	from '../../elements/layouts/Public';

//Public Pages
import Index 			from '../public/Index';
import About 			from '../public/About';
import Login 			from '../public/Login';

// User Pages
import Database 		from '../private/Database';
import Application	from '../private/Application'
import Tables 			from '../private/Table';
import Field 			from '../private/Field';
import Home 			from '../private/Home';

//system Pages
import PageNotFound 	from '../system/PageNotFound';

import { useContextAuth } 		from '../../system/Contexts/Auth';
import { useContextConsole } 	from '../../system/Contexts/Console';
import { goToAddress } 			from '../../system/Libs/Urls';

export const routesPublicPages = {
	 Index:{ path:"/"			, app:Index ,name:"Página Inicial"}
	,About:{ path:"/About"	, app:About ,name:"Sobre a Empresa"}
	,Login:{ path:"/Login"	, app:Login ,name:"Login"}
};

export const routesPrivatePages = {
	 Home:				{ path:"/Home"									, app:Home 			,name:"Home"}
	,Application:		{ path:"/Application"						, app:Application ,name:"Aplicações"}
	,ApplicationEdit:	{ path:"/Application/:id"					, app:Application	,name:"Aplicações"}
	,Database:			{ path:"/Database/"							, app:Database 	,name:"Bases de Dados"}
	,DatabaseView:		{ path:"/Database/:idApp"					, app:Database 	,name:"Bases de Dados"}
	,DatabaseEdit:		{ path:"/Database/:idApp/:idDatabase"	, app:Database 	,name:"Bases de Dados"}
	,Table:				{ path:"/Table/"								, app:Tables 		,name:"Tabelas"}
	,TableView:			{ path:"/Table/:idDatabase"				, app:Tables 		,name:"Tabelas"}
	,TableEdit:			{ path:"/Table/:idDatabase/:idTable"	, app:Tables 		,name:"Tabelas"}
	,Field:				{ path:"/Field/"								, app:Field 		,name:"Campos das tabelas"}
	,FieldView:			{ path:"/Field/:idTable"					, app:Field 		,name:"Campos das tabelas"}
	,FieldEdit:			{ path:"/Field/:idTable/:idField"		, app:Field 		,name:"Campos das tabelas"}
};

export const routesSystemPages = {
	PageNotFound:	{ path:"*"		, app:PageNotFound ,name:"Página de Erro"}
};

function PrivateRoute() {
	const { isUserAuthenticated } 	= useContextAuth();
	const { addHistoryLog } 	= useContextConsole();
	const location = useLocation();

	if( isUserAuthenticated()){
		return <LayoutPrivate><Outlet/></LayoutPrivate> 
	}else{
		alert(`Sem permissão de acesso ao endereço '${location.pathname}'`);
		addHistoryLog(`Sem permissão de acesso ao endereço '${location.pathname}'`);
		goToAddress(routesPublicPages.Login.path);
	}
}

function PublicRoute() {
	const { isUserAuthenticated } 	= useContextAuth();
	if(isUserAuthenticated()){
		return <LayoutPrivate><Outlet/></LayoutPrivate> 
	}else{
		return <LayoutPublic><Outlet/></LayoutPublic> 
	}
}

export function getRoutes(rout,LayoutComponent){
	return(
		<Route element={<LayoutComponent />}>
			{	Object.entries(rout).map(([key, rt]) => (
					<Route key={key} path={rt.path} element={<article className='body'><rt.app /></article>} />
				))
			}
		</Route>
	);
}

export function getRoutesForPrivatePages(){
	return( getRoutes(routesPrivatePages,PrivateRoute));
}
export function getRoutesForPublicPages(){
	return( getRoutes(routesPublicPages,PublicRoute));
}
export function getRoutesForSystemPages(){
	return( getRoutes(routesSystemPages,PublicRoute));
}
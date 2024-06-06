import {	Route, Outlet,Navigate,useLocation} from 'react-router-dom';

// Funcções de Layout
import LayoutPrivate from '../../elements/layouts/Private'
import LayoutPublic 	from '../../elements/layouts/Public';

//Public Pages
import Index 			from '../../pages/public/Index';
import About 			from '../../pages/public/About';
import Login 			from '../../pages/public/Login';

// User Pages
import Application	from '../../pages/private/Application'
import Home 			from '../../pages/private/Home';

//system Pages
import PageNotFound 	from '../../pages/system/PageNotFound';


import { useContextAuth } from '../../system/Contexts/Auth';
import { useContextConsole } from '../../system/Contexts/Console';

export const routesPublicPages = {
	 Index:{ path:"/"			, app:Index ,name:"Página Inicial"}
	,About:{ path:"/About"	, app:About ,name:"Sobre a Empresa"}
	,Login:{ path:"/Login"	, app:Login ,name:"Login"}
};

export const routesPrivatePages = {
	 Home:			{ path:"/Home"			, app:Home 			,name:"Home"}
	,Application:	{ path:"/Application", app:Application ,name:"Aplicações"}
};

export const routesSystemPages = {
	PageNotFound:	{ path:"*"		, app:PageNotFound ,name:"Página de Erro"}
};

function PrivateRoute() {
	const { isAuthenticated } 	= useContextAuth();
	const { addHistoryLog } 	= useContextConsole();
	const location = useLocation();
	if(isAuthenticated){
		<LayoutPrivate><Outlet /></LayoutPrivate> 
	}else{
		alert(`Sem permissão de acesso ao endereço '${location.pathname}'`);
		addHistoryLog(`Sem permissão de acesso ao endereço '${location.pathname}'`);
		return <Navigate to={routesPublicPages.Login.path} />
	}
}

export function getRoutes(rout,LayoutComponent){
	return(
		<Route element={<LayoutComponent />}>
			{
				Object.entries(rout).map(([key, rt]) => (
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
	return( getRoutes(routesPublicPages,LayoutPublic));
}
export function getRoutesForSystemPages(){
	return( getRoutes(routesSystemPages,LayoutPublic));
}
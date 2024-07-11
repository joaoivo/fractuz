import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { routesPublicPages, routesPrivatePages } 	from '../../../pages/routes';
import { useContextAuth } 									from '../../../system/Contexts/Auth';
import { useContextConsole } 								from '../../../system/Contexts/Console';
import { goToAddress } 										from '../../../system/Libs/Urls';
import { isObjectEmpty } from '../../../system/Libs/Objects';

function Header() {
	const {logout, getUserLogged} = useContextAuth();
	const {addHistoryLog } =useContextConsole();
	const [userLogged, setUserLogged ] =useState({});

	const logoffUser = ()=>{
		if(!window.confirm("Você deseja realmente desfazer o login?")){return;}
		logout();
		addHistoryLog("Usuário deslogou-se do sistema")
		goToAddress(routesPublicPages.Login.path);
	}

	return (
		<header>
			<h1>Fractuz</h1>
			<div>
				<nav>
						<Link to={routesPublicPages.Index.path}			>{routesPublicPages.Index.name}</Link> 
					|	<Link to={routesPublicPages.About.path}			>{routesPublicPages.About.name}</Link>
					|
					|	<Link to={routesPrivatePages.Home.path}			>{routesPrivatePages.Home.name}</Link>
					|	<Link to={routesPrivatePages.Application.path}	>{routesPrivatePages.Application.name}</Link>

					|	<Link onClick={logoffUser}								>Logoff</Link> 
				</nav>
			</div>
			{(!isObjectEmpty(userLogged) ) && (<div>Bem-vindo {userLogged.name} <i>({userLogged.mail})</i></div>)}
		</header>
	);
}

export default Header;
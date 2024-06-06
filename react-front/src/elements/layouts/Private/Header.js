import React from 'react';
import { Link } from 'react-router-dom';

import { routesPublicPages, routesPrivatePages } from '../../../pages/routes';

function Header() {
	return (
		<header>
			<h1>Header Privado</h1>
			<nav>
					<Link to={routesPublicPages.Index.path}			>{routesPublicPages.Index.name}</Link> 
				|	<Link to={routesPublicPages.Login.path}			>{routesPublicPages.Login.name}</Link> 
				|	<Link to={routesPublicPages.About.path}			>{routesPublicPages.About.name}</Link>
				|
				|	<Link to={routesPrivatePages.Home.path}			>{routesPrivatePages.Home.name}</Link>
				|	<Link to={routesPrivatePages.Application.path}	>{routesPrivatePages.Application.name}</Link>
			</nav>
		</header>
	);
}

export default Header;
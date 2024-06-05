import React from 'react';
import { Link } from 'react-router-dom';

import { routesPublicPages } from '../../../pages/routes';

function Header() {
	return (
		<header style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
			<h1>Header Público</h1>
			<nav>
				<Link to={routesPublicPages.Index.path}>{routesPublicPages.Index.name}</Link> 
			|  <Link to={routesPublicPages.Login.path}>{routesPublicPages.Login.name}</Link> 
			| 	<Link to={routesPublicPages.About.path}>{routesPublicPages.About.name}</Link>
			</nav>
		</header>
	);
}

export default Header;
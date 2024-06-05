import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
			<h1>Header Privado</h1>
			<nav>
			<Link to="/">Home </Link> | <Link to="/Login">Sair</Link> | <Link to="/about">Sobre a Empresa</Link>
			</nav>
		</header>
	);
}

export default Header;
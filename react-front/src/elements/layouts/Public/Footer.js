// components/Footer.jsx
import React from 'react';
import ConsoleLog from '../../resources/ConsoleLog';

function Footer() {
	return (
		<footer>
			{<ConsoleLog/>}
			<div className='copyRight'>&copy; 2024 Empresa. Todos os direitos reservados.</div>
		</footer>
	);
}

export default Footer;

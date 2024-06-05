// components/PrivateLayout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

function LayoutPrivate({ children }) {
	return (
		<div>
			<Header />
				{/* Ajuste o paddingBottom conforme necessário para evitar sobreposição com o rodapé */}
				<div style={{ paddingBottom: '60px' }}> 
					{children}
				</div>
			<Footer />
		</div>
	);
}

export default LayoutPrivate;

// components/PrivateLayout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

function LayoutPrivate({ children }) {
	return (
		<div>
			<Header />
			<div style={{ paddingBottom: '60px' }}> 
				{children}
			</div>
			<Footer />
		</div>
	);
}

export default LayoutPrivate;

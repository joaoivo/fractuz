import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

function LayoutPublic() {
	return (
		<div>
			<Header />
			<Outlet/>
			<Footer />
		</div>
	);
}

export default LayoutPublic;
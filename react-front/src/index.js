// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter ,
	Routes,
	Route,
	Navigate,
	Outlet
} from 'react-router-dom';

// internal Tools
import {DevEnvAssist}  	from './system/DevEnvAssist';
import LayoutPrivate  	from './elements/layouts/Private'
import LayoutPublic 		from './elements/layouts/Public';
import { AuthProvider, useAuth } from './system/auth';

//Public Pages
import Index 			from './pages/public/Index';
import About 			from './pages/public/About';

// User Pages
import Application	from './pages/private/Application'
import Login 			from './pages/private/Login';
import Home 			from './pages/private/Home';

//system Pages
import PageNotFound 	from './pages/system/PageNotFound';


/// Extras Components
function PrivateRoute() {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <LayoutPrivate><Outlet /></LayoutPrivate> : <Navigate to="/Login" />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<DevEnvAssist>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					
					<Route element={<LayoutPublic />}>
						<Route path="/" Component={Index} />
						<Route path="/About" Component={About} />
						<Route path="/Login" Component={Login} />
					</Route>
					
					<Route element={<PrivateRoute />}>
						<Route path="/Home" Component={Home} />
						<Route path="/Application" Component={Application} />
					</Route>

					<Route path="*" Component={PageNotFound} />
					
				</Routes>
			</BrowserRouter>
		</AuthProvider>
  	</DevEnvAssist>
);
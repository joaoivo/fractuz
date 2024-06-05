// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter ,
	Routes
} from 'react-router-dom';

// internal Tools
import { DevEnvAssist } from './system/DevEnvAssist';
import { AuthProvider } from './system/auth';

import { getRoutesForPrivatePages, getRoutesForPublicPages, getRoutesForSystemPages } from './pages/routes';

import './style/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<DevEnvAssist>
		
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					{getRoutesForPublicPages()}
					{getRoutesForPrivatePages()}
					{getRoutesForSystemPages()}					
				</Routes>
			</AuthProvider>
		</BrowserRouter>
		
  	</DevEnvAssist>
);
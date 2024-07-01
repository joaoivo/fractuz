// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter ,
	Routes
} from 'react-router-dom';

// System Internal Tools
import { DevEnvAssist } from './system/DevEnvAssist';
import { ContextAuthProvider		} from './system/Contexts/Auth';
import { ContextConsoleProvider	} from './system/Contexts/Console';

import { getRoutesForPrivatePages, getRoutesForPublicPages, getRoutesForSystemPages } from './pages/routes';

import './style/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<DevEnvAssist>
		<BrowserRouter>
			<ContextConsoleProvider>
				<ContextAuthProvider>
					<Routes>
						{getRoutesForPublicPages()}
						{getRoutesForPrivatePages()}
						{getRoutesForSystemPages()}
					</Routes>
				</ContextAuthProvider>
			</ContextConsoleProvider>
		</BrowserRouter>
		
	</DevEnvAssist>
);
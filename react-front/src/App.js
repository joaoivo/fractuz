import React, {Component} from 'react';
import {Route, Routes, BrowserRouter } from 'react-router-dom';

import Index 			from './elements/pages/Login';
import Home 			from './elements/pages/Home';
import PageNotFound 	from './elements/pages/PageNotFound';
import Login 			from './elements/pages/Login';

class App extends Component {

	render(){
		return(
			<BrowserRouter>
				<Routes>
					<Route path="/" Component={Index} />
					<Route path="/Home" Component={Home} />
					<Route path="/Login" Component={Login} />
					<Route path="*" Component={PageNotFound} />
				</Routes>
			</BrowserRouter>
		)
	}
}

export default App;
import { Component } from "react";
import { Link } from 'react-router-dom';
import { routesPublicPages, routesPrivatePages } from '../../../pages/routes';

class Menu extends Component{
	render(){
		return(
			<div>
				<Link to={routesPublicPages.Index.path}			>{routesPublicPages.Index.name}</Link> 

			| 	<Link to={routesPrivatePages.Home.path}			>{routesPrivatePages.Home.name}</Link>
			| 	<Link to={routesPrivatePages.Application.path}	>{routesPrivatePages.Application.name}</Link>

			|  <Link to={routesPublicPages.Login.path}			>{routesPublicPages.Login.name}</Link> 
			</div>
		);
	}
}

export default Menu;
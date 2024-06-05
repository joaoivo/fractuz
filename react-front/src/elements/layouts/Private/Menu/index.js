import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Menu extends Component{
	render(){
		return(
			<div>
				<Link to="/Application">Application</Link>
				<Link to="/Database">Databases</Link>
				<Link to="/Database/Table">Tables</Link>
				<Link to="/Database/Table/Field">Fields</Link>
				<Link to="/Login">logout</Link>
			</div>
		);
	}
}

export default Menu;
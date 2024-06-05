import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Index extends Component{
	render(){
		return(
			<div>
				fractus Index
				<br/>
				<Link to="/">Index</Link>
				<br/>
				<Link to="/Login">login</Link>
				<br/>
				<Link to="/About">Sobre</Link>
			</div>
		);
	}
}

export default Index;
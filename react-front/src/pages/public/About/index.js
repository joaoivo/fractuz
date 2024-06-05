import React, { Component } from "react";
import { Link } from 'react-router-dom';

class About extends Component{
	render(){
		return(
			<div>
				fractus About
				<br/>
				<Link to="/">Index</Link>
				<br/>
				<Link to="/Login">login</Link>
			</div>
		);
	}
}

export default About;
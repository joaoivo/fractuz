import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Home extends Component{
	render(){
		return(
			<div>
				fractus Home
				<Link to="/">Index</Link>
				<Link to="/Login">login</Link>
			</div>
		);
	}
}

export default Home;
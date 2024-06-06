import { Component } from "react";
import { Link } from 'react-router-dom';

class Application extends Component{
	render(){
		return(
			<div>
				fractus Application
				<Link to="/Home">Back to Home</Link>
			</div>
		);
	}
}

export default Application;
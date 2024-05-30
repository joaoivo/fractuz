import React, { Component } from "react";
import { Link } from 'react-router-dom';

class PageNotFound extends Component{
	render(){
		return(
			<div>
				Page Not Found

				<Link to="/dashboad">Go to dashboard</Link>
			</div>
		);
	}
}

export default PageNotFound;
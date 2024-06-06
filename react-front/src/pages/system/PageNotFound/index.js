import { Component } from "react";
import { Link } from 'react-router-dom';

class PageNotFound extends Component{
	render(){
		return(
			<div>
				Page Not Found <Link to="/">Go to Index</Link>
			</div>
		);
	}
}

export default PageNotFound;
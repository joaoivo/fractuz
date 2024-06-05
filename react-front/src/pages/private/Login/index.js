import React, { Component } from "react";

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			 email:""
			,password:""
		};
	}
	render(){
		return(
			<div>
				<div><label>E-mail:<input type="email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/></label></div>
				<div><label>Password:<input type="password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/></label></div>
			</div>
		);
	}
}

export default Login;
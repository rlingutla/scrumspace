import React from 'react';
import { sendXHRPromise } from '../../server_calls/index';

export const logout = () => {

};

export default class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleChange(e){
		let field = e.target.attributes.name.nodeValue;
		this.setState({ [field]: e.target.value });
	}


	postLogin(){
		sendXHRPromise('POST', '/login', { email: this.state.email, password: this.state.password }).then((response) => {
			window.sessionStorage.accessToken = response.token;
			this.props.renderScrumspace();
		});
	}

	render(){
		return (
			<div id="login">
				<div id="scrumspace_logo"></div>
				<div className="row">
					<div className="col-md-4 col-sm-6 login">
						<div className="content vertical-content">
							<div className="tag">
								welcome, <br/>this is <span className="black">scrumspace.</span>
							</div>
							<div className="form-container">
								<form id="login-form">
									<div className="input-element left-glyph">
										<i className="ion ion-ios-person-outline"></i>
										<input value={this.state.email} onChange={(e) => this.handleChange(e)}  name="email" type="text" className="form-control" placeholder="email" autofocus />
									</div>
									<div className="input-element left-glyph">
										<i className="ion ion-ios-locked-outline"></i>
										<input value={this.state.password} onChange={(e) => this.handleChange(e)} name="password" type="password" className="form-control" placeholder="password" />
									</div>
									<button type="button" onClick={(e) => this.postLogin()}>Login</button>
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-8 col-sm-6 preview"></div>
				</div>
			</div>
		);
	}
}
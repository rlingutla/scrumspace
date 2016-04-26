import React from 'react';
import { sendXHRPromise } from '../server_calls/index';

export class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: false
		};
	}

	handleChange(e){
		let field = e.target.attributes.name.nodeValue;
		this.setState({ [field]: e.target.value });
	}

	keyHandler(e){
		if (e.key === 'Enter') {
			this.postLogin();
		}
	}


	postLogin(){
		this.setState({loading: true});

		sendXHRPromise('POST', '/login', { email: this.state.email, password: this.state.password }, false).then((response) => {
			this.setState({loading: false});
			localStorage.scrumToken = response.token;
			this.props.renderScrumspace();
		}, 
		(error) => {
			this.setState({error: 'invalid credentials', loading: false});
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
								<form id="login-form" style={(this.state.loading === true) ? {pointerEvents:'none', opacity: 0.5}:null}>
									<div className="input-element left-glyph">
										<i className="ion ion-ios-person-outline"></i>
										<input disabled={this.state.loading} className={'form-control ' + ((this.state.error) ? 'error':null)} value={this.state.email} onChange={(e) => this.handleChange(e)}  name="email" type="text" placeholder="email" autofocus />
									</div>
									<div className="input-element left-glyph">
										<i className="ion ion-ios-locked-outline"></i>
										<input disabled={this.state.loading} className={'form-control ' + ((this.state.error) ? 'error':null)} value={this.state.password} onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.keyHandler(e)} name="password" type="password" placeholder="password" />
									</div>
									{/*<div className={'login-result ' + ((this.state.error) ? 'visible':null)}>
										<h4>{this.state.error}</h4>
									</div>*/}
									{/*<button type="button" onClick={(e) => this.postLogin()}>Login</button>*/}
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

export const logout = () => {
	delete localStorage.scrumToken;
	location.reload();
};
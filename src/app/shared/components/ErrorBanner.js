import React from 'react';

export default class ErrorBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      errors: ""
    };
    if(typeof(window) !== 'undefined'){
      window.ErrorBanner = (errorText) => {
        this.setState({
          active: true,
          error: errorText
        })
      };
    }
  }
  
  render() {
    let active = (this.state.active) ? 'active':null;

    return (
      <div className={"error-overlay " + active}>
        <div className={"error-banner alert alert-danger"} role="alert">
          ScrumSpace was unable to complete a recent request: {this.state.error}<br />
          Please <a style={{cursor:'pointer'}} onClick={() => window.location.reload()}>refresh the web page</a> and try again.
        </div>
      </div>
    );
  }
}

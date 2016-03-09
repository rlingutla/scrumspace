import React from 'react';

//Not much in here will need to be touched. I was cosidering not even abstracting this...
export default class TimeTable extends React.Component {
	constructor(props){
		super(props);
    this.state = { data: props.data, name: '', start: '', end: ''};
	}

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleStartChange(e) {
    this.setState({ start: e.target.value });
  }

  handleEndChange(e) {
    this.setState({ end: e.target.value });
  }

	render(){
		return (
      <div className="panel panel-primary">
        <div className="panel-heading">
           <h4><span className="glyphicon glyphicon-calendar"></span> Timeframe</h4>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <div className="left-date-input">
                  <label>Enter Sprint Name</label>
                  <input type="text" className="form-control strech-input" placeholder="Name of Sprint"
                  value={this.state.name} onChange={(e) => this.handleNameChange(e)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="left-date-input">
                  <label>Enter Start Date</label>
                  <input type="date" className="form-control strech-input" placeholder="Enter Start Date"
                  value={this.state.start} onChange={(e) => this.handleStartChange(e)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="right-date-input">
                  <label>Enter End Date</label>
                  <input type="date" className="form-control strech-input" placeholder="Enter End Date"
                  value={this.state.end} onChange={(e) => this.handleEndChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

import React from 'react';

//Not much in here will need to be touched. I was cosidering not even abstracting this...
export default class TimeTable extends React.Component {
	constructor(props){
		super(props);
		//this.state = { data: props.data, name: '', start: '', end: ''};
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
							<div className="col-md-4">
								<div className="left-date-input">
									<label>Enter Sprint Name</label>
									<input type="text" className="form-control strech-input" placeholder="Name of Sprint"
									value={this.props.name} onChange={(e) => this.props.handleChange('time-name', e)}
									/>
								</div>
							</div>
							<div className="col-md-2">
								<div className="left-date-input">
									<label>Enter Scrum Time</label>
									<input type="text" className="form-control strech-input" placeholder="Time of Scrum"
									value={this.props.scrumtime} onChange={(e) => this.props.handleChange('time-scrum', e)}
									/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="left-date-input">
									<label>Enter Start Date</label>
									<input type="date" className="form-control strech-input" placeholder="Enter Start Date"
									value={this.props.startdate} onChange={(e) => this.props.handleChange('time-start', e)}
									/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="right-date-input">
									<label>Enter End Date</label>
									<input type="date" className="form-control strech-input" placeholder="Enter End Date"
									value={this.props.enddate} onChange={(e) => this.props.handleChange('time-end', e)}
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

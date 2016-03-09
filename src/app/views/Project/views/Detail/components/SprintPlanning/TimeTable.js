import React from 'react';

export default class TimeTable extends React.Component {
	constructor(props){
		super(props);
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
                  <input type="text" className="form-control strech-input" placeholder="Name of Sprint"/>
                </div>
              </div>
              <div className="col-md-3">
                <div className="left-date-input">
                  <label>Enter Start Date</label>
                  <input type="date" className="form-control strech-input" placeholder="Enter Start Date"/>
                </div>
              </div>
              <div className="col-md-3">
                <div className="right-date-input">
                  <label>Enter End Date</label>
                  <input type="date" className="form-control strech-input" placeholder="Enter End Date"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

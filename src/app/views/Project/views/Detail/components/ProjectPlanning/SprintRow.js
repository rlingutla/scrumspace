import React from 'react';
import Story from './Story';

//This row represents a "sprint"
export default class SprintRow extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h4>Sprint 1 </h4> </div>
        <div className="panel-body">
          <div className="row">
            <Story/>
            <Story/>
          </div>
        </div>
        <div className="panel-footer settings-foot">
          <button type="save" data-toggle="modal" data-target="#myModal2" className="btn btn-success pull-right save">New Sprint</button>
        </div>
      </div>
    );
  }
}

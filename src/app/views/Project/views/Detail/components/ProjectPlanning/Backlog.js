import React from 'react';
import Story from './Story'

//Holds stories not tied to a sprint
export default class Backlog extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h4>Backlog </h4> </div>
        <div className="panel-body">
          <div className="row">
            <Story/>
            <Story/>
            <Story/>
            <Story/>
          </div>
        </div>
        <div className="panel-footer settings-foot">
          <button type="save" className="btn btn-success pull-right save" data-toggle="modal" data-target="#myModal1"> New Story</button>
        </div>
      </div>
    );
  }
}

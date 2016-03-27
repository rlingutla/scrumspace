import React from 'react';
import Backlog from './Backlog';
import SprintRow from './SprintRow';

export default class PlanView extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
      <div className="container">
        <div className="panel-group">
          <Backlog/>
          <SprintRow/>
        </div>
      </div>
    );
  }
}

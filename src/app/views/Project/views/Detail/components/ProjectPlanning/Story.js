import React from 'react';

//This story may be in a sprint, or not
export default class Story extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
      <div className="col-md-3">
        <div className="panel panel-default" data-toggle="modal" data-target="#myModal">
          <div className="panel-heading">{this.props.data.title}</div>
          <div className="panel-body">
            <p>{this.props.data.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

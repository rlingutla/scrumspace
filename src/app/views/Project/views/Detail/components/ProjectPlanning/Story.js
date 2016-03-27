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
          <div className="panel-heading">story 1</div>
          <div className="panel-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscingoldent, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div>
        </div>
      </div>
    );
  }
}

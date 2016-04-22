import React from 'react';
import GitGraphs from './GitGraphs';
import GitGraphs2 from './GitGraphs2';
import { Grid, Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import _ from 'underscore';


/*<Row className="show-grid">
<h1><b><u>My Stats</u></b> </h1>
	{props.user.stats.map((stat, i) => {
		return (
			<Col xs={12} sm={6} md={6} key={i}>
				{/* pass down project object as props for GitGraphs*///}
				/*<GitGraphs {...stat}/>
			</Col>
		);
	})}
</Row>*/


const GitList = (props) => {

	return (
		<div className="content">
			<div className="project-container">
          <Row className="show-grid">
          <h1><b><u>Total Commits for each project</u></b> </h1>
            {props.projects.map((project, i) => {
              return (
                <Col xs={12} sm={6} md={6} key={i}>
                  {/* pass down project object as props for GitGraphs2 */}
                  <GitGraphs2 {...project}/>
                </Col>
              );
            })}
            </Row>
			</div>
		</div>
	);
};

//redux
const mapStateToProps = (state) => {
	return {
		//convert projects dict to array and map to component's state
		projects: _.values(state.projects),
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GitList);

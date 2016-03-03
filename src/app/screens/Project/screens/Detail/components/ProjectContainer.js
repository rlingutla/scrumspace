import { connect } from 'react-redux';
import Project from './Project';
import _ from 'underscore';

//maps redux state to component props
const mapStateToProps = (state) => {
  return state.projects;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return stateProps[ownProps.id];
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
}

const ProjectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Project)

export default ProjectContainer;
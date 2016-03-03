import { connect } from 'react-redux';
import ProjectList from './ProjectList';
import _ from 'underscore';

//maps redux state to component props
const mapStateToProps = (state) => {
  return {
    //convert projects dict to array and map to component's state
  	projects: _.values(state.projects) 
  };
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {};
}

//do the thing
const ProjectContainerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList)

export default ProjectContainerList;
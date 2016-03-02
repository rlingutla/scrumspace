import { connect } from 'react-redux';
import ProjectList from './ProjectList';
import _ from 'underscore';

//maps redux state to component props
const mapStateToProps = (state) => {
  return {
  	projects: _.values(state.projects)
  };
}

//maps any actions this component dispatches to component props
const mapDispatchToProps = (dispatch) => {
  return {
    onProjectClick: (id) => {
      // dispatch(openProject(id))
    }
  }
}

const ProjectContainerList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList)

export default ProjectContainerList;
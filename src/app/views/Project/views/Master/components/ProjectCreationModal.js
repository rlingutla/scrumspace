import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import ProjectItem from './ProjectItem';
import { postAndCreateNewProject } from '../../../../../actions/';
import { ToggleDisplay } from 'react-toggle-display';
import MultiSelect from 'app/shared/components/MultiSelect';
import { sendXHRPromise } from '../../../../../server_calls/index';
import { Async as AsyncSelect } from 'react-select';

import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    createNewProject: (title, description,users) => {
      dispatch(postAndCreateNewProject(title, description,users));
    }

  };
};

class ProjectCreationModal extends React.Component{

  constructor(props){
    super(props);
    // TODO: members can't be mapped like this.
    this.state = {
      title: '',
      description: '',
      users: [],
      userIds: []
    };
  }

  createNewProj() {
    // TODO: VALIDATION CODE THAT DISABLES CREATE BUTTON


    this.emptyList = [];
    // this.userIds = [];
    // usersIds: this.state.users.map((member) => member._id);
    this.props.createNewProject(this.state.title, this.state.description, this.state.userIds);

    // TODO: set this asynchronously, needs work!
    this.props.changeModal();
    this.setState({users: this.emptyList,title:'', description:''});
    // TODO RESET STATE OF MODAL HERE
  }

  handleChange(e){
    e.preventDefault();

    let value = e.target.value;
    let field = e.target.attributes.name.nodeValue;

    let updObj = {};
    updObj[field] = value;

    this.setState(updObj);

  }

  getSelectOptions(input: ''){
    return sendXHRPromise('GET', `/api/user/search?searchStr=${input}&key=display_name`, undefined).then((response) => {
     return {options: response.data};
    });
  }


  setMembers(members) {
    if(members.length >= 1){
      this.setState({
        // users: members.map((member) => member._id) //TODO: need to push only user ID (full object in for now to support mock server)
        users: members,
        userIds: members.map((member) => member._id)
      });
    }
  }

 fieldReset(e){
  this.props.changeModal();
  this.setState({title:'', description:''});
 }

  render () {
    // TODO members.map() has no event handler! shouldn't be saving.
    //const members = this.state.members;
    return (
      <div>
        <Modal show={this.props.show} onHide={(e)=> this.fieldReset(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new project</Modal.Title>
          </Modal.Header>
          <Modal.Body className="select-support">
            <h4><b>Enter Project Details</b></h4>
            <form>
              <Input type="text" name="title" placeholder="Enter project title"  value={this.state.title} onChange={(e) => this.handleChange(e)} />
              <Input type="text" name="description" placeholder="Enter project description" value={this.state.description} onChange={(e) => this.handleChange(e)}/>
            </form>
            <h4><b>Enter Members</b></h4>
            <form>
              {/*<MultiSelect collection="users" labelKey="display_name" valueKey="_id" updateState={(members) => this.setMembers(members)}/>*/}
              <AsyncSelect
                multi
                  name="form-field-name"
                  loadOptions={this.getSelectOptions.bind(this)}
                  labelKey="display_name"
                  valueKey="_id"
                  onChange={this.setMembers.bind(this)}
                  value={this.state.users}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" disabled={(this.state.title.length && this.state.description.length && this.state.users.length) < 1} onClick={(e) => this.createNewProj(e)}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// TODO FIGURE OUT WHAT TO DO HERE.
const mapStateToProps = (state, props) => {
  return state;
};

// pulls out current project from projects object, pushes to props
function mergeProps(stateProps, dispatchProps, ownProps) {
	// todo get rid of this:

	return Object.assign({}, ownProps, { user: stateProps.user });
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreationModal);

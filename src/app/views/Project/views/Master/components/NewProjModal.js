import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import ProjectItem from './ProjectItem';
import { postAndCreateNewProject } from '../../../../../actions/';
import { ToggleDisplay } from 'react-toggle-display';
import MultiSelect from '../../../../../shared/components/MultiSelect';

import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    createNewProject: (title, description,users,status,current_sprint,avatar,sprints,
    stories,commits,timeFrame,membersOnProj,gCommits,color) => {
      dispatch(postAndCreateNewProject(title, description,users,status,current_sprint,avatar,sprints,
      stories,commits,timeFrame,membersOnProj,gCommits,color));
    }

  };
};

class NewProjModal extends React.Component{

  constructor(props){
    super(props);
    // TODO: members can't be mapped like this.
    this.state = {
      title: '',
      description: '',
      users: [-1],
      status: 'planning',
      current_sprint: null,
      avatar: '',
      sprints: [],
      stories: [],
      commits:[],
      timeFrame:[],
      membersOnProj:[],
      gCommits:[],
      color:''
    };
  }

  createNewProj() {
    // TODO: VALIDATION CODE THAT DISABLES CREATE BUTTON


    this.emptyList = [{id:1}];
    this.props.createNewProject(this.state.title, this.state.description, this.state.users,
      this.state.sprints,this.state.status, this.state.current_sprint, this.state.avatar,
      this.state.stories, this.state.commits, this.state.timeFrame,this.state.membersOnProj,this.state.gCommits,this.state.color);

    // TODO: set this asynchronously, needs work!
    this.props.changeModal();
    this.setState({users: this.emptyList});
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

  // handleClick(e) {
  //   e.preventDefault();
  //   this.setState({
  //     users: this.state.users.concat([{
  //       id: this.state.users.length + 1
  //     }])
  //   });
  // }

  setMembers(members) {
    this.setState({
      users: members
    });
  }


  render () {
    // TODO members.map() has no event handler! shouldn't be saving.
    //const members = this.state.members;
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.changeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4><b>Enter Project Details</b></h4>
            <form>
              <Input type="text" name="title" placeholder="Enter project title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
              <Input type="text" name="description" placeholder="Enter project description" value={this.state.description} onChange={(e) => this.handleChange(e)}/>
            </form>
            <h4><b>Enter Members</b></h4>
            <form>
              <MultiSelect collection="users" labelKey="display_name" valueKey="_id" updateState={(members) => this.setMembers(members)}/>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={(e) => this.createNewProj(e)}>Create</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProjModal);

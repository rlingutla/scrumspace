import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import ProjectItem from './ProjectItem';
import { postAndCreateNewProject } from '../../../../../actions/';
import { ToggleDisplay } from 'react-toggle-display';

import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    createNewProject: (title, description,members) => {
      dispatch(postAndCreateNewProject(title, description,members));
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
      members: [
        {
          id: 1
        }
      ]
    };
  }

  createNewProj() {
    // TODO: VALIDATION CODE
    this.mylist = [{id:1}];
    this.props.createNewProject(this.state.title, this.state.description, this.state.members);
    // TODO: set this asynchronously, needs work!
    this.props.changeModal();
    this.setState({members: this.mylist});
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

  handleClick(e) {
    e.preventDefault();
    this.setState({
      members: this.state.members.concat([{
        id: this.state.members.length + 1
      }])
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
              <Input type="text" name="title" label="Enter project title" placeholder="Title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
              <Input type="text" name="description" label="Enter project description" placeholder="Description" value={this.state.description} onChange={(e) => this.handleChange(e)}/>
            </form>
            <h4><b>Enter Members</b></h4>
            <form>
              {this.state.members.map(member =>
                  <Input type="text"  placeholder="Name" key={member.id}></Input>
                )}
            </form>
            <Button bsStyle="primary" onClick={(e) => this.handleClick(e)}>Add members</Button>
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

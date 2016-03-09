import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import ProjectItem from './ProjectItem';
import { postAndCreateNewProject } from '../../../../../actions/';
import {ToggleDisplay} from 'react-toggle-display';

//redux
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  console.log('hi');
  console.log('hi');
  console.log('hi');
  console.log('hi');
  return {
    createNewProject: (title, description) => {
      console.log(dispatch);
      dispatch(postAndCreateNewProject(title,description));
    }
  }
}

class NewProjModal extends React.Component{
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.createNewProj = this.createNewProj.bind(this);
    this.state = {
      title: '',
      description: '',
      members: [{id: '1'}],
      isAuthorized: false
    };
  }

  // addInput(){
  //   var inputs = this.state.Input;
  //   inputs.push();
  //   this.setState({inputs : inputs});
  // }

  createNewProj(){
    this.props.createNewProject(this.state.title, this.state.description);
  }

  handleChange(e){
    e.preventDefault();

    let value = e.target.value;
    let field = e.target.attributes.name.nodeValue;


    let updObj = {};
    updObj[field] = value;

    this.setState(updObj);

  }

  handleClick(e){
    e.preventDefault();
    this.setState({isAuthorized: !this.state.isAuthorized});
  }

  render () {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.changeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4><b>Enter Project Details</b></h4>
            <form>
              <Input type="text" name="title" label="Enter project title" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
              <Input type="text" name="description" label="Enter project description" placeholder="Description" value={this.state.description} onChange={this.handleChange}/>
            </form>
            <h4><b>Enter Members</b></h4>
            <form>
              <Input type="text"  placeholder="Name" ></Input>
            </form>
            <Button bsStyle="primary" onClick={this.handleClick.bind(this)}>Add members</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" onClick={this.createNewProj}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(mapDispatchToProps)(NewProjModal);

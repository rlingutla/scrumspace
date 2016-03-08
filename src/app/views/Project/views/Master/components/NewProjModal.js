import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';
import ProjectItem from './components/ProjectItem';

export default class NewProjModal extends React.Component{
  constructor(props){
    super(props);
  }

  // addInput(){
  //   var inputs = this.state.Input;
  //   inputs.push();
  //   this.setState({inputs : inputs});
  // }

  createNewProj(){

    <ProjectItem />;
  }

  handleChange(e){
    e.preventDefault();
  // e.target is the React Virtual DOM target of the input event -- the
  // <textarea> element. The textarea's `value` is the entire contents of
  // what the user has typed in so far.
  this.setState({value: e.target.value});

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
          <Input type="text" label="Enter project name" placeholder="Name" valueName={this.state.value} onChange={(e) => this.handleChange(e)}/>
          <Input type="text" label="Enter project description" placeholder="Description" valueDesc={this.state.value} onChange={(e) => this.handleChange(e)}/>
          </form>

          <h4><b>Enter Members</b></h4>

          <form>
          <Input type="text"  placeholder="Name" valueMember={this.state.value} onChange={(e) => this.handleChange(e)}/>
          <Input type="text"  placeholder="Name" valueMember={this.state.value} onChange={(e) => this.handleChange(e)}/>
          </form>
          <Button bsStyle="primary" >Add members</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={this.createNewProj()}>Create</Button>
        </Modal.Footer>


          </Modal>
      </div>
    );
  }
}

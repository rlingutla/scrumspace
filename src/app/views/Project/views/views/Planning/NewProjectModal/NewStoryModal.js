import React from 'react';
import Task from './Task';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';

export default class NewStoryModal extends React.Component {
  constructor(props){
		super(props);
		//data represents a story

	}


	render() {
		return (
        <div className="story-modal">
					<Modal show={this.props.isOpen} onHide={this.props.changeModal}>
		        <Modal.Header closeButton>
							<Modal.Title>
								<span className="task_id">Sprint</span>
							</Modal.Title>
						</Modal.Header>
		        <Modal.Body>
							<div className="row story-panel">
								<div className="col-md-6">
									<div className="story-input sat-pad">
										<label>Enter a Story</label>
										<input type="text" className="form-control strech-input" placeholder="Something you want to get done!"
										value={this.props.data.title} onChange={(e) =>this.props.updateState('storyModal', 'title', e)}
										/>
									</div>
								</div>
							</div>
							<div className="row story-panel">
								<div className="col-md-6">
									<div className="task-detail-input sat-pad">
										<label>Enter Story Details</label>
										<textarea className="form-control strech-input" rows="6" placeholder="Enter Story Details"
										value={this.props.data.description} onChange={(e) =>this.props.updateState('storyModal', 'description', e)}
										/>
									</div>
								</div>
								{
									this.props.data.tasks.map((e,i,array) => {
										if(e.description !== '' || i === array.length -1){
											return (
												<Task key={i} index={i} isOnly={array.length === 1} handleTask={this.props.handleTask} data={e}/>
											);
										}
									})
								}
							</div>
		        </Modal.Body>
		        <Modal.Footer>
							<button type="button" className="btn btn-default pull-left no-side-margin" onClick={(e) => this.props.handleTask('add')}>
								<span className="glyphicon glyphicon-list"></span> Add New Task
							</button>
		          <button type="button" className="btn btn-default" data-dismiss="modal" onClick={(e) => this.props.save('story', this.props.data)}>Done</button>
		        </Modal.Footer>
					</Modal>
	      </div>
    );
  }
}

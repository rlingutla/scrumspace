import React from 'react';
import Task from './Task';
import { Modal, OverlayTrigger, Tooltip, Popover, Button, Input, ButtonInput } from 'react-bootstrap';

export default class NewStoryModal extends React.Component {
  constructor(props){
		super(props);
		//data represents a story
		this.state={
			data: this.props.data
		};
	}

	removeTask(index){
		this.state.data.tasks.splice(index, 1);
		this.setState(this.state);
	}

	addTask(){
		let x = this.state;
		x.data.tasks = x.data.tasks.concat([{description: ''}]);
		this.setState(x);
	}

	changeDescription(e, i){
		this.state.data.tasks[i].description = e.target.value;
		this.setState(this.state);
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
									this.state.data.tasks.map((e,i,array) => {
											return (
												<Task key={i} index={i} isOnly={array.length === 1} changeDescription={this.changeDescription.bind(this)} removeTask={this.removeTask.bind(this)} data={e}/>
											);
										})
								}
							</div>
		        </Modal.Body>
		        <Modal.Footer>
							<button type="button" className="btn btn-default pull-left no-side-margin" onClick={(e) => this.addTask()}>
								<span className="glyphicon glyphicon-list"></span> Add New Task
							</button>
		          <button type="button" className="btn btn-default" data-dismiss="modal" onClick={(e) => this.props.save(this.state.data)}>Done</button>
		        </Modal.Footer>
					</Modal>
	      </div>
    );
  }
}

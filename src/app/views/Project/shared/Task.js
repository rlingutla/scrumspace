import React from 'react';
import { Modal, OverlayTrigger, Tooltip, Popover, Button } from 'react-bootstrap';

export default class Task extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false
		};

		this.openDetail = this.openDetail.bind(this);
		this.closeDetail = this.closeDetail.bind(this);
	}

	openDetail(){
		this.setState({ modal: true });
	}
	closeDetail(){
		this.setState({ modal: false });
	}

	render() {

		let popover = <Popover id={'popover_'+this.props._id} title="popover">very popover. such engagement</Popover>;
		let tooltip = <Tooltip id={'popover_'+this.props._id} >wow.</Tooltip>;

		return (
			<div>
				<div className="task" onClick={this.openDetail}>
				    <div className="heading">
				        <div className="row left-right-align">
				            <div className="col-md-6"><a>{this.props._id}</a></div>
				            <div className="col-md-6"></div>
				        </div>
				    </div>
				    <div className="body">{this.props.description}</div>
				</div>
				<Modal show={this.state.modal} onHide={this.closeDetail}>
		          <Modal.Header closeButton>
		            <Modal.Title>{this.props._id}: {this.props.description}</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            <h4>Text in a modal</h4>
		            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

		            <h4>Popover in a modal</h4>
		            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

		            <h4>Tooltips in a modal</h4>
		            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>
		          </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={this.close}>Close</Button>
		          </Modal.Footer>
		        </Modal>
			</div>
		);
	}
}
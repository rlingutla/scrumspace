import React from 'react';

export default class NewSprintModal extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
      <div className="modal fade" id="myModal2" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">New Sprint</h4> </div>
            <div className="modal-body">
              <form role="form">
                <div className="form-group">
                  <label>Title</label>
                  <input type="" className="form-control" id="title" placeholder="Enter title"/> </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

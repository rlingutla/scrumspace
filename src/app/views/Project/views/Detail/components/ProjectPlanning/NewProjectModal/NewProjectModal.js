import React from 'react';

export default class NewProjectModal extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
      <div className="modal fade" id="myModal1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">New Story</h4> </div>
            <div className="modal-body">
              <form role="form">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" id="title" placeholder="Enter title"/> <br></br>
                  <label>Description</label>
                  <input type="text" className="form-control" id="title" placeholder="Enter Description"/> </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

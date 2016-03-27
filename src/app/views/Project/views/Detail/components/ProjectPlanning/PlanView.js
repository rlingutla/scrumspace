import React from 'react';

export default class PlanView extends React.Component {
  constructor(props){
		super(props);
	}

	render() {
		return (
      <div className="container">
        <div className="panel-group">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h4>Backlog </h4> </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3">
                  <div className="panel panel-default" data-toggle="modal" data-target="#myModal">
                    <div className="panel-heading">story 1</div>
                    <div className="panel-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscingoldent, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-default" data-toggle="modal" data-target="#myModal">
                    <div className="panel-heading">story 2</div>
                    <div className="panel-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscingoldent, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-default" data-toggle="modal" data-target="#myModal">
                    <div className="panel-heading">story 3</div>
                    <div className="panel-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscingoldent, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer settings-foot">
              <button type="save" className="btn btn-success pull-right save" data-toggle="modal" data-target="#myModal1"> New Story</button>
            </div>
          </div>
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
                      <input type="email" className="form-control" id="title" placeholder="Enter Description"/> </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Save</button>
                </div>
              </div>
            </div>
          </div>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h4>Sprint 1 </h4> </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3">
                  <div className="panel panel-default" data-toggle="modal" data-target="#myModal">
                    <div className="panel-heading">story 1</div>
                    <div className="panel-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscingoldent, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-default" data-toggle="modal" data-target="#myModal">
                    <div className="panel-heading">story 2</div>
                    <div className="panel-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscingoldent, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-default" data-toggle="modal" data-target="#myModal">
                    <div className="panel-heading">story 3</div>
                    <div className="panel-body">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscingoldent, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer settings-foot">
              <button type="save" data-toggle="modal" data-target="#myModal2" className="btn btn-success pull-right save">New Sprint</button>
            </div>
          </div>
        </div>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Name of Story</h4> </div>
              <div className="modal-body">
                <p>data about the story</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    );
  }
}

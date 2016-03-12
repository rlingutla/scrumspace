import React from 'react';

export default (props) => {
	return (
  <div className="panel-body">
    <div className="row project-search">
      <div className="col-md-9"></div>
      <div className="col-md-3">
        <div className="form-group" style={{display: 'inline'}}>
          <div className="input-group">
            <input className="form-control" placeholder="Search Projects" type="search projects" />
            <span className="input-group-addon">
              <span className="glyphicon glyphicon-search" >
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
      <div className="row myproj">
        <div className="col-md-9">
          <div className="col-md-9">
            <p className="project-name">Project 1</p>
          </div>
        </div>
        <div className="col-md-3">
          <span className="pull-right"><button className="btn btn-default b-options" type="submit">
          <span className="pull-right">view</span>
          <button className="btn btn-default b-options" type="submit">edit</button>
          <button className="btn btn-default b-options" type="submit">delete</button></button></span>
        </div>
      </div>
      <div className="row myproj">
        <div className="col-md-9">
          <div className="col-md-9">
            <p className="project-name">Project 2</p>
          </div>
        </div>
        <div className="col-md-3">
          <span className="pull-right">
            <button className="btn btn-default b-options" type="submit">
            <span className="pull-right">view</span>
            <button className="btn btn-default b-options" type="submit">edit</button>
            <button className="btn btn-default b-options" type="submit">delete</button></button>
          </span>
        </div>
      </div>
      <div className="row myproj">
        <div className="col-md-9">
          <div className="col-md-9">
            <p className="project-name">Project 3</p>
          </div>
        </div>
        <div className="col-md-3">
          <span className="pull-right">
          <button className="btn btn-default b-options" type="submit">
          <span className="pull-right">view</span>
          <button className="btn btn-default b-options" type="submit">edit</button>
          <button className="btn btn-default b-options" type="submit">delete</button></button></span>
        </div>
      </div>
    </div>
	);
};
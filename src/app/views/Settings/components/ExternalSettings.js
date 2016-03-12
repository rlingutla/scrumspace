import React from 'react';

export default (props) =>{
  return(
    <div className="panel-body">
      <div className="row external-b">
        <div className="col-md-3">
          <p className="external-p">Enable/Disable Google Hangouts</p>
        </div>
        <div className="col-md-9">
          <span className="pull-right"><button className="btn btn-default b-options" type="submit">
          <span className="pull-right">Enable</span>
          <button className="btn btn-default b-options" type="submit">Disable</button></button></span>
        </div>
      </div>
      <div className="row external-b">
        <div className="col-md-3">
          <p className="external-p">Enable/Disable Github Notifications</p>
        </div>
        <div className="col-md-9">
            <span className="pull-right"><button className=
            "btn btn-default b-options" type=
            "submit"><span className=
            "pull-right">Enable</span>
            <button className=
            "btn btn-default b-options" type=
            "submit">Disable</button></button></span>
        </div>
      </div>
      <div className="row external-b">
        <div className="col-md-3">
          <p className="external-p">Enable/Disable
          Email Notifications</p>
        </div>
        <div className="col-md-9">
          <span className="pull-right"><button className="btn btn-default b-options" type="submit"><span className="pull-right">Enable</span>
          <button className="btn btn-default b-options" type="submit">Disable</button></button></span>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import TopNav from '../../shared/components/TopNav';

class Statistics extends React.Component {
  render() {
    return (
		<div id="content">
			<TopNav view="Git Statistics" />
			<div className="content container-fluid bodySize">
				<div className="personalStats"><br/>
				<h1><strong>My Stats</strong></h1>
				<h4>Webpage 1</h4><img src="img/Graph1.png" width="100%" />
				<h4>Webpage 2</h4><img src="img/Graph2.png" width="100%" /></div>
				<div className="projectStats">
					<br/>
					<h1><strong>Project Stats</strong></h1>
					<h4>Webpage 1</h4>
					<ul className="list-inline">
						<li >
							<div>
								<u></u>
								<p className="gTitles"><u>Current Sprint Progress</u></p><u></u>
								<p className="gTitles2"><u>Current Project Progress</u></p>
							</div>
						</li>
						<li><img className="imgWH" src="img/Sprint1Graph.png" /> <img className="imgWH" src="img/TotalData1.png" /></li>
					</ul>
					<h4>Webpage 2</h4>
					<ul className="list-inline">
						<li >
							<div>
								<u></u>
								<p className="gTitles"><u>Current Sprint Progress</u></p><u></u>
								<p className="gTitles2"><u>Current Project Progress</u></p>
							</div>
						</li>
						<li><img className="imgWH" src="img/Sprint2Graph.png" /> <img className="imgWH" src="img/TotalData2.png" /></li>
					</ul>
				</div>
				<div className="modal fade" id="myModal" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header header-styling">
								<button className="close" data-dismiss="modal" type="button">&times;</button>
								<h4 className="modal-title borderHead"><strong>Create a new project</strong></h4>
							</div>
							<div className="modal-body" >
								<div className="form-group">
									<label>Project Name</label> <input className="form-control form-field-width" placeholder="Insert name" type="text" />
								</div>
								<div className="form-group createPad">
									<label>Add members</label>
									<input className="form-control fillBorder form-field-width" placeholder="Name" type="text" />
									<input className="form-control fillBorder form-field-width" placeholder="Name" type="text" />
									<input className="form-control fillBorder form-field-width" placeholder="Name" type="text" />
									<input className="form-control fillBorder form-field-width" placeholder="Name" type="text" />
									<input className="form-control fillBorder form-field-width" placeholder="Name" type="text" />
									<input className="form-control fillBorder form-field-width" placeholder="Name" type="text" />
									<br/>
									<button className="btn btn-default">
										<span className="glyphicon glyphicon-plus">
										</span>
										Add Members
									</button>
								</div>
							</div>
							<div className="modal-footer header-styling">
								<button className="btn btn-default pull-right" type="submit"><strong>Create</strong></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
  }
}

export default Statistics;
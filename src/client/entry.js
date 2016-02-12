/* Entry point of client-side application */
import React from 'react';
import ReactDOM from 'react-dom';
// modal body style="background-color:white !important;"
class App extends React.Component {
  render() {
    return (
		<div>
			<div id="sidebar">
				<div id="project-selector">
					<ul>
						<li><a href="project.html"><span className="glyphicon glyphicon-blackboard"></span></a></li>
						<li><a href="project.html"><span className="glyphicon glyphicon-blackboard"></span></a></li>
						<li><a href="project.html"><span className="glyphicon glyphicon-blackboard"></span></a></li>
						<li><a className="#" data-toggle="modal" data-target="#myModal"><span className="glyphicon glyphicon-plus"></span></a></li>
						<li><a href="gitStats.html"><span className="glyphicon glyphicon-stats"></span></a></li>
					</ul>
				</div>
				<ul></ul>
			</div>
			<div id="content">
				<nav className="navbar navbar-fixed-top navbar-default">
					<div className="container-fluid">
						<div className="nav-left">
							<a className="navbar-brand" href="/">Dashboard</a>
						</div>
						<div className="nav-right">
							<div className="dropdown">
								<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								<span className="glyphicon glyphicon-option-vertical"></span>
								</button>
								<ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
									<li><a href="settings.html">Settings</a></li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
				<div className="content">
					<div className="project-info container-fluid">
						<div className="state-details">
							<div className="row">
								<div className="col-md-6">
									<h4>2 Projects in Sprint</h4>
								</div>
							</div>
						</div>
						<div className="row left-right-align progress-bar-details">
							<div className="col-md-4 dashboard-summary">
								<h4>Tasks Completed over Time</h4>
								<canvas id="myChart0"></canvas>
							</div>
							<div className="col-md-4 dashboard-summary">
								<h4>Actionable Task Totals</h4>
								<canvas id="myChart"></canvas>
							</div>
							<div className="col-md-4 dashboard-summary">
								<h4>All Tasks for Sprints</h4>
								<canvas id="myChart2"></canvas>
							</div>
						</div>
					</div>
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-10 col-md-offset-1">
								<div className="panel panel-default scrum-board">
									<div className="panel-body">
										<div className="row vertical-align">
											<div className="col-md-3 dashboard-header">
												<span>
													Actionable Items <span className="badge">3</span>
												</span>
											</div>
											<div className="col-md-2 col-md-offset-2">
												<h4 className="text-center">Project 1</h4>
											</div>
										</div>
										<div className="row">
											<div className="container-fluid">
												<div className="state-blocked">
													<div className="task state-doing">
														<div className="heading">SS-S1-T4</div>
														<div className="body">Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="container-fluid">
												<div className="state-doing">
													<div className="task">
														<div className="heading">SS-S1-T5</div>
														<div className="body">Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="container-fluid">
												<div className="state-doing">
													<div className="task">
														<div className="heading">SS-S1-T2</div>
														<div className="body">Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-10 col-md-offset-1">
								<div className="panel panel-default scrum-board">
									<div className="panel-body">
										<div className="row vertical-align">
											<div className="col-md-3 dashboard-header">
												<span>
													Actionable Items <span className="badge">3</span>
												</span>
											</div>
											<div className="col-md-2 col-md-offset-2">
												<h4 className="text-center">Project 2</h4>
											</div>
										</div>
										<div className="row">
											<div className="container-fluid">
												<div className="state-blocked">
													<div className="task state-doing">
														<div className="heading">SS-S1-T1</div>
														<div className="body">Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="container-fluid">
												<div className="state-doing">
													<div className="task">
														<div className="heading">SS-S1-T10</div>
														<div className="body">Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="container-fluid">
												<div className="state-doing">
													<div className="task">
														<div className="heading">SS-S1-T1</div>
														<div className="body">Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="myModal" className="modal fade" role="dialog">
						<div className="modal-dialog">
							<div className="modal-content ">
								<div className="modal-header header-styling">
									<button type="button" className="close" data-dismiss="modal">&times;</button>
									<h4 className="modal-title"><strong>Create a new project</strong></h4>
								</div>
								<div className="modal-body">
									<div className="form-group">
										<label>Project Name</label>
										<input type="text" className="form-control form-field-width" placeholder="Insert name" />
									</div>
									<div className="form-group createPad">
										<label>Add members</label>
										<input type="text" className="form-control fillBorder form-field-width" placeholder="Name" />
										<input type="text" className="form-control fillBorder form-field-width" placeholder="Name" />
										<input type="text" className="form-control fillBorder form-field-width" placeholder="Name" />
										<input type="text" className="form-control fillBorder form-field-width" placeholder="Name" />
										<input type="text" className="form-control fillBorder form-field-width" placeholder="Name" />
										<input type="text" className="form-control fillBorder form-field-width" placeholder="Name" />
										<br />
										<button className="btn btn-default">
									<span className="glyphicon glyphicon-plus"></span>Add Members
									</button>
									</div>
								</div>
								<div className="modal-footer header-styling">
									<button type="submit" className="btn btn-default pull-right">
										<strong> Create </strong>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
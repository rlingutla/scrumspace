import React from 'react';
import TopNav from '../../shared/components/TopNav';

class Dashboard extends React.Component {
  render() {
	return (
		<div id="content">
			<TopNav view="Dashboard"/>
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
			</div>
			<div >
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
						<div className="panel panel-default scrum-board">
							<div className="panel-body">
								<div className="row vertical-align">
									<div className="col-md-3 dashboard-header">
										<span>Actionable Items <span className="badge">3</span></span>
									</div>
									<div className="col-md-2 col-md-offset-2">
										<h4 className="text-center">Project 1</h4>
									</div>
								</div>
								<div className="row">
									<div className="container-fluid">
										<div className="state-blocked">
											<div className="task state-doing">
												<div className="heading">
													SS-S1-T4
												</div>
												<div className="body">
													Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="container-fluid">
										<div className="state-doing">
											<div className="task">
												<div className="heading">
													SS-S1-T5
												</div>
												<div className="body">
													Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="container-fluid">
										<div className="state-doing">
											<div className="task">
												<div className="heading">
													SS-S1-T2
												</div>
												<div className="body">
													Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.
												</div>
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
										<span>Actionable Items <span className="badge">3</span></span>
									</div>
									<div className="col-md-2 col-md-offset-2">
										<h4 className="text-center">Project 2</h4>
									</div>
								</div>
								<div className="row">
									<div className="container-fluid">
										<div className="state-blocked">
											<div className="task state-doing">
												<div className="heading">
													SS-S1-T1
												</div>
												<div className="body">
													Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="container-fluid">
										<div className="state-doing">
											<div className="task">
												<div className="heading">
													SS-S1-T10
												</div>
												<div className="body">
													Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="container-fluid">
										<div className="state-doing">
											<div className="task">
												<div className="heading">
													SS-S1-T1
												</div>
												<div className="body">
													Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.
												</div>
											</div>
										</div>
									</div>
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

export default Dashboard;
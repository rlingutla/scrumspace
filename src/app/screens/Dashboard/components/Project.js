import React from 'react';

export default (props) => {
	return (
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
	);
};
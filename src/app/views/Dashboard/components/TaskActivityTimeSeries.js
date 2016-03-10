import React from 'react';
import { Line } from 'react-chartjs';
import { lineOptions } from '../constants/chartOptions';

// TODO: make this production ready
const lineData = {
	labels: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'T'],
	datasets: [
		{
			label: 'Done',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: 'rgba(220,220,220,1)',
			pointColor: 'rgba(220,220,220,1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

export default (props) => {
	return (
		<div className="panel-wrapper">
			<div className="row">
				<div className="panel panel-default">
					<div className="panel-container">
						<div className="panel-body">
							<div className="dashboard-summary">
								<h4>Project Activity</h4>
								<Line data={lineData} options={lineOptions} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
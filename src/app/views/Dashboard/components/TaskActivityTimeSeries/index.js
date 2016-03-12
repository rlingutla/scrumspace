import React from 'react';
import { Line } from 'react-chartjs';
import { lineOptions } from '../../constants/chartOptions';

// TODO: make this production ready
var lineData = {
	labels: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'T'],
	datasets: [
		{
			label: 'DOING',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: 'rgba(255, 236, 159, 1)',
			pointColor: 'rgba(255, 236, 159, 1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: null
		},{
			label: 'BLOCKED',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: 'rgba(255, 159, 159, 1)',
			pointColor: 'rgba(255, 159, 159, 1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: null
		}, {
			label: 'UNASSIGNED',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: 'rgba(128,128,128,.5)',
			pointColor: 'rgba(128,128,128,.5)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: null
		},{
			label: 'DONE',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: 'rgba(120, 224, 146, 1)',
			pointColor: 'rgba(120, 224, 146, 1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: null
		}	


	]
};

// Create an array for each data set at the end of each day

// TODO AND RETHINK THIS BETTER

export default (props) => {
	for (let i = 0; i < 4; i++) {
		lineData.datasets[i].data = new Array (0, 0, 0, 0, 0, 0);
	}

	var d = new Date();
	d.setDate(d.getDate() - 6);

	var types = ['DOING', 'BLOCKED', 'UNASSIGNED', 'DONE'];
	
	const histories = props.data
	.map((task) => task.history)
	.reduce((a, b) => a.concat(b))
	.sort((a, b) => a.modifiedTime > b.modifiedTime);

	const oneDay = 1000 * 60 * 60 * 24;
	var timeMax = d.getTime();
	var timeMin = d.getTime() - oneDay;

	for (var i = 0; i < 7; i++) {
		types.forEach((type) => {
			var index = parseInt(types.indexOf(type), 10);
			if (i > 0) {
				// Make it a running count
				lineData.datasets[index].data[i] = lineData.datasets[index].data[i-1];
			}

			histories.filter((history) => {
				var hasMovedFromStatus = (history.fromStatus === type);
				var hasMovedToStatus = (history.toStatus === type);
				var isInTimeInterval = (history.modifiedTime > timeMin && history.modifiedTime < timeMax);
				if (isInTimeInterval && hasMovedToStatus) {
					lineData.datasets[index].data[i] += 1;
				} else if (isInTimeInterval && hasMovedFromStatus) {
					lineData.datasets[index].data[i] -= 1;
				}
			});
		});
		timeMax += oneDay;
		timeMin += oneDay;
	}

	return (
		<div className="panel-wrapper">
			<div className="row">
				<div className="panel panel-default">
					<div style={{minHeight: '380px'}}>
						<div className="panel-body">
							<div className="dashboard-summary">
								<h4>Activity Time Series</h4>
								<Line data={lineData} options={lineOptions} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
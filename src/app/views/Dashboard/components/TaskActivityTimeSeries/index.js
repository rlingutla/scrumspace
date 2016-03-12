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
			strokeColor: 'rgba(120, 224, 146, 1)',
			pointColor: 'rgba(120, 224, 146, 1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: [0, 0, 0, 0, 0, 0, 0]
		},{
			label: 'BLOCKED',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: 'rgba(255, 159, 159, 1)',
			pointColor: 'rgba(255, 159, 159, 1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: [0, 0, 0, 0, 0, 0, 0]
		}, {
			label: 'UNASSIGNED',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: 'rgba(128,128,128,.5)',
			pointColor: 'rgba(128,128,128,.5)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: [0, 0, 0, 0, 0, 0, 0]
		},{
			label: 'DONE',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: 'rgba(120, 224, 146, 1)',
			pointColor: 'rgba(120, 224, 146, 1)',
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: [0, 0, 0, 0, 0, 0, 0]
		}	


	]
};

// Create an array for each data set at the end of each day

// TODO AND RETHINK THIS BETTER

export default (props) => {
	var d = new Date();
	d.setDate(d.getDate() - 5);

	var types = ['DOING', 'BLOCKED', 'UNASSIGNED', 'DONE'];
	
	const histories = props.data
	.map((task) => task.history)
	.reduce((a, b) => a.concat(b))
	.sort((a, b) => a.modifiedTime > b.modifiedTime);

	var timeMax = d.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	var timeMin = timeMax - oneDay;

	for (var i = 0; i < 7; i++) {
		types.forEach((type) => histories.filter((history) => {
			var index = parseInt(types.indexOf(type),10);
			var isOfType = (history.toStatus === type);
			var isInTimeInterval = (history.modifiedTime > timeMin && history.modifiedTime < timeMax);
			if (isInTimeInterval && isOfType) {
				lineData.datasets[index].data[i] += 1;
			}
		}));
		timeMax += oneDay;
		timeMin += oneDay;
	}

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
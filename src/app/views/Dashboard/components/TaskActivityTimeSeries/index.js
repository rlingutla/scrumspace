import React from 'react';
import { Line } from 'react-chartjs';
import { lineOptions } from '../../constants/chartOptions';
import Panel from '../shared/Panel';
import taskTypes from 'app/shared/constants/taskTypes';


const getLineDataObj = () => {
	let lineData = {
		labels: ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'T'],
		datasets: []
	};

	for (let status in taskTypes) {
		lineData.datasets.push({
			label: 'DOING',
			fillColor: 'rgba(0,0,0,0)',
			strokeColor: taskTypes[status].color,
			pointColor: taskTypes[status].color,
			pointStrokeColor: '#fff',
			pointHighlightFill: '#fff',
			pointHighlightStroke: 'rgba(220,220,220,1)',
			data: [0, 0, 0, 0, 0, 0]
		});
	}
	return lineData;
};

// Create an array for each data set at the end of each day

// TODO: refactor this...

export default (props) => {
	let lineData = getLineDataObj();
	var d = new Date();
	d.setDate(d.getDate() - 6);

	var types = ['UNASSIGNED', 'DOING', 'BLOCKED', 'DONE'];
	
	const histories = props.tasks
	.map((task) => task.history)
	.reduce((a, b) => a.concat(b))
	.sort((a, b) => a.modified_time > b.modified_time);

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
			// TODO: maybe use underscore?
			histories.filter((history) => {
				if(history.type === 'MOVED'){
					var hasMovedFromStatus = (history.payload.from_status === type);
					var hasMovedToStatus = (history.payload.to_status === type);
					var isInTimeInterval = (history.modified_time > timeMin && history.modified_time < timeMax);
					if (isInTimeInterval && hasMovedToStatus) {
						lineData.datasets[index].data[i] += 1;
					} else if (isInTimeInterval && hasMovedFromStatus) {
						lineData.datasets[index].data[i] -= 1;
					}
				}
			});
		});
		timeMax += oneDay;
		timeMin += oneDay;
	}

	return (
		<div className="col-md-6 col-lg-6">
			<Panel title="Activity Time Series">
				<Line data={lineData} options={lineOptions} />
			</Panel>
		</div>
	);
};
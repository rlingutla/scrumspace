import React from 'react';
import { verboseServerTime } from 'app/shared/utils/utils';
import { Grid, Row, Col } from 'react-bootstrap';
import { Line,Bar } from 'react-chartjs';

const lineOptions = {
	scaleShowGridLines : false,
	scaleShowLabels: true,
	scaleShowHorizontalLines: false,
	scaleShowVerticalLines: false,
	responsive: true
};

const GitGraphs2 = (props) => {


	const barData = {
		labels: props.stats.timeFrame,
		datasets: [
			{
				fillColor: props.stats.color,
				strokeColor: props.stats.color,
				data: props.stats.allStats
			}
		]
	};

	return (
		<div>
			<b><h4 className="project-title">{props.title}</h4></b>
			<div className="project-item">
				<div className="chart-container">
					<Bar data={barData} options={lineOptions} />
				</div>
			</div>
		</div>
	);
};

export default GitGraphs2;

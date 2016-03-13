import React from 'react';
import { verboseServerTime } from '../../../shared/utils/utils';
import { Grid, Row, Col } from 'react-bootstrap';
import { Line,Bar } from 'react-chartjs';

const lineOptions = {
    scaleShowGridLines : false,
		scaleShowLabels: true,
    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false,
    responsive: true
};


const GitGraphs = (props) => {

	const barData = {

	    labels: props.timeFrame,
	    datasets: [
	        {
	          fillColor: props.color,
            data: props.commits
	        }
	    ]
	};

	return (
    <div>

    <h4  className="project-title">{props.title}</h4>
			<div className="project-item">
				<div className="chart-container">
					<Bar data={barData} options={lineOptions} />
				</div>
			</div>
    </div>
	);
};

export default GitGraphs;

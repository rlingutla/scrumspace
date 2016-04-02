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
<<<<<<< HEAD
if (props.membersOnProj.length !== props.gCommits.length){
     props.gCommits.splice(props.membersOnProj.length);
}
=======
>>>>>>> 5cfb13578784fc629499ae0be9193a74c241f67f
	const barData = {
		labels: props.membersOnProj,
		datasets: [
			{
				fillColor: props.color,
				data: props.gCommits
			}
		]
	};

	return (
		<div>
			<h4 className="project-title">{props.title}</h4>
			<div className="project-item">
				<div className="chart-container">
					<Bar data={barData} options={lineOptions} />
				</div>
			</div>
		</div>
	);
};

export default GitGraphs2;

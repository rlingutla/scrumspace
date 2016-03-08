import React from 'react';
import Task from './Task';
import { Doughnut, Line } from 'react-chartjs';

const tileStyle = (color) =>  {
	return {
		backgroundColor: color, 
		width: '33%',
		display: 'inline-block',
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: '15px'
	};
};

const red = '#FF9F9F';
const green = '#78E092';
const gray = '#656565';

const lineData = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55, 40]
		},
		{
			label: "My Second dataset",
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: [28, 48, 40, 19, 86, 27, 90]
		}
	]
};

const lineOptions = {

	///Boolean - Whether grid lines are shown across the chart
	scaleShowGridLines : true,

	//String - Colour of the grid lines
	scaleGridLineColor : "rgba(0,0,0,.05)",

	//Number - Width of the grid lines
	scaleGridLineWidth : 1,

	//Boolean - Whether to show horizontal lines (except X axis)
	scaleShowHorizontalLines: true,

	//Boolean - Whether to show vertical lines (except Y axis)
	scaleShowVerticalLines: true,

	//Boolean - Whether the line is curved between points
	bezierCurve : true,

	//Number - Tension of the bezier curve between points
	bezierCurveTension : 0.4,

	//Boolean - Whether to show a dot for each point
	pointDot : true,
	
	// Boolean - whether or not the chart should be responsive and resize when the browser does.
	responsive: true,

	//Number - Radius of each point dot in pixels
	pointDotRadius : 4,

	//Number - Pixel width of point dot stroke
	pointDotStrokeWidth : 1,

	//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	pointHitDetectionRadius : 20,

	//Boolean - Whether to show a stroke for datasets
	datasetStroke : true,

	//Number - Pixel width of dataset stroke
	datasetStrokeWidth : 2,

	//Boolean - Whether to fill the dataset with a colour
	datasetFill : true,

	//String - A legend template
	legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

const chartData = [
	{
		value: 300,
		color:"#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	},
	{
		value: 50,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	},
	{
		value: 100,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "Yellow"
	}
];


const chartOptions = {
	//Boolean - Whether we should show a stroke on each segment
	segmentShowStroke : true,

	//String - The colour of each segment stroke
	segmentStrokeColor : "#fff",

	//Number - The width of each segment stroke
	segmentStrokeWidth : 2,

	//Number - The percentage of the chart that we cut out of the middle
	percentageInnerCutout : 50, // This is 0 for Pie charts

	//Number - Amount of animation steps
	animationSteps : 100,
	
	// Boolean - whether or not the chart should be responsive and resize when the browser does.
	responsive: true,

	//String - Animation easing effect
	animationEasing : "easeOutBounce",

	//Boolean - Whether we animate the rotation of the Doughnut
	animateRotate : true,

	//Boolean - Whether we animate scaling the Doughnut from the centre
	animateScale : false,

	//String - A legend template
	legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

};

const Chart = (props) => {
	return (
		<div className="dashboard-summary">
			<h4>{props.title}</h4>
			{props.children}
		</div>
	);
};

export default (props) => {
	let tasks = props.project.actionableTasks;
	return (
		<div>
			<div className="project-info container-fluid">
				<div className="state-details">
					<div className="row">
						<div className="col-md-6">
							<h4>{props.project.title}</h4>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="panel-wrapper">
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-container">
										<div className="panel-body">
											<div className="dashboard-summary">
												<h4>Your Tasks</h4>
												<div className="row">
													<div className="col-md-12">
														<div style={tileStyle(green)}>
															<div style={{paddingTop: "15px", paddingBottom: '15px'}}>
																<div>5</div>
																<div>Doing</div>
															</div>
														</div>  
														<div style={tileStyle(red)}>
															<div style={{paddingTop: "15px", paddingBottom: '15px'}}>
																<div>1</div>
																<div>Blocking</div>
														   </div>                                                    
														</div>   
														<div style={tileStyle(gray)}>
															<div style={{paddingTop: "15px", paddingBottom: '15px'}}>
																<div>2</div>
																<div>Blocked</div>                                                            
															</div>                                                    
														</div>
													</div>
												</div>
												{ tasks.map((e, i) => {
													return <Task key={i} id={e._id} description={e.description} />;
												}) }
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-container">
										<div className="panel-body">
											<div className="dashboard-summary">
												<h4>News Feed</h4>
												<div className="row">
													<div className="col-md-12">
														News Feed Component... Different task statuses and when they moved into different statuses.
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="panel-wrapper">
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-container">
										<div className="panel-body">
											<Chart title='Project Task Distribution'>
												<Doughnut data={chartData} options={chartOptions}/>
											</Chart>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="panel-wrapper">
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-container">
										<div className="panel-body">
											<Chart title='Project Tasks Completed over Time'>
												<Line data={lineData} options={lineOptions} />
											</Chart>
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
import React from 'react';
import { Doughnut } from 'react-chartjs';
import { doughnutOptions } from '../../constants/chartOptions';
import taskTypes from 'app/shared/constants/taskTypes';
import Panel from '../shared/Panel';

const capitalize = (s) => {
	return s[0] + s.slice(1).toLowerCase();
};

const getChartObject = (label, number, color, highlight) => {
	return {
		label: label,
		value: number,
		color: color,
		highlight: color
	};
};

const isUnique = (e, i, arr) => {
	return arr.indexOf(e) === i;
};

const getTaskDistribution = (tasks) => {
	let statuses = tasks.map((task) => task.status).filter(isUnique);
	
	let countObj = {};

	tasks.forEach((task) => {
		countObj[task.status] = (countObj[task.status]) ? countObj[task.status] + 1 : 1;
	});

	// make my object into an array // TODO, is this necessary?
	let statusArr = [];
	for (var prop in countObj) {
		statusArr.push({
			value: countObj[prop],
			type : prop
		});
	}
	return statusArr.map((status) => {
		return getChartObject(capitalize(status.type), 
			status.value, 
			taskTypes[status.type].color, 
			taskTypes[status.type].color
		);
	});
};


export default (props) => {
	return (
		<div className="col-md-6 col-lg-6">
			<Panel title="Project Status">
				<p> something cool goes here</p>
			</Panel>
		</div>
	);
};
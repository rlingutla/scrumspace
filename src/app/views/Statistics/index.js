import React from 'react';
import TopNav from '../../shared/components/TopNav';
import GitList from './components/GitList';
import {Button,Glyphicon} from 'react-bootstrap';


/* Master for all user projects */
export default class Statistics extends React.Component{
	constructor(props){
		super(props);
		this.state = {};
	}


	render(){
		return (
			<div id="content">
				<TopNav view="Git Statistics"/>
				<GitList />
			</div>
		);
	}

}

/*import React from 'react';
import TopNav from '../../shared/components/TopNav';
import { Bar } from 'react-chartjs';

const chartData = {


};

const chartOptions = {
    scaleShowGridLines : false,
    scaleShowLabels: false,
    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false
};

export default (props) => {


    return (
		<div id="content">
			<TopNav view="Git Statistics" />
			<div className="content container-fluid bodySize">
				<div className="personalStats"><br/>
				<h1><strong>My Stats</strong></h1>
				<h4>Webpage 1</h4>
        <Bar data={chartData} options={chartOptions}/>
				<h4>Webpage 2</h4>
				</div>
			</div>
		</div>
    );
};*/

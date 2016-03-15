import React from 'react';
import Ionicon from '../../../../../../shared/components/Ionicon';


export default class Story extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="user-story collapse1 collapse in">
		        <div className="">
		            <div className="heading">
		                <div className="row left-right-align">
		                    <div className="col-md-9"><a>{this.props.id}</a></div>
		                    <div className="col-md-3">
		                        <div className="control">
		                            <button className="transparent"><Ionicon icon="ion-edit" /></button>
		                        </div>
		                    </div>
		                </div>
		            </div>
		            <div className="body">
		                <h5>{this.props.title}</h5>
		                <ul>
		                	{this.props.description.split("\n").map((desc, i) => {
		                		return (<li key={i}>{desc}</li>);
		                	})}
		                </ul>
		            </div>
		        </div>
			</div>
		);
	}
}
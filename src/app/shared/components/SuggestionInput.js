import React from 'react';
import { search } from '../../mock_server/server';

export default class SuggestionInput extends React.Component {
	constructor(props){
		super(props);
	}

	handleChange(e){
		let text = e.target.value;
		let results = search(text, this.props.collection, this.props.searchKey);
		console.log(results.map((res) => res[this.props.searchKey]));
	}

	render(){
		return (
			<div className="suggestion-input">
				<input onChange={(e) => this.handleChange(e)}/>
			</div>
		)
	}
}
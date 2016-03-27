import React from 'react';
import { search } from '../../mock_server/server';
import { Async as AsyncSelect } from 'react-select';
import Select from 'react-select';

export default class SingleSelect extends React.Component {
	constructor(props){
		super(props);
		this.state = { value: null }
	}
	getSelectOptions(input){
		return search(input, this.props.collection, this.props.labelKey).then((options) => {
			return { options: options };
		});
	}

	handleChange(value){
		this.setState({ value });
		this.props.updateState(value);
	}

	render(){
		return (
			<AsyncSelect
			    name="form-field-name"
			    loadOptions={this.getSelectOptions.bind(this)}
			    labelKey={this.props.labelKey}
			    valueKey={this.props.valueKey}
			    onChange={this.handleChange.bind(this)}
			    value={this.state.value}
			/>
		);
	}
}
import React from 'react';
import { search } from '../../mock_server/server';
import { Async as AsyncSelect } from 'react-select';
import Select from 'react-select';

export default class MultiSelect extends React.Component {
	constructor(props){
		super(props);
		this.state = { value: [] }
	}
	getSelectOptions(input){
		return search(input, this.props.collection, this.props.labelKey).then((options) => {
			return { options: options };
		});
	}

	handleChange(values){
		this.setState({ values });
		this.props.updateState(values);
	}

	render(){
		return (
			<AsyncSelect
				multi
			    name="form-field-name"
			    loadOptions={this.getSelectOptions.bind(this)}
			    labelKey={this.props.labelKey}
			    valueKey={this.props.valueKey}
			    onChange={this.handleChange.bind(this)}
			    value={this.state.values}
			/>
		);
	}
}
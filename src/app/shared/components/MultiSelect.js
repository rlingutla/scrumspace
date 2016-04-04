import React from 'react';
import { sendXHRPromise } from '../../mock_server/server';
import { Async as AsyncSelect } from 'react-select';
import Select from 'react-select';

export default class MultiSelect extends React.Component {
	constructor(props){
		super(props);
		
		this.state = { 
			values: this.props.initialState || [] 
		}
	}
	getSelectOptions(input: ''){
		// return sendXHRPromise('GET', `/api/user/search?searchStr=${input}&key=${this.props.labelKey}`, undefined).then((response) => {
		// 	return {options: response.data};
		// });
		let searchExpr = new RegExp(input.split('').join('\\w*').replace(/\W/, ''), 'i');
		

		return Promise.resolve({options: this.props.users.filter((user) => {
				return (user.display_name.match(searchExpr));
			})
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
			    filterOption={this.props.filterOption}
			/>
		);
	}
}
import React from 'react';
import { search } from '../../mock_server/server';

export default class SuggestionInput extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			suggestions: [],
			value: "",
			selected: 0,
			display:false
		}
	}

	handleChange(e){
		let text = e.target.value;
		let results = search(text, this.props.collection, this.props.searchKey);
		if(results.length > 0){
			this.setState({ value: text, suggestions: results, display: true, selected: 0 });
		}

	}

	handleFocus(e){
		if(this.state.suggestions.length > 0){
			this.setState({display:true});	
		}
	}

	//TODO: needs to support suggestion click events
	handleBlur(e){
		this.setState({ display:false, value: '', suggestions: [] });
	}


	// suggestion events
	handleClick(e, sug){
		this.setState({ value: sug[this.props.searchKey], display:false });
		this.props.updateState(sug);
	}
	handleHover(e, sug, index){
		this.setState({ selected: index });
	}

	//key events
	handleKeyDown(e){
		switch(e.keyCode){
			//enter
			case 13:
				if(this.state.suggestions.length > 0){
					e.target.blur();
					this.setState({ value: this.state.suggestions[this.state.selected][this.props.searchKey], display:false });
					this.props.updateState(this.state.suggestions[this.state.selected]);
				}
				break;
			//down
			case 40:
				if(this.state.selected < this.state.suggestions.length - 1){
					this.setState({ selected: ++this.state.selected });
				}
				break;
			//up
			case 38:
				if(this.state.selected > 0){
					this.setState({ selected: --this.state.selected });
				}
				break;
		}

	}


	render(){
		return (
			<div className="suggestion-input">
				<input 
					className="form-control" 
					value={this.state.value}  
					onChange={(e) => this.handleChange(e)} 
					onFocus={(e) => this.handleFocus(e)}
					onBlur={(e) => this.handleBlur(e)}
					onKeyDown={(e) => this.handleKeyDown(e)}
				/>

				{(this.state.display) ? 
				<div className="suggestions">
					<ul>
						{this.state.suggestions.map((sug, i) => 
							<li className={(this.state.selected === i) ? 'selected':''} 
								onClick={(e) => this.handleClick(e, sug)} 
								onMouseEnter={(e) => this.handleHover(e, sug, i)} 
								key={i}>
								{sug[this.props.searchKey]}
							</li>
						)}
					</ul>
				</div>:null}
			</div>
		)
	}
}
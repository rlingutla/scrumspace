import React from 'react';

class NavTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props['tab-id'],
            active: this.props['active-tab'] == this.props['tab-id'],
            name: this.props.name
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        console.log("click handler called", this.state.id);
        this.props['tab-change'](this.state.id);
    }

    render() {
        return (
        		<li onClick={this.clickHandler} role="presentation" className={(this.state.active) ? 'active':null}><a>{this.state.name}</a></li>
        );
    }
}

export default NavTab;

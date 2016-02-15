import React from 'react';

class NavTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props['active-tab'] == this.props['tab-id']
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        console.log("click handler called", this.props['tab-id']);
        this.props['tab-change'](this.props['tab-id']);
        this.setState({ active: true })
    }

    render() {
        return (
        		<li onClick={this.clickHandler} role="presentation" className={(this.props['active-tab'] == this.props['tab-id']) ? 'active':null}><a>{this.props.name}</a></li>
        );
    }
}

export default NavTab;

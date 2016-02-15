import React from 'react';

class Tab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        	<div className="tab" className={"tab " + ((this.props['active-tab'] == this.props['tab-id']) ? 'active':'')}>
                { this.props.children }
            </div>
        );
    }
}

export default Tab;
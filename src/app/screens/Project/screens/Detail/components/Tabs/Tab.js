import React from 'react';

//stateless component
const Tab = (props) => {
    return (
        <div className="tab" className={"tab " + ((props['active-tab'] == props['tab-id']) ? 'active':'')}>
            { props.children }
        </div>
    );
};

export default Tab;
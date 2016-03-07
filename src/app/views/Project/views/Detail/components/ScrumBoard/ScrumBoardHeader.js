import React from 'react';

export default class ScrumBoardHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<thead>
				<tr>
				    <th>Stories</th>
				    <th>Tasks <span className="badge">3</span></th>
				    <th>Doing <span className="badge">2</span></th>
				    <th>Blocked <span className="badge">1</span></th>
				    <th>Done <span className="badge">1</span></th>
				</tr>
			</thead>
		);
	}
}
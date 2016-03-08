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
				    <th>Tasks</th>
				    <th>Doing</th>
				    <th>Blocked</th>
				    <th>Done</th>
				</tr>
			</thead>
		);
	}
}
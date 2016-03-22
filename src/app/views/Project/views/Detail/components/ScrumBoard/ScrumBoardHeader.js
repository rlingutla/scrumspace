import React from 'react';
import { Button } from 'react-bootstrap';
import Ionicon from '../../../../../../shared/components/Ionicon';

export default class ScrumBoardHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<thead>
				<tr>
				    <th className="story-row"></th>
				    <th>Tasks</th>
				    <th>Doing</th>
				    <th>Blocked</th>
				    <th>Done</th>
				</tr>
			</thead>
		);
	}
}
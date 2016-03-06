import React from 'react';

export default (props) => {
	return (
		<div key={props.key} className="row">
			<div className="container-fluid">
				<div className="state-doing">
					<div className="task">
						<div className="heading">
							{props.description}
						</div>
						<div className="body">
							Proin pellentesque facilisis ante, in tincidunt nunc luctus sed.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
let initialState = {};

const app = (state = initialState, action) => {
	switch (action.type) {
		case: 'UPDATE_NAV': 
			return {
				title: action.title,
				action.children;
			}
		default: //just returning state for now
			return state;
	}
};

export default app;
var initialState = {};

export default (state = initialState, action) => {
	switch (action.type){
		case 'CHANGE_SETTINGS_STATE':
			return Object.assign(action.state);
		default: 
			return state;
	}
};
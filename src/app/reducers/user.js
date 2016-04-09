const user = (state = {}, action) => {
	switch (action.type){
		case 'CHANGE_SETTINGS_STATE':
			let newSettings = action.newSettings;
			return Object.assign({
				first_name: newSettings.first_name,
				last_name: newSettings.last_name,
				email: newSettings.email,
				display_name: newSettings.display_name,
				password: newSettings.password
			});
		default: 
			return state;
	}
};

export default user;
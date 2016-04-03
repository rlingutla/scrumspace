import TaskTypes from 'app/shared/constants/taskTypes';

const mutateItem = (item, fromType, toType) => {
	let modified = Object.assign({}, item);
	//moving from blocked to another state
	if(fromType === TaskTypes.BLOCKED, toType !== TaskTypes.BLOCKED){
		modified.blocked_by = [];
	}
	return modified;
}

const handleCase = (item, target, fromType, toType) => {
	/* 
	** moving to DOING
	** if task has no assigned users, prompt before move
	*/
	if(toType === TaskTypes.DOING){
		if(item.assigned_to.length < 1){
			target.setState({ 
				assignUserModal: Object.assign({}, 
					target.state.assignUserModal, 
					{visible: true, task: item, target: toType})
			});
			return {canMove: false};
		}
		else return {canMove: true, task: item, target: toType};
	}
	/*
	** moving to BLOCKED
	** assign blocking tasks
	*/
	else if(toType === TaskTypes.BLOCKED && fromType !== TaskTypes.BLOCKED){
		target.setState({ 
			blockedTaskModal: Object.assign({},
				target.state.blockedTaskModal, 
				{visible: true, task: item, target: toType})
		});
		return {canMove: false};
	}
	// all other cases 
	else return {canMove: true, task: item, target: toType};
};

export default (item, target) => {
	let fromType = TaskTypes[item.status], toType = target.props.type;

	return new Promise((resolve, reject) => {
		//perform any mutations for relevant moves
		let mutatedItem = mutateItem(item, fromType, toType);
		return resolve(handleCase(mutatedItem, target, fromType, toType));
	});
};
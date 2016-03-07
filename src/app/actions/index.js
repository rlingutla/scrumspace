export const changeTaskState = (project_id, story_id, task_id, toType) => {
	return {
		type: 'CHANGE_TASK_STATE',
		project_id,
		story_id,
		task_id,
		toType
	}
};
// export const taskReceived = (data) => {
// 	return {
// 		type: 'UPDATE_TASK',
// 		task: data.task,
// 		project_id: data.project_id,
// 		story_id: data.story_id
// 	};
// };

export default (socketData) => {
	//actions sent from server, passin along
	return socketData;
}

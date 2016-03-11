/*
	Parameters of taskSelector
	projects: An array of projects
	storyPredicate: Boolean function for story properties
	taskPredicate: Boolean function for task properties
*/

export default (projects, storyPredicate, taskPredicate) => {
	return projects
	.map((project) => project.stories)
	.reduce((a, b) => a.concat(b))
	.filter(storyPredicate)
	.map((story) => story.tasks)
	.reduce((a, b) => a.concat(b))
	.filter(taskPredicate);
};
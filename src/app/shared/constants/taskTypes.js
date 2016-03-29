import { colors } from './theme';

export default {
	UNASSIGNED: {
		title: 'UNASSIGNED',
		color: colors.gray,
		bsStyle: 'info',
		display: 'Unassigned'
	},
	DOING: {
		title: 'DOING',
		color: colors.yellow,
		bsStyle: 'warning',
		display: 'Doing'
	},
	BLOCKED: {
		title: 'BLOCKED',
		color: colors.red,
		bsStyle: 'danger',
		display: 'Blocked'
	},
	DONE: {
		title: 'DONE',
		color: colors.green,
		bsStyle: 'success',
		display: 'Done'
	}
};
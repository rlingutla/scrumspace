import { colors } from './theme';

export default {
	UNASSIGNED: {
		title: 'UNASSIGNED',
		color: colors.gray,
		bsStyle: 'info'
	},
	DOING: {
		title: 'DOING',
		color: colors.yellow,
		bsStyle: 'warning'
	},
	BLOCKED: {
		title: 'BLOCKED',
		color: colors.darkGray,
		bsStyle: 'danger'
	},
	BLOCKING: {
		title: 'BLOCKING',
		color: colors.red
	},
	DONE: {
		title: 'DONE',
		color: colors.green,
		bsStyle: 'success'
	}
};
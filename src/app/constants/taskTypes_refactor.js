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
		bsStyle: ''
	},
	BLOCKING: {
		title: 'BLOCKING',
		color: colors.red,
		bsStyle: 'danger'
	},
	DONE: {
		title: 'DONE',
		color: colors.green,
		bsStyle: 'success'
	}
};
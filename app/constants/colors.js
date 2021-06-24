import { isIOS, isAndroid } from '../utils/deviceInfo';

export const COLOR_DANGER = '#f5455c';
export const COLOR_BUTTON_PRIMARY = '#66A9DD';
export const COLOR_BUTTON_SECONDARY = '#C4CFD5';
export const COLOR_BUTTON_DEFAULT = '#EBEBEB';
export const COLOR_BUTTON_DANGER = '#F95522';
export const COLOR_BUTTON_WHITE = '#FFFFFF';
export const COLOR_BUTTON_GRAY = '#c7c7c7';
export const COLOR_BUTTON_DONE = '#3f65b2';
export const COLOR_BUTTON_FACEBOOK = '#3f65b2';
export const COLOR_BUTTON_GOOGLE = '#ce011b';
export const COLOR_BUTTON_APPLE_LIGHT = '#000000';
export const COLOR_BUTTON_APPLE_DARK = '#FFFFFF';
export const COLOR_BUTTON_APPLE_BLACK = '#FFFFFF';

export const COLOR_BUTTON_TEXT_PRIMARY = '#FFFFFF';
export const COLOR_BUTTON_TEXT_SECONDARY = '#FFFFFF';
export const COLOR_BUTTON_TEXT_DEFAULT = '#000000';
export const COLOR_BUTTON_TEXT_DANGER = '#FFFFFF';
export const COLOR_BUTTON_TEXT_WHITE = '#000000';
export const COLOR_BUTTON_TEXT_DONE = '#FFFFFF';
export const COLOR_BUTTON_TEXT_FACEBOOK = '#FFFFFF';
export const COLOR_BUTTON_TEXT_GOOGLE = '#FFFFFF';
export const COLOR_BUTTON_TEXT_APPLE_LIGHT = '#FFFFFF';
export const COLOR_BUTTON_TEXT_APPLE_DARK = '#000000';
export const COLOR_BUTTON_TEXT_APPLE_BLACK = '#000000';

export const COLOR_TEXT = '#292E35';
export const COLOR_SEPARATOR = '#CBCED1';
export const COLOR_SUCCESS = '#2de0a5';
export const COLOR_PRIMARY = '#1d74f5';
export const COLOR_WHITE = '#fff';
export const COLOR_TITLE = '#0C0D0F';
export const COLOR_TEXT_DESCRIPTION = '#9ca2a8';
export const COLOR_BACKGROUND_CONTAINER = '#f3f4f5';
export const COLOR_BACKGROUND_NOTIFICATION = '#f8f8f8';
export const COLOR_BORDER = '#e1e5e8';
export const COLOR_UNREAD = '#e1e5e8';
export const COLOR_TOAST = '#0C0D0F';
export const STATUS_COLORS = {
	online: '#2de0a5',
	busy: '#f5455c',
	away: '#ffd21f',
	offline: '#cbced1'
};

export const HEADER_BACKGROUND = '#FFF';
export const HEADER_TITLE = '#0C0D0F';
export const HEADER_BACK = '#13202f';

export const SWITCH_TRACK_COLOR = {
	false: '#f5455c',
	true: '#2de0a5'
};

const mentions = {
	unreadColor: '#0bb203',
	tunreadColor: '#1d74f5',
	mentionGroupColor: '#F38C39',
};

export const themes = {
	light: {
		activeTintColor: '#000000',
		backgroundColor: '#ffffff',
		focusedBackground: '#ffffff',
		chatComponentBackground: '#f3f4f5',
		auxiliaryBackground: '#efeff4',
		avatarBackground: '#caced1',
		bannerBackground: '#f1f2f4',
		titleText: '#0d0e12',
		ownMsgText: '#f1f2f4',
		otherMsgText: '#0C0D0F',
		ownAuxiliaryText: '#e3e2e2',
		otherAuxiliaryText: '#51555f',
		bodyText: '#2f343d',
		backdropColor: '#000000',
		dangerColor: '#f5455c',
		successColor: '#2de0a5',
		borderColor: '#e1e5e8',
		controlText: '#54585e',
		auxiliaryText: '#9ca2a8',
		inactiveTintColor: '#9ca2a8',
		infoText: '#6d6d72',
		readText: '#404040',
		tintColor: '#1d74f5',
		tintActive: '#549df9',
		auxiliaryTintColor: '#6C727A',
		actionTintColor: '#1d74f5',
		separatorColor: '#cbcbcc',
		navbarBackground: '#ffffff',
		headerBorder: '#B2B2B2',
		headerBackground: '#EEEFF1',
		headerSecondaryBackground: '#EEEFF1',
		headerTintColor: '#6C727A',
		headerTitleColor: '#0C0D0F',
		headerSecondaryText: '#1d74f5',
		toastBackground: '#0C0D0F',
		videoBackground: '#1f2329',
		favoriteBackground: '#ffbb00',
		hideBackground: '#54585e',
		messageboxBackground: '#ffffff',
		searchboxBackground: '#E6E6E7',
		buttonBackground: '#414852',
		buttonText: '#ffffff',
		messageOwnBackground: '#65a9dc',
		messageOtherBackground: '#f2f6f9',
		modalBackground: '#E6E6E7',
		passcodeBackground: '#EEEFF1',
		passcodeButtonActive: '#E4E7EA',
		passcodeLockIcon: '#6C727A',
		passcodePrimary: '#2F343D',
		passcodeSecondary: '#6C727A',
		passcodeDotEmpty: '#CBCED1',
		passcodeDotFull: '#6C727A',
		previewBackground: '#1F2329',
		previewTintColor: '#ffffff',
		...mentions,
		mentionMeColor: '#944204',
		mentionOtherColor: '#151572',
	},
	dark: {
		activeTintColor: '#FFFFFF',
		backgroundColor: '#030b1b',
		focusedBackground: '#0b182c',
		chatComponentBackground: '#192132',
		auxiliaryBackground: '#07101e',
		avatarBackground: '#0b182c',
		bannerBackground: '#0e1f38',
		titleText: '#f9f9f9',
		ownMsgText: '#f1f2f4',
		otherMsgText: '#0d0d0d',
		ownAuxiliaryText: '#e3e2e2',
		otherAuxiliaryText: '#212121',
		bodyText: '#e8ebed',
		backdropColor: '#000000',
		dangerColor: '#f5455c',
		successColor: '#2de0a5',
		borderColor: '#0f213d',
		controlText: '#dadde6',
		auxiliaryText: '#9297a2',
		inactiveTintColor: '#9297a2',
		infoText: '#6D6D72',
		readText: '#c0c0c0',
		tintColor: '#1d74f5',
		tintActive: '#549df9',
		auxiliaryTintColor: '#f9f9f9',
		actionTintColor: '#1d74f5',
		separatorColor: '#2b2b2d',
		navbarBackground: '#0b182c',
		headerBorder: '#2F3A4B',
		headerBackground: '#0b182c',
		headerSecondaryBackground: '#0b182c',
		headerTintColor: '#f9f9f9',
		headerTitleColor: '#f9f9f9',
		headerSecondaryText: '#9297a2',
		toastBackground: '#0C0D0F',
		videoBackground: '#1f2329',
		favoriteBackground: '#ffbb00',
		hideBackground: '#54585e',
		messageboxBackground: '#0b182c',
		searchboxBackground: '#192d4d',
		buttonBackground: '#414852',
		buttonText: '#ffffff',
		messageOwnBackground: '#65a9dc',
		messageOtherBackground: '#b7babc',
		modalBackground: '#192d4d',
		passcodeBackground: '#030C1B',
		passcodeButtonActive: '#0B182C',
		passcodeLockIcon: '#6C727A',
		passcodePrimary: '#FFFFFF',
		passcodeSecondary: '#CBCED1',
		passcodeDotEmpty: '#CBCED1',
		passcodeDotFull: '#6C727A',
		previewBackground: '#030b1b',
		previewTintColor: '#ffffff',
		...mentions,
		mentionMeColor: '#944204',
		mentionOtherColor: '#151572',
	},
	black: {
		activeTintColor: '#f9f9f9',
		backgroundColor: '#000000',
		focusedBackground: '#0d0d0d',
		chatComponentBackground: '#16181a',
		auxiliaryBackground: '#080808',
		avatarBackground: '#181b1d',
		bannerBackground: '#1f2329',
		titleText: '#f9f9f9',
		ownMsgText: '#f1f2f4',
		otherMsgText: '#0d0d0d',
		ownAuxiliaryText: '#e3e2e2',
		otherAuxiliaryText: '#515151',
		bodyText: '#e8ebed',
		backdropColor: '#000000',
		dangerColor: '#f5455c',
		successColor: '#2de0a5',
		borderColor: '#1f2329',
		controlText: '#dadde6',
		auxiliaryText: '#b2b8c6',
		inactiveTintColor: '#b2b8c6',
		infoText: '#6d6d72',
		readText: '#c0c0c0',
		tintColor: '#1e9bfe',
		tintActive: '#76b7fc',
		auxiliaryTintColor: '#f9f9f9',
		actionTintColor: '#1e9bfe',
		separatorColor: '#272728',
		navbarBackground: '#0d0d0d',
		headerBorder: '#323232',
		headerBackground: '#0d0d0d',
		headerSecondaryBackground: '#0d0d0d',
		headerTintColor: '#f9f9f9',
		headerTitleColor: '#f9f9f9',
		headerSecondaryText: '#b2b8c6',
		toastBackground: '#0C0D0F',
		videoBackground: '#1f2329',
		favoriteBackground: '#ffbb00',
		hideBackground: '#54585e',
		messageboxBackground: '#0d0d0d',
		searchboxBackground: '#1f1f1f',
		buttonBackground: '#414852',
		buttonText: '#ffffff',
		messageOwnBackground: '#65a9dc',
		messageOtherBackground: '#f2f6f9',
		modalBackground: '#192d4d',
		passcodeBackground: '#000000',
		passcodeButtonActive: '#0E0D0D',
		passcodeLockIcon: '#6C727A',
		passcodePrimary: '#FFFFFF',
		passcodeSecondary: '#CBCED1',
		passcodeDotEmpty: '#CBCED1',
		passcodeDotFull: '#6C727A',
		previewBackground: '#000000',
		previewTintColor: '#ffffff',
		...mentions,
		mentionMeColor: '#944204',
		mentionOtherColor: '#151572',
	}
};

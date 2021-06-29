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
export const COLOR_BORDER = '#e1e5e8';
export const COLOR_UNREAD = '#e1e5e8';
export const COLOR_TOAST = '#0C0D0F';
export const COLOR_ORANGE = '#f26522';
export const COLOR_ORANGE_DARK = '#d6591e';
export const COLOR_ORANGE_LIGHT = '#fa8e5b';
export const COLOR_BLUE = '#2d7fee';
export const COLOR_BLUE_DARK = '#00387f';
export const COLOR_GREEN = '#21b632';
export const COLOR_GRAY_LIGHT = '#fdf8f8';


export const STATUS_COLORS = {
	online: '#2de0a5',
	busy: '#f5455c',
	away: '#ffd21f',
	offline: '#cbced1'
};

export const HEADER_BACKGROUND = '#FFF';
export const HEADER_TITLE = '#FFFFFF';
export const HEADER_BACK = '#FFFFFF';

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
	theme_a: {
		activeTintColor: '#000000',
		backgroundColor: '#fdf8f8',
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
		auxiliaryTintColor: '#ffcfb8',
		actionTintColor: '#0d3a97',
		actionColor: '#f26522',
		separatorColor: '#cbcbcc',
		navbarBackground: '#f26522',
		headerBorder: '#f26522',
		headerBackground: '#f26522',
		headerSecondaryBackground: '#EEEFF1',
		headerTintColor: '#FFFFFF',
		headerTitleColor: '#FFFFFF',
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
	},
	theme_b: {
		activeTintColor: '#000000',
		backgroundColor: '#fdf8f8',
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
		auxiliaryTintColor: '#d499b9',
		actionTintColor: '#0d3a97',
		actionColor: '#9055a2',
		separatorColor: '#cbcbcc',
		navbarBackground: '#9055a2',
		headerBorder: '#9055a2',
		headerBackground: '#9055a2',
		headerSecondaryBackground: '#EEEFF1',
		headerTintColor: '#FFFFFF',
		headerTitleColor: '#FFFFFF',
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
	},
	theme_c: {
		activeTintColor: '#000000',
		backgroundColor: '#fdf8f8',
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
		auxiliaryTintColor: '#d7fff1',
		actionTintColor: '#0d3a97',
		actionColor: '#8cd790',
		separatorColor: '#cbcbcc',
		navbarBackground: '#8cd790',
		headerBorder: '#8cd790',
		headerBackground: '#8cd790',
		headerSecondaryBackground: '#EEEFF1',
		headerTintColor: '#FFFFFF',
		headerTitleColor: '#FFFFFF',
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
	},
	theme_d: {
		activeTintColor: '#000000',
		backgroundColor: '#fdf8f8',
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
		auxiliaryTintColor: '#efdc05',
		actionTintColor: '#0d3a97',
		actionColor: '#30a9de',
		separatorColor: '#cbcbcc',
		navbarBackground: '#30a9de',
		headerBorder: '#30a9de',
		headerBackground: '#30a9de',
		headerSecondaryBackground: '#EEEFF1',
		headerTintColor: '#FFFFFF',
		headerTitleColor: '#FFFFFF',
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
	},
	theme_e: {
		activeTintColor: '#000000',
		backgroundColor: '#fdf8f8',
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
		auxiliaryTintColor: '#fadad8',
		actionTintColor: '#0d3a97',
		actionColor: '#d09e88',
		separatorColor: '#cbcbcc',
		navbarBackground: '#d09e88',
		headerBorder: '#d09e88',
		headerBackground: '#d09e88',
		headerSecondaryBackground: '#EEEFF1',
		headerTintColor: '#FFFFFF',
		headerTitleColor: '#FFFFFF',
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
	},
	theme_f: {
		activeTintColor: '#000000',
		backgroundColor: '#fdf8f8',
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
		auxiliaryTintColor: '#ffbc42',
		actionTintColor: '#0d3a97',
		actionColor: '#d81159',
		separatorColor: '#cbcbcc',
		navbarBackground: '#d81159',
		headerBorder: '#d81159',
		headerBackground: '#d81159',
		headerSecondaryBackground: '#EEEFF1',
		headerTintColor: '#FFFFFF',
		headerTitleColor: '#FFFFFF',
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
	}
};

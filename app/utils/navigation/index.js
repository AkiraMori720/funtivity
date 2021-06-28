import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

import { HEADER_BACK, HEADER_BACKGROUND, HEADER_TITLE } from '../../constants/colors';
import { themes } from '../../constants/colors';
import sharedStyles from '../../views/Styles';

export * from './animations';

export const defaultHeader = {
	headerBackTitleVisible: false,
	cardOverlayEnabled: true,
	cardStyle: { backgroundColor: 'transparent' }
};

export const outsideHeader = {
	headerStyle: {
		backgroundColor: HEADER_BACKGROUND,
	},
	headerTitleStyle: {
		color: HEADER_TITLE
	},
	headerBackTitle: null,
	headerTintColor: HEADER_BACK,
	headerLayoutPreset: 'center'
};

export const cardStyle = {
	backgroundColor: 'rgba(0,0,0,0)'
};

export const borderBottom = theme => ({
	borderBottomWidth: 0,
	elevation: 0,
	shadowOpacity: 0
});

export const themedHeader = theme => ({
	headerStyle: {
		...borderBottom(theme),
		backgroundColor: themes[theme].headerBackground,
	},
	headerTintColor: themes[theme].headerTintColor,
	headerTitleStyle: { color: themes[theme].headerTitleColor, alignSelf: 'center' }
});

export const navigationTheme = (theme) => {
	const defaultNavTheme = theme === 'light' ? DefaultTheme : DarkTheme;

	return {
		...defaultNavTheme,
		colors: {
			...defaultNavTheme.colors,
			background: themes[theme].backgroundColor,
			border: themes[theme].borderColor
		}
	};
};

// Gets the current screen from navigation state
export const getActiveRoute = (state) => {
	const route = state?.routes[state?.index];

	if (route?.state) {
		// Dive into nested navigators
		return getActiveRoute(route.state);
	}

	return route;
};

export const getActiveRouteName = state => getActiveRoute(state)?.name;

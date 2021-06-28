import changeNavigationBarColor from 'react-native-navigation-bar-color';
import setRootViewColor from 'rn-root-view';

import { isAndroid } from './deviceInfo';
import { themes } from '../constants/colors';

export const defaultTheme = () => {
	return 'orange';
};

export const getTheme = (themePreferences) => {
	const { currentTheme } = themePreferences;
	return currentTheme??defaultTheme();
};

export const newThemeState = (prevState, newTheme) => {
	// new theme preferences
	const themePreferences = {
		...prevState.themePreferences,
		...newTheme
	};
	// set new state of themePreferences
	// and theme (based on themePreferences)
	return { themePreferences, theme: getTheme(themePreferences) };
};

export const setNativeTheme = async(themePreferences) => {
	const theme = getTheme(themePreferences);
	if (isAndroid) {
		try {
			await changeNavigationBarColor(themes[theme].navbarBackground, true);
		} catch (error) {
			// Do nothing
		}
	}
	setRootViewColor(themes[theme].backgroundColor);
};

export const subscribeTheme = (themePreferences, setTheme) => {
	setNativeTheme(themePreferences);
};

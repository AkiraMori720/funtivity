import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { isAndroid } from './deviceInfo';
import { themes } from '../constants/colors';

export const defaultTheme = () => {
	return 'theme_a';
};

export const setNativeTheme = async(theme) => {
	if (isAndroid) {
		try {
			await changeNavigationBarColor(themes[theme].navbarBackground, true);
		} catch (error) {
			// Do nothing
		}
	}
};

export const subscribeTheme = (theme) => {
	setNativeTheme(theme);
};

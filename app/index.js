import React from 'react';
import { Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import {
    defaultTheme,
    newThemeState,
    subscribeTheme,
    unsubscribeTheme
} from './utils/theme';
import store from './lib/createStore';
import { ThemeContext } from './theme';
import { DimensionsContext } from './dimensions';

import { ActionSheetProvider } from './containers/ActionSheet';
import AppContainer from './AppContainer';
import InAppNotification from './containers/InAppNotification';
import Toast from './containers/Toast';
import {supportSystemTheme} from './utils/deviceInfo';
import {appInit} from './actions/app';

export default class Root extends React.Component {
    constructor(props) {
        super(props);

        this.init();
        const {
            width, height, scale, fontScale
        } = Dimensions.get('window');

        this.state = {
            theme: defaultTheme(),
            themePreferences: {
                currentTheme: supportSystemTheme() ? 'automatic' : 'light',
                darkLevel: 'dark'
            },
            width,
            height,
            scale,
            fontScale
        };
    }

    init = async() => {
        store.dispatch(appInit());
    }

    setTheme = (newTheme = {}) => {
        // change theme state
        this.setState(prevState => newThemeState(prevState, newTheme), () => {
            const { themePreferences } = this.state;
            // subscribe to Appearance changes
            subscribeTheme(themePreferences, this.setTheme);
        });
    }

    setDimensions = ({
                         width, height, scale, fontScale
                     }) => {
        this.setState({
            width, height, scale, fontScale
        });
    }

    render(){
        const {
            themePreferences, theme, width, height, scale, fontScale
        } = this.state;

        return (
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <AppearanceProvider>
                    <Provider store={store}>
                        <ThemeContext.Provider
                            value={{
                                theme,
                                themePreferences,
                                setTheme: this.setTheme
                            }}
                        >
                            <DimensionsContext.Provider
                                value={{
                                    width,
                                    height,
                                    scale,
                                    fontScale,
                                    setDimensions: this.setDimensions
                                }}
                            >
                                <ActionSheetProvider>
                                    <AppContainer/>
                                    <InAppNotification/>
                                    <Toast/>
                                </ActionSheetProvider>
                            </DimensionsContext.Provider>
                        </ThemeContext.Provider>
                    </Provider>
                </AppearanceProvider>
            </SafeAreaProvider>
        )
    }
}

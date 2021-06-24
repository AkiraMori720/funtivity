import React from 'react';
import PropTypes from 'prop-types';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import Navigation from './lib/Navigation';
import {getActiveRouteName, navigationTheme} from './utils/navigation';
import {ROOT_LOADING, ROOT_OUTSIDE} from './actions/app';

// Stacks
import AuthLoadingView from './views/AuthLoadingView';

import OutsideStack from './stacks/OutsideStack';
import {ThemeContext} from './theme';


// App
const Stack = createStackNavigator();
const App = React.memo(({ root, isMasterDetail }) => {
    if (!root) {
        return null;
    }

    const { theme } = React.useContext(ThemeContext);
    const navTheme = navigationTheme(theme);

    React.useEffect(() => {
        const state = Navigation.navigationRef.current?.getRootState();
        Navigation.routeNameRef.current = getActiveRouteName(state);
    }, []);

    return (
        <NavigationContainer
            theme={navTheme}
            ref={Navigation.navigationRef}
            onStateChange={(state) => {
                const previousRouteName = Navigation.routeNameRef.current;
                Navigation.routeNameRef.current = getActiveRouteName(state);
            }}
        >
            <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
                <>
                    {root === ROOT_LOADING ? (
                        <Stack.Screen
                            name='AuthLoading'
                            component={AuthLoadingView}
                        />
                    ) : null}
                    {root === ROOT_OUTSIDE  ? (
                        <Stack.Screen
                            name='OutsideStack'
                            component={OutsideStack}
                        />
                    ) : null}
                </>
            </Stack.Navigator>
        </NavigationContainer>
    );
});
const mapStateToProps = state => ({
    root: state.app.root,
    isMasterDetail: state.app.isMasterDetail
});

App.propTypes = {
    root: PropTypes.string,
    isMasterDetail: PropTypes.bool
};

const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;

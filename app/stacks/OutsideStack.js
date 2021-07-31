import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeContext } from '../theme';
import {
	outsideHeader, themedHeader, StackAnimation
} from '../utils/navigation';

import SignInView from '../views/SignInView';
import SignUpView from '../views/SignUpView';
import ForgotPasswordView from '../views/ForgotPasswordView';
import AboutView from "../views/AboutView";

// Outside
const Outside = createStackNavigator();
const OutsideStack = () => {
	const { theme } = React.useContext(ThemeContext);

	return (
		<Outside.Navigator screenOptions={{ ...outsideHeader, ...themedHeader(theme), ...StackAnimation }}>
			<Outside.Screen
				name='SignIn'
				component={SignInView}
				options={SignInView.navigationOptions}
			/>
			<Outside.Screen
				name='SignUp'
				component={SignUpView}
				options={SignUpView.navigationOptions}
			/>
			<Outside.Screen
				name='ForgotPassword'
				component={ForgotPasswordView}
				options={ForgotPasswordView.navigationOptions}
			/>
			<Outside.Screen
				name='About'
				component={AboutView}
			/>
		</Outside.Navigator>
	);
};

export default OutsideStack;

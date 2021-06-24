import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeContext } from '../theme';
import {
	outsideHeader, themedHeader, StackAnimation, ModalAnimation
} from '../utils/navigation';

import OnBoardingView from '../views/OnBoardingView';
// // SignupStack
// import SignupView from '../views/SignupView';
// import RegisterView from '../views/RegisterView';
// import RegisterCompleteView from '../views/RegisterCompleteView';
// import AccountUnlockView from '../views/AccountUnlockView';
//
// // SigninStack
// import SigninView from '../views/SigninView';
// import LoginView from '../views/LoginView';
// import ForgotPasswordView from '../views/ForgotPasswordView';
//
// // FirstCardStack
// import FirstCardView from '../views/FirstCardView';
//
// import AuthenticationWebView from '../views/AuthenticationWebView';


// Outside
const Outside = createStackNavigator();
const OutsideStack = () => {
	const { theme } = React.useContext(ThemeContext);

	return (
		<Outside.Navigator screenOptions={{ ...outsideHeader, ...themedHeader(theme), ...StackAnimation }}>
			<Outside.Screen
				name='OnBoarding'
				component={OnBoardingView}
				options={{ headerShown: false }}
			/>
			{/*<Outside.Screen*/}
			{/*	name='SignupView'*/}
			{/*	component={SignupView}*/}
			{/*	options={{ headerShown: false }}*/}
			{/*/>*/}
			{/*<Outside.Screen*/}
			{/*	name='RegisterView'*/}
			{/*	component={RegisterView}*/}
			{/*/>*/}
			{/*<Outside.Screen*/}
			{/*	name='RegisterCompleteView'*/}
			{/*	component={RegisterCompleteView}*/}
			{/*	options={RegisterCompleteView.navigationOptions}*/}
			{/*/>*/}
			{/*<Outside.Screen*/}
			{/*	name='AccountUnlockView'*/}
			{/*	component={AccountUnlockView}*/}
			{/*/>*/}
			{/*<Outside.Screen*/}
			{/*	name='SigninView'*/}
			{/*	component={SigninView}*/}
			{/*/>*/}
			{/*<Outside.Screen*/}
			{/*	name='LoginView'*/}
			{/*	component={LoginView}*/}
			{/*/>*/}
			{/*<Outside.Screen*/}
			{/*	name='ForgotPasswordView'*/}
			{/*	component={ForgotPasswordView}*/}
			{/*	options={ForgotPasswordView.navigationOptions}*/}
			{/*/>*/}
		</Outside.Navigator>
	);
};

// OutsideStackModal
const OutsideModal = createStackNavigator();
const OutsideStackModal = () => {
	const { theme } = React.useContext(ThemeContext);

	return (
		<OutsideModal.Navigator mode='modal' screenOptions={{ ...outsideHeader, ...themedHeader(theme), ...ModalAnimation }}>
			<OutsideModal.Screen
				name='OutsideStack'
				component={OutsideStack}
				options={{ headerShown: false }}
			/>
			{/*<OutsideModal.Screen*/}
			{/*	name='AuthenticationWebView'*/}
			{/*	component={AuthenticationWebView}*/}
			{/*	options={AuthenticationWebView.navigationOptions}*/}
			{/*/>*/}
		</OutsideModal.Navigator>
	);
};

export default OutsideStackModal;

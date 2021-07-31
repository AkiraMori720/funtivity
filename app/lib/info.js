import { Alert } from 'react-native';
import { LISTENER } from '../containers/Toast';
import EventEmitter from '../utils/events';

export const showErrorAlert = (message, title, onPress = () => {}) => Alert.alert(title, message, [{ text: 'OK', onPress }], { cancelable: true });

export const showToast = (message)=>EventEmitter.emit(LISTENER, {message: message});

export const showConfirmationAlert = ({ title, message, callToAction, onPress }) => (
	Alert.alert(
		title??'Are you sure question mark',
		message,
		[
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: callToAction,
				style: 'destructive',
				onPress
			}
		],
		{ cancelable: false }
	)
);

import React from 'react';
import PropTypes from 'prop-types';

import { isIOS } from '../../utils/deviceInfo';
import I18n from '../../i18n';
import Container from './HeaderButtonContainer';
import Item from './HeaderButtonItem';

// Left
export const Drawer = React.memo(({ navigation, testID, ...props }) => (
	<Container left>
		<Item iconName='menu' vector={'MaterialCommunityIcons'} onPress={navigation.toggleDrawer} testID={testID} {...props} />
	</Container>
));

export const CloseButtonGoTop = React.memo(({ navigation, testID }) => (
	<Container left>
		<Item title='close' iconName='close' onPress={() => navigation.pop()} testID={testID} />
	</Container>
));

export const CloseGoSignIn = React.memo(({ navigation, testID }) => (
	<Container left>
		<Item title='close' iconName='close' onPress={() => navigation.replace('LoginView')} testID={testID} />
	</Container>
));

export const CloseModal = React.memo(({
	navigation, testID, onPress = () => navigation.pop(), ...props
}) => (
	<Container left>
		<Item iconName='close' onPress={onPress} testID={testID} {...props} />
	</Container>
));

export const CancelModal = React.memo(({ onPress, testID }) => (
	<Container left>
		{isIOS
			? <Item title={I18n.t('Cancel')} onPress={onPress} testID={testID} />
			: <Item iconName='close' onPress={onPress} testID={testID} />
		}
	</Container>
));

// Right
export const Favorite = React.memo(({ onPress, testID }) => (
	<Container>
		<Item iconName='flag' vector='Ionicons' size={20} onPress={onPress} testID={testID} />
	</Container>
));

export const Edit = React.memo(({ onPress, testID, ...props }) => (
	<Container>
		<Item iconName='edit' vector='MaterialIcons' onPress={onPress} testID={testID} {...props} />
	</Container>
));

export const ProfilePreferences = React.memo(({ navigation, testID, ...props }) => (
	<Container>
		<Item iconName='notifications' vector='Ionicons' size={20} onPress={() => navigation.replace('Notification')} testID={testID} {...props} />
		<Item iconName='ios-settings-sharp' vector='Ionicons'  size={20} onPress={() => navigation.replace('Setting')} testID={testID} {...props} />
	</Container>
));

Drawer.propTypes = {
	navigation: PropTypes.object.isRequired,
	testID: PropTypes.string.isRequired
};
CloseButtonGoTop.propTypes = {
	navigation: PropTypes.object.isRequired,
	testID: PropTypes.string.isRequired,
};
CloseGoSignIn.propTypes = {
	navigation: PropTypes.object.isRequired,
	testID: PropTypes.string.isRequired,
};
CloseModal.propTypes = {
	navigation: PropTypes.object.isRequired,
	testID: PropTypes.string.isRequired,
	onPress: PropTypes.func
};
CancelModal.propTypes = {
	onPress: PropTypes.func.isRequired,
	testID: PropTypes.string.isRequired
};
Favorite.propTypes = {
	onPress: PropTypes.func.isRequired,
	testID: PropTypes.string.isRequired
};
Edit.propTypes = {
	onPress: PropTypes.func.isRequired,
	testID: PropTypes.string.isRequired
};
ProfilePreferences.propTypes = {
	onPress: PropTypes.func.isRequired,
	testID: PropTypes.string.isRequired
};

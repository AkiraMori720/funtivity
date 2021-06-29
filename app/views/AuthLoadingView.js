import React from 'react';
import {
	View, StyleSheet, ActivityIndicator, Image
} from 'react-native';
import PropTypes from 'prop-types';

import StatusBar from '../containers/StatusBar';
import { withTheme } from '../theme';
import { themes } from '../constants/colors';

import sharedStyles from './Styles';
import images from "../assets/images";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		height: 200,
		width: 200,
		resizeMode: 'contain',
		marginBottom: 40
	},
	text: {
		fontSize: 16,
		paddingTop: 10,
		...sharedStyles.textRegular,
		...sharedStyles.textAlignCenter
	}
});

const AuthLoadingView = React.memo(({ theme }) => (
	<View style={[styles.container, { backgroundColor: themes[theme].focusedBackground }]}>
		<StatusBar />
		<View>
			<Image source={images.logo} style={styles.logo}/>
			<ActivityIndicator color={themes[theme].actionColor} size='large' />
		</View>
	</View>
));

AuthLoadingView.propTypes = {
	theme: PropTypes.string
};

export default withTheme(AuthLoadingView);

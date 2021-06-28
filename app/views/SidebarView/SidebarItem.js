import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

const Item = React.memo(({
	id, left, text, onPress, current
}) => (
	<RectButton
		key={id}
		onPress={onPress}
		underlayColor='#292E35'
		activeOpacity={0.1}
		style={[styles.item, current && styles.itemCurrent]}
	>
		<View style={styles.itemLeft}>
			{left}
		</View>

		<View style={styles.itemCenter}>
			<Text style={styles.itemText} numberOfLines={2} ellipsizeMode={'tail'}>
				{text}
			</Text>
		</View>
	</RectButton>
));

Item.propTypes = {
	left: PropTypes.element,
	text: PropTypes.string,
	current: PropTypes.bool,
	onPress: PropTypes.func,
	testID: PropTypes.string,
	showSort: PropTypes.bool
};

export default Item;

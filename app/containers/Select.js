import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';

import sharedStyles from '../views/Styles';
import { themes } from '../constants/colors';
import { isAndroid, isIOS } from '../utils/deviceInfo';
import ActivityIndicator from './ActivityIndicator';
import {VectorIcon} from "./VectorIcon";

const styles = StyleSheet.create({
	iosPadding: {
		height: 48,
		justifyContent: 'center',
	},
	viewContainer: {
		marginBottom: 8,
		paddingHorizontal: 8,
		borderWidth: 1,
		borderRadius: 4,
		justifyContent: 'center'
	},
	pickerText: {
		...sharedStyles.textRegular,
		fontSize: 16,
		paddingVertical: 6
	},
	icon: {
		right: 16
	},
	iosIcon: {
		paddingVertical: 10
	},
	loading: {
		padding: 0
	}
});

export const Select = ({
	options = [],
	placeholder,
	onChange,
	loading,
	disabled,
	value: initialValue,
	theme
}) => {
	const [selected, setSelected] = useState(!Array.isArray(initialValue) && (initialValue === 0?-1:initialValue));
	const items = options.map(option => ({ label: option.text, value: (option.value ===0)?-1:option.value }));
	const pickerStyle = {
		...styles.viewContainer,
		...(isIOS ? styles.iosPadding : {}),
		borderColor: themes[theme].separatorColor,
		backgroundColor: themes[theme].backgroundColor
	};

	const Icon = () => (
		loading
			? <ActivityIndicator style={styles.loading} />
			: <VectorIcon size={12} name='chevron-down' type={'Iconic'} style={isAndroid ? styles.icon:styles.iosIcon} color={themes[theme].auxiliaryText} />
	);

	return (
		<RNPickerSelect
			items={items}
			placeholder={placeholder ? { label: placeholder, value: null } : {}}
			useNativeAndroidPickerStyle={false}
			value={selected}
			disabled={disabled}
			onValueChange={(value) => {
				setSelected(value);
				onChange(value === -1?0:value);
			}}
			style={{
				viewContainer: pickerStyle,
				inputAndroidContainer: pickerStyle
			}}
			Icon={Icon}
			textInputProps={{ style: { ...styles.pickerText, color: selected ? themes[theme].titleText : themes[theme].auxiliaryText } }}
		/>
	);
};
Select.propTypes = {
	options: PropTypes.array,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	value: PropTypes.array,
	theme: PropTypes.string
};

import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import FontAwesome from "react-native-vector-icons/FontAwesome";
import {COLOR_ORANGE} from "../../constants/colors";

const Index = React.memo(({ title, checked, textStyle, containerStyle, onPress }) => (
    <TouchableOpacity
        style={{ ...containerStyle, flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}
        onPress={onPress}
    >
        <FontAwesome name={checked ? 'check-square-o' : 'square-o'} size={24} color={checked?COLOR_ORANGE:'black'} />
        { title ? <Text style={{ marginLeft: 8, ...textStyle }}>{title}</Text> : null }
    </TouchableOpacity>));

Index.propTypes = {
    title: PropTypes.string,
    checked: PropTypes.bool,
    checkedColor: PropTypes.string,
    unCheckedColor: PropTypes.string,
    checkedIcon: PropTypes.string,
    uncheckedIcon: PropTypes.string,
    textStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    onPress: PropTypes.func
};

export default Index;

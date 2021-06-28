import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {VectorIcon} from "../../containers/VectorIcon";

const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 4,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        marginHorizontal: 8
    },
    iconStyle: {
        margin: 4
    }
});

const NoMeetUp = ({ onPress }) => (
    <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <VectorIcon type={'Ionicons'} name={'search'} size={20} color={'gray'} style={styles.iconStyle}/>
            <Text style={styles.titleText}>No Meetup</Text>
        </TouchableOpacity>
    </View>
);

export default NoMeetUp;

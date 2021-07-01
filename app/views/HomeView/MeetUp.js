import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {themes} from "../../constants/colors";
import {DATE_TIME_STRING_FORMAT, dateToString} from "../../utils/datetime";
import {VectorIcon} from "../../containers/VectorIcon";

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        padding: 12,
        borderRadius: 8
    },
    header: {
        marginBottom: 8
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    captionText: {
        fontSize: 12,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainImage: {
        width: 240,
        height: 200
    },
    subImages: {
        marginLeft: 8,
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    subImage: {
        width: '100%',
        height: 96
    }
});

const MeetUp = ({ key, item, onPress, isEdit, onPressEdit, theme }) => (
    <TouchableOpacity key={key} style={[styles.container, {backgroundColor: themes[theme].focusedBackground}]} onPress={() => onPress(item)}>
        <View style={styles.header}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4}}>
                <Text style={[styles.titleText, {color: themes[theme].titleText}]}>{item.meetupName}</Text>
                { isEdit ? <TouchableOpacity onPress={onPressEdit}>
                    <VectorIcon type='MaterialIcons' name='edit' size={20} color={themes[theme].infoText}/>
                </TouchableOpacity>: null}
            </View>
            <Text style={[styles.captionText, {color: themes[theme].infoText}]}>{item.location} - {dateToString(item.date, DATE_TIME_STRING_FORMAT)}</Text>
        </View>
        <View style={styles.content}>
            <Image style={styles.mainImage} source={{uri: item.photoA}}/>
            <View style={styles.subImages}>
                {(item.photoB.length > 0) ? <Image style={styles.subImage} source={{uri: item.photoB}}/>: null}
                {(item.photoC.length > 0) ? <Image style={styles.subImage} source={{uri: item.photoC}}/>: null}
            </View>
        </View>
    </TouchableOpacity>
);

export default MeetUp;

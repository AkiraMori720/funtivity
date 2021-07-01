import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import {COLOR_BLUE, COLOR_WHITE, themes} from "../../constants/colors";
import {DATE_TIME_STRING_FORMAT, dateToString} from "../../utils/datetime";
import images from "../../assets/images";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        width: '90%',
        alignSelf: 'center',
        height: 400,
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
        height: 200,
        marginLeft: 8,
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    subImage: {
        width: '100%',
        height: 96
    },
    btnContainer: {
        width: '100%',
        backgroundColor: COLOR_BLUE
    },
    btnText: {
        marginVertical: 12,
        color: COLOR_WHITE,
        textAlign: 'center'
    },
    ownerContainer: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24
    },
    ownerContent: {
        marginLeft: 8
    },
    ownerName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    ownerCaption: {

    }
});

const ReviewMeetup = ({ meetup, onPressCancel, onPressOwner, theme }) => (
    <View style={styles.container}>
        <View style={[styles.mainContainer, {backgroundColor: themes[theme].backgroundColor}]}>
            <View style={styles.header}>
                <Text style={[styles.titleText, {color: themes[theme].titleText}]}>{meetup.meetupName}</Text>
                <Text style={[styles.captionText, {color: themes[theme].infoText}]}>{meetup.location} - {dateToString(meetup.date, DATE_TIME_STRING_FORMAT)}</Text>
            </View>
            <View style={styles.content}>
                <Image style={styles.mainImage} source={{uri: meetup.photoA}}/>
                <View style={styles.subImages}>
                    {(meetup.photoB.length > 0) ? <Image style={styles.subImage} source={{uri: meetup.photoB}}/>: null}
                    {(meetup.photoC.length > 0) ? <Image style={styles.subImage} source={{uri: meetup.photoC}}/>: null}
                </View>
            </View>
            <View>
                <Text style={{color: themes[theme].infoText}}>{meetup.description}</Text>
            </View>
            <TouchableOpacity onPress={onPressOwner} style={styles.ownerContainer}>
                <Image source={meetup.owner.avatar?{uri: meetup.owner.avatar}:images.default_avatar} style={styles.avatar}/>
                <View style={styles.ownerContent}>
                    <Text style={[styles.ownerName, {color: themes[theme].actionColor}]}>{meetup.owner.firstName} {meetup.owner.lastName}</Text>
                    <Text style={[styles.ownerCaption, {color: themes[theme].infoText}]}>Meetup Creator</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContainer} onPress={onPressCancel}>
                <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export default ReviewMeetup;

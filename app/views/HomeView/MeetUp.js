import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    container: {

    },
    titleText: {

    },
    captionText: {

    },
    image: {

    }
});

const MeetUp = ({ key, item, onPress }) => (
    <TouchableOpacity key={key} style={styles.container} onPress={() => onPress(item)}>
        <View style={styles.header}>
            <Text style={styles.titleText}>Title</Text>
            <Text style={styles.captionText}>Caption</Text>
        </View>
        <View style={styles.content}>
            <Image style={styles.image} source={{}}/>
        </View>
    </TouchableOpacity>
);

export default MeetUp;

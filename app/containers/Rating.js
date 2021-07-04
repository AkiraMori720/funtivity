import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import images from "../assets/images";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    rateContainer: {
        marginHorizontal: 2
    },
    rateImage: {
        width: 20,
        height: 20
    }
})

export const Rating = ({initValue, onChangeRating}) => {
    const [rating, setRating] = useState(initValue);
    const onChangeValue = (value) => {
        onChangeRating(value);
        setRating(value);
    }
    return (
        <View style={styles.container}>
            {
                [0,1,2,3,4].map(i => (
                <TouchableOpacity onPress={() => onChangeValue(i+1)} style={styles.rateContainer}>
                    <Image source={i<rating?images.ic_rate_select:images.ic_rate_unselect} style={styles.rateImage}/>
                </TouchableOpacity>
                ))
            }
        </View>
    );
}

Rating.propTypes = {
    initValue: PropTypes.number,
    onChangeRating: PropTypes.func,
};

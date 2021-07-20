import React from 'react';
import PropTypes from "prop-types";
import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";

import {COLOR_BLACK, COLOR_BLUE, COLOR_WHITE, themes} from "../constants/colors";
import StatusBar from "../containers/StatusBar";
import SafeAreaView from "../containers/SafeAreaView";
import {withTheme} from "../theme";
import TextInput from "../containers/TextInput";
import {showErrorAlert, showToast} from "../lib/info";
import {connect} from "react-redux";
import scrollPersistTaps from "../utils/scrollPersistTaps";
import {Rating} from "../containers/Rating";
import ImagePicker from "react-native-image-crop-picker";
import firebaseSdk, {DB_ACTION_ADD} from "../lib/firebaseSdk";
import {checkCameraPermission, checkPhotosPermission} from "../utils/permissions";
import KeyboardView from "../containers/KeyboardView";
import sharedStyles from "./Styles";

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 20
    },
    rateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rateCaption: {

    },
    reviewCaption: {
        marginVertical: 12
    },
    btnContainer: {
        marginTop: 8,
        paddingVertical: 12,
    },
    btnText: {
        textAlign: 'center'
    },
    photoContainer: {
        marginTop: 12
    },
    photo: {
        resizeMode: 'contain',
        height: 200
    }
})

const imagePickerConfig = {
    cropping: false,
    compressImageQuality: 1.0,
    mediaType: 'photo',
    includeBase64: true
};

class ReviewView extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: 'Write Review'
    })

    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        const meetup = props.route.params?.meetup;
        this.state = {
            meetup,
            reviewText: '',
            rating: 0,
            image_path: null,
            isSaving: false
        }
    }

    onPickerPhoto = () => {
        Alert.alert(
            '',
            'Upload Photo',
            [
                {
                    text: "CANCEL", onPress: () => {
                    }
                },
                {
                    text: "TAKE A PHOTO", onPress: () => {
                        this.takePhoto();
                    }
                },
                {
                    text: "FROM GALLERY", onPress: () => {
                        this.chooseFromLibrary();
                    }
                },
            ]);
    }

    takePhoto = async () => {
        if(await checkCameraPermission()) {
            ImagePicker.openCamera(imagePickerConfig).then(image => {
                this.setState({image_path: image.path});
            });
        }
    }

    chooseFromLibrary = async () => {
        if(await checkPhotosPermission()) {
            ImagePicker.openPicker(imagePickerConfig).then(image => {
                this.setState({image_path: image.path});
            });
        }
    }

    isValid = () => {
        const {rating, reviewText} = this.state;
        if(rating === 0){
            showToast('Please tap a star to rate.');
            return false;
        }
        if(!reviewText.length){
            showToast('Please enter your message.');
            this.reviewTextInput.focus();
            return false;
        }
        return true;
    }

    onSave = () => {
        if(this.isValid()){
            const {user} = this.props;
            const {meetup, reviewText, rating, image_path} = this.state;

            this.setState({isSaving: true});
            let review = {
                userId: user.userId,
                rating: rating,
                message: reviewText,
                meetupId: meetup.id,
                photo: "",
                video: "",
                date: new Date()
            }
            if(image_path){
                firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, image_path)
                    .then(image_url => {
                        review.photo = image_url;
                        this.saveReview(review);
                    }).catch(err => {});
            } else {
                this.saveReview(review);
            }
        }
    }

    saveReview = (review) => {
        const {navigation} = this.props;
        firebaseSdk.setData(firebaseSdk.TBL_REVIEW, DB_ACTION_ADD, review)
            .then(() => {
                showToast('Success');
                this.setState({isSaving: false});
                navigation.pop();
            }).catch(() => {
                showErrorAlert('Failed.');
                this.setState({isSaving: false});
            })
    }

    render(){
        const {theme} = this.props;
        const {image_path, isSaving, rating} = this.state;
        return (
            <KeyboardView
                contentContainerStyle={[sharedStyles.containera, {backgroundColor: themes[theme].backgroundColor}]}
                keyboardVerticalOffset={128}
            >
                <StatusBar/>
                <ScrollView {...scrollPersistTaps} style={styles.container}>
                    <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                        <View style={styles.rateContainer}>
                            <Text style={[styles.rateCaption, {color: themes[theme].controlText}]}>Tap a star to rate</Text>
                            <Rating
                                value={rating}
                                onChangeRating={(value) => this.setState({rating: value})}
                            />
                        </View>
                        <Text style={[styles.reviewCaption, {color: themes[theme].actionColor}]}>Write a review</Text>
                        <TextInput
                            inputRef={e => this.reviewTextInput = e}
                            placeholder={'Please enter text...'}
                            returnKeyType='send'
                            keyboardType='twitter'
                            textContentType='oneTimeCode'
                            inputStyle={{height: 120, fontSize: 14, textAlignVertical: 'top'}}
                            multiline={true}
                            onChangeText={value => this.setState({reviewText: value.trim()})}
                            theme={theme}
                        />
                        <View style={styles.photoContainer}>
                            <Image source={{uri: image_path}} style={styles.photo} resizeMethod={"scale"}/>
                            <TouchableOpacity style={[styles.btnContainer, {borderStyle: "dashed", borderWidth: 1}]} onPress={this.onPickerPhoto}>
                               <Text style={[styles.btnText, {color: COLOR_BLACK}]}>Tap to Upload Photo</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={[styles.btnContainer, {backgroundColor: COLOR_BLUE}]} onPress={this.onSave}>
                            {isSaving ? <ActivityIndicator color={themes[theme].actionColor} /> : <Text style={[styles.btnText, {color: COLOR_WHITE}]}>Save</Text>}
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(ReviewView));

import React from 'react';
import PropTypes from 'prop-types';


import {withTheme} from "../../theme";
import TextInput from '../../containers/TextInput';
import KeyboardView from "../../containers/KeyboardView";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import styles from "./styles";
import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Button from "../../containers/Button";
import {withActionSheet} from "../../containers/ActionSheet";
import ImagePicker from "react-native-image-crop-picker";
import images from "../../assets/images";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import SafeAreaView from "../../containers/SafeAreaView";

const imagePickerConfig = {
    cropping: true,
    compressImageQuality: 0.8,
    enableRotationGesture: true,
    avoidEmptySpaceAroundImage: false,
    cropperChooseText: 'Choose',
    cropperCancelText: 'Cancel',
    mediaType: 'photo',
    includeBase64: true
};

class ProfileEditView extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Edit Profile'
    })

    static propTypes = {
        navigation: PropTypes.object,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            image_path: null,
            first_name: '',
            last_name: '',
            interests: '',
            location: '',
            age: null,
            bio: '',
            isLoading: false,
        }
    }

    takePhoto = () => {
        ImagePicker.openCamera(imagePickerConfig).then(image => {
            this.setState({image_path: image.path});
        });
    }

    chooseFromLibrary = () => {
        ImagePicker.openPicker(imagePickerConfig).then(image => {
            this.setState({image_path: image.path});
        });
    }

    toggleAction = () => {
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

    onGoToSignIn = () => {
        const {navigation} = this.props;
        navigation.pop();
    }

    render(){
        const {theme} = this.props;
        const {image_path, first_name, last_name, interests, location, age, bio, isLoading} = this.state;
        return (
            <KeyboardView
                style={{ backgroundColor: themes[theme].backgroundColor}}
                contentContainerStyle={sharedStyles.container}
                keyboardVerticalOffset={128}
            >
                <StatusBar/>
                <ScrollView contentContainerStyle={{flexGrow: 1}} {...scrollPersistTaps}>
                    <SafeAreaView>
                        <View style={[sharedStyles.headerContainer, {height: 160, backgroundColor: themes[theme].headerBackground}]}>
                            <TouchableOpacity onPress={this.toggleAction}>
                                <Image style={styles.logo} source={image_path?{uri: image_path}:images.img_upload}/>
                                <Text style={[sharedStyles.link, {color: 'white', marginTop: 12, fontWeight: 'normal', textAlign: 'center'}]}>Upload Photo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formContainer}>
                            <TextInput
                                inputRef={(e) => {
                                    this.firstNameInput = e;
                                }}
                                value={first_name}
                                placeholder={'First Name'}
                                returnKeyType='next'
                                keyboardType='twitter'
                                onChangeText={value => this.setState({first_name: value})}
                                onSubmitEditing={() => {
                                    this.lastInput.focus();
                                }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.lastInput = e;
                                }}
                                value={last_name}
                                placeholder={'Last Name'}
                                returnKeyType='next'
                                keyboardType='twitter'
                                onChangeText={value => this.setState({last_name: value})}
                                onSubmitEditing={() => {
                                    this.interestsInput.focus();
                                }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.interestsInput = e;
                                }}
                                value={interests}
                                placeholder={'Interests'}
                                returnKeyType='next'
                                keyboardType='twitter'
                                onChangeText={interests => this.setState({interests})}
                                onSubmitEditing={() => {
                                    this.locationInput.focus();
                                }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.locationInput = e;
                                }}
                                value={location}
                                placeholder={'Location'}
                                returnKeyType='next'
                                keyboardType='twitter'
                                onChangeText={location => this.setState({location})}
                                onSubmitEditing={() => {
                                    this.ageInput.focus();
                                }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.ageInput = e;
                                }}
                                value={age}
                                placeholder={'Age'}
                                returnKeyType='next'
                                keyboardType='Numeric'
                                onChangeText={age => this.setState({age: age.replace(/\D/gm, '')})}
                                onSubmitEditing={() => {
                                    this.bioInput.focus();
                                }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.bioInput = e;
                                }}
                                value={bio}
                                placeholder={'Bio'}
                                returnKeyType='send'
                                keyboardType='twitter'
                                onChangeText={bio => this.setState({bio})}
                                theme={theme}
                            />
                            <Button
                                style={styles.submitBtn}
                                title={'Save'}
                                type='primary'
                                size='W'
                                onPress={this.submit}
                                testID='login-view-submit'
                                loading={isLoading}
                                theme={theme}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardView>
        );
    }
}

export default withTheme(ProfileEditView);

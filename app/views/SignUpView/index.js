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

class SingUpView extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Sign Up'
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
            email: '',
            password: '',
            password_confirm: '',
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
        const {image_path, isLoading} = this.state;
        return (
            <KeyboardView
                style={{backgroundColor: themes[theme].backgroundColor}}
                contentContainerStyle={sharedStyles.container}
                keyboardVerticalOffset={128}
            >
                <StatusBar/>
                <ScrollView contentContainerStyle={{flexGrow: 1}} {...scrollPersistTaps}>
                    <SafeAreaView>
                        <View style={[sharedStyles.headerContainer, {height: 160, backgroundColor: themes[theme].headerBackground}]}>
                            <TouchableOpacity onPress={this.toggleAction}>
                                <Image style={styles.logo} source={image_path?{uri: image_path}:images.img_upload}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formContainer}>
                            <TextInput
                                inputRef={(e) => {
                                    this.firstNameInput = e;
                                }}
                                placeholder={'First Name'}
                                returnKeyType='next'
                                keyboardType='twitter'
                                textContentType='oneTimeCode'
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
                                placeholder={'Last Name'}
                                returnKeyType='next'
                                keyboardType='twitter'
                                textContentType='oneTimeCode'
                                onChangeText={value => this.setState({last_name: value})}
                                onSubmitEditing={() => {
                                    this.emailInput.focus();
                                }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.emailInput = e;
                                }}
                                placeholder={'Email'}
                                returnKeyType='next'
                                keyboardType='email-address'
                                textContentType='oneTimeCode'
                                onChangeText={email => this.setState({email})}
                                onSubmitEditing={() => {
                                    this.passwordInput.focus();
                                }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.passwordInput = e;
                                }}
                                placeholder={'Password'}
                                returnKeyType='next'
                                secureTextEntry
                                textContentType='oneTimeCode'
                                onChangeText={value => this.setState({password: value})}
                                onSubmitEditing={() => { this.passwordConfirmInput.focus(); }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.passwordConfirmInput = e;
                                }}
                                placeholder={'Confirm Password'}
                                returnKeyType='send'
                                secureTextEntry
                                textContentType='oneTimeCode'
                                onChangeText={value => this.setState({password_confirm: value})}
                                theme={theme}
                            />
                            <Button
                                style={styles.submitBtn}
                                title={'Create Account'}
                                type='primary'
                                size='W'
                                onPress={this.submit}
                                testID='login-view-submit'
                                loading={isLoading}
                                theme={theme}
                            />
                            <View style={styles.bottomContainer}>
                                <Text style={{color: themes[theme].actionTintColor}}>Already have an account? </Text>
                                <Text style={{...sharedStyles.link, color: themes[theme].actionTintColor}}
                                      onPress={this.onGoToSignIn}> Sign In</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardView>
        );
    }
}

export default withTheme(SingUpView);

import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";

import {withTheme} from "../../theme";
import TextInput from '../../containers/TextInput';
import KeyboardView from "../../containers/KeyboardView";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import styles from "./styles";
import Button from "../../containers/Button";
import ImagePicker from "react-native-image-crop-picker";
import images from "../../assets/images";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import SafeAreaView from "../../containers/SafeAreaView";
import {showErrorAlert, showToast} from "../../lib/info";
import firebaseSdk, {DB_ACTION_UPDATE} from "../../lib/firebaseSdk";
import {setUser as setUserAction} from "../../actions/login";
import {checkCameraPermission, checkPhotosPermission} from "../../utils/permissions";

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
        user: PropTypes.object,
        setUser: PropTypes.func,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            image_path: null,
            first_name: props.user.firstName,
            last_name: props.user.lastName,
            interests: props.user.interests??'',
            location: props.user.address??'',
            age: props.user.age.toString(),
            bio: props.user.bio??'',
            isLoading: false,
        }
    }

    takePhoto = async () => {
        if(await checkCameraPermission()){
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

    isValid = () => {
        const {first_name, last_name, interests, location, age, bio} = this.state;
        if(!first_name.length){
            showToast('Please enter your first name.');
            this.emailInput.focus();
            return false;
        }
        if(!last_name.length){
            showToast('Please enter your last name.');
            this.lastInput.focus();
            return false;
        }
        if(!interests.length){
            showToast('Please enter your interests.');
            this.interestsInput.focus();
            return false;
        }
        if(!location.length){
            showToast('Please enter your location.');
            this.locationInput.focus();
            return false;
        }
        if(!age){
            showToast('Please enter your age.');
            this.ageInput.focus();
            return false;
        }
        if(!bio.length){
            showToast('Please enter your bio.');
            this.bioInput.focus();
            return false;
        }
        return true;
    }

    onSubmit = () => {
        if(this.isValid()){
            const {image_path} = this.state;
            this.setState({isLoading: true});
            if(image_path){
                firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_AVATAR, image_path).then(image_url => {
                    this.saveUser(image_url);
                }).catch((err) => {
                    showErrorAlert(err, 'Error');
                    this.setState({isLoading: false});
                })
            } else {
                this.saveUser();
            }
        }
    }

    saveUser = (image_url = null) => {
        const {user, navigation, setUser} = this.props;
        const {first_name, last_name, interests, location, age, bio} = this.state;

        let userInfo = {
            id: user.id,
            firstName: first_name,
            lastName: last_name,
            interests: interests,
            address: location,
            age: Number(age),
            bio: bio
        }

        if(image_url){
            userInfo = {...userInfo, avatar: image_url};
        }

        firebaseSdk.setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, userInfo)
            .then(() => {
                showToast('Success');
                this.setState({isLoading: false});
                const updateUser = {...user, ...userInfo};
                setUser(updateUser);
                navigation.pop();
            })
            .catch(err => {
                showToast(err.message);
                this.setState({isLoading: false});
            })
    }

    render(){
        const {user, theme} = this.props;
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
                                <Image style={styles.logo} source={image_path?{uri: image_path}:(user.avatar?{uri: user.avatar}:images.img_upload)}/>
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
                                keyboardType='numeric'
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
                                onPress={this.onSubmit}
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

const mapStateToProps = state => ({
    user: state.login.user
})

const mapDispatchToProps = dispatch =>({
    setUser: params => dispatch(setUserAction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ProfileEditView));

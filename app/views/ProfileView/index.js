import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import {Alert, Image, Text, TouchableOpacity, View} from "react-native";
import images from "../../assets/images";
import styles from "./styles";
import {VectorIcon} from "../../containers/VectorIcon";
import ImagePicker from "react-native-image-crop-picker";

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

class ProfileView extends React.Component{
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            image_path: null,
        }

        this.options = [
            { id: 'activities', title: 'Activities', type: 'menu'},
            { id: 'outdoor_activities', title: 'Outdoor Activities', type: 'menu'},
            { id: 'all_joined_meetups', title: 'View All Joined Meetups', type: 'view'},
            { id: 'all_messages', title: 'View All Messages', type: 'view'},
        ]
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

    onSetAvatar = () => {
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

    onEditProfile = () => {
        const { navigation } = this.props;
        navigation.navigate('ProfileEdit');
    }

    onSelectTheme = () => {
        const { navigation } = this.props;
        navigation.navigate('Theme');
    }

    onClickOption = (option) => {
        const { navigation } = this.props;
        switch (option.id){
            case 'activities':
                navigation.navigate('Activities');
                break;
            case 'outdoor_activities':
                navigation.navigate('OutDoorActivities');
                break;
            case 'all_joined_meetups':
                navigation.navigate('AllMeetup');
                break;
            case 'all_messages':
                navigation.navigate('Message');
                break;
        }
    }

    render(){
        const {theme} = this.props;
        const {image_path} = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Image source={image_path?{uri: image_path}:images.default_avatar} style={styles.avatar}/>
                        <TouchableOpacity onPress={this.onEditProfile} style={styles.editAction}>
                            <Image source={images.edit_profile} style={styles.actionImage}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSetAvatar} style={styles.setAvatarAction}>
                            <Image source={images.img_camera} style={styles.actionImage}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onSelectTheme} style={styles.selectThemeAction}>
                            <Image source={images.img_theme} style={styles.actionImage}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.profileEmail}>Email</Text>
                    <Text style={styles.profileName}>No Name</Text>
                </View>
                <View style={styles.options}>
                    {
                        this.options.map(o => {
                            if(o.type === 'menu'){
                                return (<TouchableOpacity onPress={() => this.onClickOption(o)} style={[styles.optionContainer, {borderBottomColor: themes[theme].borderColor}]}>
                                    <Text style={styles.optionMenuTitle}>{o.title}</Text>
                                    <VectorIcon type={'Ionicons'} name={'md-ellipsis-vertical-sharp'} size={20} color={'gray'}/>
                                </TouchableOpacity>);
                            }
                            return (<TouchableOpacity onPress={() => this.onClickOption(o)} style={[styles.optionContainer, {backgroundColor: themes[theme].auxiliaryTintColor, borderBottomColor: 'white'}]}>
                                <Text style={styles.optionViewTitle}>{o.title}</Text>
                                <VectorIcon type={'Ionicons'} name={'md-chevron-forward'} size={20} color={'white'}/>
                            </TouchableOpacity>);
                        })
                    }
                </View>
            </SafeAreaView>
        )
    }
}

export default withTheme(ProfileView);

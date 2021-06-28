import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import styles from './styles';
import images from "../../assets/images";
import * as HeaderButton from "../../containers/HeaderButton";

class AccountView extends React.Component {
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            account: {
                id: null,
            }
        }
        this.setHeader();
    }

    setHeader = () => {
        const {navigation} = this.props;
        navigation.setOptions({
            title: 'Profile',
            headerRight: () => <HeaderButton.Favorite onPress={this.onFavorite}/>
        })
    }

    onFavorite = () => {

    }

    removeFriend = () => {

    }

    sendMessage = () => {

    }

    render() {
        const {theme} = this.props;
        const {account} = this.state;
        return (
            <SafeAreaView style={{backgroundColor: themes[theme].focusedBackground}}>
                <StatusBar/>
                <ImageBackground source={account.image_url ? {uri: account.image_url} : images.default_avatar}
                                 style={styles.headerContainer}>
                    <View style={styles.headerBackground}/>
                    <Image source={account.image_url ? {uri: account.image_url} : images.default_avatar}
                           style={styles.accountImage}/>
                    <Text style={styles.accountEmail}>Email</Text>
                    <Text style={styles.accountName}>Name</Text>
                    <Text style={styles.accountAddress}>Full Address</Text>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity onPress={this.removeFriend}>
                            <ImageBackground source={images.bg_gray_button} style={styles.accountAction} imageStyle={{borderRadius: 20}}>
                                <Image source={images.add_to_friends} style={styles.actionImage}/>
                                <Text style={styles.actionText}>Remove Friends</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.sendMessage}>
                            <ImageBackground source={images.bg_gray_button} style={styles.accountAction} imageStyle={{borderRadius: 20}}>
                                <Image source={images.send_message} style={styles.actionImage}/>
                                <Text style={styles.actionText}>Send a Message</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.option}>
                    <Text style={styles.optionTitle}>Interests</Text>
                    <Text style={styles.optionContent}>Hunt, Bird</Text>
                </View>
                <View style={styles.option}>
                    <Text style={styles.optionTitle}>Interests</Text>
                    <Text style={styles.optionContent}>Hunt, Bird</Text>
                </View>
            </SafeAreaView>
        )
    }
}

export default withTheme(AccountView);

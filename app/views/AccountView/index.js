import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";

import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import styles from './styles';
import images from "../../assets/images";
import * as HeaderButton from "../../containers/HeaderButton";
import firebaseSdk from "../../lib/firebaseSdk";
import {showErrorAlert} from "../../lib/info";
import {getActivities} from "../../utils/const";

class AccountView extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        const userId = props.route.params?.userId;
        const isFriend = props.user.friends.includes(userId);
        this.state = {
            account: {
                userId: userId,
            },
            isFriend
        }
        this.setHeader();
        this.init();
    }

    init = () => {
        const { navigation } = this.props;
        firebaseSdk.getUser(this.state.account.userId)
            .then(user => {
                this.setState({account: user});
            })
            .catch(err => {
                showErrorAlert('User not found.', '', () => navigation.pop());
            })
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

    toogleFriend = () => {

    }

    sendMessage = () => {

    }

    render() {
        const {theme} = this.props;
        const {isFriend, account} = this.state;
        return (
            <SafeAreaView style={{backgroundColor: themes[theme].focusedBackground}}>
                <StatusBar/>
                <ImageBackground source={account.avatar ? {uri: account.avatar} : images.default_avatar}
                                 style={styles.headerContainer}>
                    <View style={styles.headerBackground}/>
                    <Image source={account.avatar ? {uri: account.avatar} : images.default_avatar}
                           style={styles.accountImage}/>
                    <Text style={styles.accountEmail}>{account.email??'Email'}</Text>
                    <Text style={styles.accountName}>{account.firstName?(account.firstName +  account.lastName):'Name'}</Text>
                    <Text style={styles.accountAddress}>{account.address??'Full Address'}</Text>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity onPress={this.toogleFriend}>
                            <ImageBackground source={images.bg_gray_button} style={styles.accountAction} imageStyle={{borderRadius: 20}}>
                                <Image source={images.add_to_friends} style={styles.actionImage}/>
                                <Text style={styles.actionText}>{isFriend?'Remove Friends':'Add to Friends'}</Text>
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
                    <Text style={styles.optionContent}>{account.interests}</Text>
                </View>
                <View style={styles.option}>
                    <Text style={styles.optionTitle}>Activities</Text>
                    <Text style={styles.optionContent}>{getActivities(account.activities)}</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(AccountView));

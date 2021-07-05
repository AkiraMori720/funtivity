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
import firebaseSdk, {
    DB_ACTION_ADD,
    DB_ACTION_DELETE, NOTIFICATION_STATE_ACCEPT,
    NOTIFICATION_STATE_PENDING, NOTIFICATION_STATE_REMOVE,
    NOTIFICATION_TYPE_FRIEND
} from "../../lib/firebaseSdk";
import {showErrorAlert} from "../../lib/info";
import {getActivities} from "../../utils/const";
import ActivityIndicator from "../../containers/ActivityIndicator";
import {setUser as setUserAction} from "../../actions/login";
import firestore from "@react-native-firebase/firestore";

class AccountView extends React.Component {
    static propTypes = {
        setUser: PropTypes.func,
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
            isFriend,
            loading: false,
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
        const {isFriend, account} = this.state;
        const {user, setUser} = this.props;
        this.setState({loading: true});
        firebaseSdk.updateFriends(user.id, account.id, isFriend?DB_ACTION_DELETE:DB_ACTION_ADD)
            .then(({myFriends, userFriends}) => {
                if(isFriend){
                    const notification = {
                        type: NOTIFICATION_TYPE_FRIEND,
                        state: NOTIFICATION_STATE_ACCEPT,
                        sender: user.userId,
                        receiver: account.userId,
                        meetupId: "",
                        message: `${user.firstName} ${user.lastName} sent friend request.`,
                        date: new Date()
                    }
                    firebaseSdk.registerNotification(notification, account.token).then(() => {}).catch((err) => {})
                } else if(account.token) {
                    const notification = {
                        type: NOTIFICATION_TYPE_FRIEND,
                        state: NOTIFICATION_STATE_REMOVE,
                        sender: user.userId,
                        receiver: account.userId,
                        meetupId: "",
                        message: `${user.firstName} ${user.lastName} has removed you as a friend.`,
                        date: new Date()
                    }
                    firebaseSdk.sendNotifications([account.token], notification);
                }
                setUser({friends: myFriends});
                const newAccount = {...account, friends: userFriends};
                const isFriend = myFriends.includes(account.userId);
                this.setState({account: newAccount, loading: false, isFriend});
            })
    }

    sendMessage = async () => {
        const {user, navigation} = this.props;
        const {account} = this.state;
        const roomSnaps = await firestore().collection(firebaseSdk.TBL_ROOM).get();
        let room = null;
        roomSnaps.forEach(doc => {
            const roomInfo = doc.data();
            if ((user.userId === roomInfo.sender && account.userId === roomInfo.receiver) ||
                (user.userId === roomInfo.receiver && account.userId === roomInfo.sender)) {
                room = {id: doc.id, ...roomInfo, account};
            }
        });
        console.log('room', room);
        if(!room){
            room = {
                sender: user.userId,
                receiver: account.userId,
                date: new Date(),
                lastMessage: "",
                confirmUser: ""
            }
            const roomDocRef = await firestore().collection(firebaseSdk.TBL_ROOM).add(room);
            const roomDoc = await roomDocRef.get();
            return navigation.navigate("Chat", {room: {id: roomDoc.id, ...roomDoc.data(), account}});
        }
        navigation.navigate('Chat', {room});
    }

    render() {
        const {theme} = this.props;
        const {isFriend, account, loading} = this.state;
        return (
            <SafeAreaView style={{backgroundColor: themes[theme].focusedBackground}}>
                <StatusBar/>
                {loading && <ActivityIndicator absolute theme={theme} size={'large'}/>}
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

const mapDispatchToProps = dispatch => ({
    setUser: params => dispatch(setUserAction(params))
})
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AccountView));

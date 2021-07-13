import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import * as HeaderButton from "../../containers/HeaderButton";
import styles from "./styles";
import {Image, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {DATE_TIME_STRING_FORMAT, dateToString} from "../../utils/datetime";
import images from "../../assets/images";
import MeetupModal from "../HomeView/MeetupModal";
import {connect} from "react-redux";
import {showErrorAlert, showToast} from "../../lib/info";
import firebaseSdk, {
    DB_ACTION_UPDATE, NOTIFICATION_STATE_ACCEPT,
    NOTIFICATION_TYPE_FRIEND, NOTIFICATION_TYPE_MEET_UP,
    STATE_ACCEPTED,
    STATE_DECLINED,
    STATE_PENDING
} from "../../lib/firebaseSdk";
import firestore from "@react-native-firebase/firestore";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import {Rating} from "../../containers/Rating";

class MyMeetupView extends React.Component{
    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        const meetup = props.route.params?.meetup;
        this.state = {
            meetup: meetup,
            showModal: false,
            reviews: [],
            interestedUsers: [],
            joinUsers: []
        }
        this.setHeader();
        this.init();
    }

    init = async() => {
        const {meetup} = this.state;
        const meetupDoc = await firestore().collection(firebaseSdk.TBL_MEET_UP).doc(meetup.id).get();
        const meetupInfo = {id: meetup.id, ...meetupDoc.data()};

        const reviewSnaps = await firestore().collection(firebaseSdk.TBL_REVIEW).get();

        const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get();
        const users = {};
        userSnaps.forEach(s => users[s.data().userId] = s.data());

        let reviews = [];
        let interestedUsers = [];
        let joinUsers = [];

        reviewSnaps.forEach(doc => {
            const review = doc.data();
            if (review.meetupId === meetup.id) {
                const account = users[review.userId]??{};

                reviews.push({id: doc.id, ...review, account});
            }
        });
        reviews.sort((a, b) => b.date.seconds - a.date.seconds);
        meetupInfo.interestedUsers.forEach(i => {
            if (users[i]){
                interestedUsers.push(users[i]);
            }
        });
        meetupInfo.joinUsers.forEach(i => {
            const keys = i.split('-----');
            if (users[keys[0]]){
                joinUsers.push({...users[keys[0]], state: Number(keys[1])});
            }
        });

        console.log('interested and joined', interestedUsers, joinUsers);
        this.setState({meetup: meetupInfo, reviews, interestedUsers, joinUsers});
    }

    setHeader = () => {
        const {navigation} = this.props;
        navigation.setOptions({
            title: 'Funtivity',
            headerRight: () => <HeaderButton.Edit onPress={this.onEdit}/>
        });
    }

    onEdit = () => {
        this.setState({showModal: true});
    }

    onSuccess = () => {
        showToast('Success');
        this.setState({showModal: false});
    }

    onActionJoin = (account, state) => {
        const {meetup} = this.state;
        const {user} = this.props;
        const joinUsers = meetup.joinUsers.map(i => {
            const keys = i.split('-----');
            if (keys[0] === account.userId){
                return state === STATE_ACCEPTED?`${account.userId}-----${STATE_ACCEPTED}`:`${account.userId}-----${STATE_DECLINED}`;
            }
            return i;
        });
        firebaseSdk.setData(firebaseSdk.TBL_MEET_UP, DB_ACTION_UPDATE, {id: meetup.id, joinUsers})
            .then(() => {
                showToast('Success');
                const notification = {
                    type: NOTIFICATION_TYPE_MEET_UP,
                    state: state,
                    sender: user.userId,
                    receiver: account.userId,
                    meetupId: meetup.id,
                    message: `${user.firstName} ${user.lastName}` + (state===STATE_ACCEPTED?' accepted your join request.':' declined your join request'),
                    date: new Date()
                }
                firebaseSdk.registerNotification(notification, account.token).then(() => {}).catch((err) => {})
                this.init();
            })
            .catch(err => {
                showErrorAlert('Failed.');
            })
    }

    render(){
        const {user, theme} = this.props;
        const {showModal, meetup, joinUsers, interestedUsers, reviews} = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <ScrollView {...scrollPersistTaps} style={styles.container}>
                    <View style={styles.detail}>
                        <View style={styles.header}>
                            <Text style={[styles.titleText, {color: themes[theme].titleText}]}>{meetup.meetupName}</Text>
                            <Text style={[styles.captionText, {color: themes[theme].infoText}]}>{meetup.location} - {meetup.date?dateToString(meetup.date, DATE_TIME_STRING_FORMAT):null}</Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.mainImage} source={{uri: meetup.photoA}}/>
                            <View style={styles.subImages}>
                                {(meetup.photoB?.length > 0) ? <Image style={styles.subImage} source={{uri: meetup.photoB}}/>: null}
                                {(meetup.photoC?.length > 0) ? <Image style={styles.subImage} source={{uri: meetup.photoC}}/>: null}
                            </View>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={{color: themes[theme].infoText}}>{meetup.description}</Text>
                        </View>
                        <View style={styles.ownerContainer}>
                            <Image source={user.avatar?{uri: user.avatar}:images.default_avatar} style={styles.avatar}/>
                            <View style={styles.ownerContent}>
                                <Text style={[styles.ownerName, {color: themes[theme].actionColor}]}>{user.firstName} {user.lastName}</Text>
                                <Text style={[styles.ownerCaption, {color: themes[theme].infoText}]}>Meetup Creator</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.extension}>
                        <View style={styles.join}>
                            <View style={[styles.headerBar, {backgroundColor: themes[theme].headerBackground}]}><Text style={styles.headerTitle}>JOIN REQUESTS</Text></View>
                            <View style={styles.extensionContent}>
                                {
                                    joinUsers.map(j => (
                                        <View style={styles.userContainer}>
                                            <Image source={j.avatar?{uri: j.avatar}:images.default_avatar} style={styles.avatar}/>
                                            <View style={styles.userContent}>
                                                <Text style={[styles.userName, {color: themes[theme].textColor}]}>{j.firstName} {j.lastName}</Text>
                                                {
                                                    j.state === STATE_PENDING &&
                                                    <View style={styles.actionContainer}>
                                                        <TouchableOpacity onPress={() => this.onActionJoin(j, STATE_ACCEPTED)} style={styles.userAction}>
                                                            <Image source={images.ic_accept} style={styles.action}/>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => this.onActionJoin(j, STATE_DECLINED)} style={styles.userAction}>
                                                            <Image source={images.ic_close} style={styles.action}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={styles.interested}>
                            <View style={[styles.headerBar,{backgroundColor: themes[theme].headerBackground}]}><Text style={styles.headerTitle}>INTERESTED</Text></View>
                            <View style={styles.extensionContent}>
                                {
                                    interestedUsers.map(i => (
                                        <View style={styles.userContainer}>
                                            <Image source={i.avatar?{uri: i.avatar}:images.default_avatar} style={styles.avatar}/>
                                            <View style={styles.userContent}>
                                                <Text style={[styles.userName, {color: themes[theme].textColor}]}>{i.firstName} {i.lastName}</Text>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={styles.review}>
                            <View style={[styles.headerBar,{backgroundColor: themes[theme].headerBackground}]}><Text style={styles.headerTitle}>RATINGS AND REVIEWS</Text></View>
                            <View style={styles.extensionContent}>
                                {
                                    reviews.map((item, index) => (
                                        <View key={index} style={styles.itemContainer}>
                                            <View style={styles.itemContent}>
                                                <Image source={(item.account?.avatar) ? {uri: item.account?.avatar} : images.default_avatar}
                                                       style={styles.itemAccountImage}/>
                                                <View style={styles.itemHeader}>
                                                    <Text style={styles.itemTitle}>{item.account?.firstName} {item.account?.lastName}</Text>
                                                    <View style={styles.rateContainer}>
                                                        <Text style={styles.rating}>{(item.rating).toFixed(1)}</Text>
                                                        <Rating value={item.rating} size={16} changeable={false}/>
                                                    </View>
                                                    <Text style={[styles.itemMessage, {color: themes[theme].infoText}]}>{item.message}</Text>
                                                </View>
                                            </View>
                                            {(item.photo && item.photo.length > 0) ?
                                                <View style={styles.itemImageContainer}>
                                                    <Image source={{uri: item.photo}} style={styles.itemImage}/>
                                                </View> : null}
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        this.setState({showModal: false});
                    }}>
                    <MeetupModal
                        userId={user.userId}
                        meetup={meetup}
                        onSuccess={this.onSuccess}
                        onPressCancel={() => {
                            this.setState({showModal: false});
                        }}
                        theme={theme}
                    />
                </Modal>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})


export default connect(mapStateToProps, null)(withTheme(MyMeetupView));

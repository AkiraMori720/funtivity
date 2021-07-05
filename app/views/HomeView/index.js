import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FlatList, Image, Modal, RefreshControl, Text, TouchableOpacity, View} from "react-native";
import firestore from "@react-native-firebase/firestore";

import {COLOR_GRAY, COLOR_WHITE, themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import {withDimensions} from "../../dimensions";
import SearchBox from "../../containers/SearchBox";
import MeetUp from "./MeetUp";
import NoMeetUp from "./NoMeetUp";
import debounce from "../../utils/debounce";
import styles from "./styles";
import firebaseSdk, {
    DB_ACTION_UPDATE,
    NOTIFICATION_STATE_PENDING,
    NOTIFICATION_TYPE_MEET_UP,
    STATE_ACCEPTED,
    STATE_PENDING
} from "../../lib/firebaseSdk";
import ActivityIndicator from "../../containers/ActivityIndicator";
import ReviewMeetup from "./ReviewMeetup";
import images from "../../assets/images";
import MeetupModal from "./MeetupModal";
import {showErrorAlert, showToast} from "../../lib/info";
import moment from "moment";

class HomeView extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Funtivity'
    })

    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
        width: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.routes = [
            {key: 'all_meetup', title: 'ALL MEETUPS'},
            {key: 'private', title: 'PRIVATE'},
            {key: 'my_meetup', title: 'MY MEETUPS'},
        ];
        this.mounted = false;
        this.state = {
            curTab: 'all_meetup',
            text: '',
            data: [],
            searchData: [],
            showModal: false,
            showAddModal: false,
            editMeetup: null,
            reviewMeetup: null,
            refreshing: false,
            loading: true,
            notifying: false
        }
        this.unsubscribeFocus = props.navigation.addListener("focus", () => {
            if (this.state.reviewMeetup) {
                this.setState({showModal: true});
            }
        });
        this.init();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        if (this.unSubscribeMeetup) {
            this.unSubscribeMeetup();
        }
        if (this.unsubscribeFocus) {
            this.unsubscribeFocus();
        }
    }

    init = async () => {
        let meetupSubscribe = await firestore().collection(firebaseSdk.TBL_MEET_UP);
        this.unSubscribeMeetup = meetupSubscribe.onSnapshot(async (querySnapShot) => {
            const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get();
            const users = [];
            userSnaps.forEach(s => users.push(s.data()));

            let list = [];
            querySnapShot.forEach(doc => {
                const owner = users.find(u => u.userId === doc.data().userId);
                list.push({id: doc.id, ...doc.data(), owner});
            });
            list.sort((a, b) => b.date - a.date);
            if (this.mounted) {
                this.setState({data: list});
            } else {
                this.state.data = list;
            }
            this.search();
            console.log('list', list, users);
        })
    }

    onChangeTab = (tab) => {
        this.setState({curTab: tab, text: ''});
        this.search();
    }

    onSearchChangeText = (text) => {
        this.setState({text: text.trim()});
        this.search();
    };

    search = debounce(async () => {
        const {user} = this.props;
        const {text, data, curTab} = this.state;
        let searchData = data.filter(d => {

            // Search
            if (text.length > 0) {
                const key = (d.owner ? (d.owner.firstName + d.owner.lastName) : '') + d.meetupName + d.location;
                if (key.toLowerCase().indexOf(text.toLowerCase()) < 0) {
                    return false;
                }
            }

            // My Meetups
            if (curTab === 'my_meetup') {
                if (d.userId !== user.userId) {
                    return false;
                }
            } else {
                if (d.startAge > user.age || d.endAge < user.age || d.userId === user.userId || (d.kind === 1 && !user.friends.includes(d.userId))) {
                    return false;
                }
                if (curTab === 'private' && d.kind === 0) {
                    return false;
                }
            }

            return true;
        })
        console.log('searchData', searchData);
        this.setState({searchData, loading: false, refreshing: false});
    }, 200);

    onRefresh = () => {
        this.setState({refreshing: true});
        this.init();
    }

    onReload = () => {
        this.setState({loading: true});
        this.init();
    }

    onOpenMeetUp = (item) => {
        const {user, navigation} = this.props;
        const joinString = item.joinUsers.find(u => u.indexOf(user.userId) > -1);
        const interested = item.interestedUsers.includes(user.userId);
        const isAfter = moment(item.date.seconds * 1000).diff(moment()) > 0;
        let joinState = null;
        if (joinString) {
            const keys = joinString.split('-----');
            joinState = Number(keys[1]);
        }
        if (item.userId === user.userId) {
            navigation.navigate('MyMeetup', {meetup: item});
        } else if (!joinState || joinState === STATE_PENDING) {
            this.setState({showModal: true, reviewMeetup: {...item, interested, joinState, isAfter}});
        } else if (joinState === STATE_ACCEPTED) {
            navigation.navigate('MeetupDetail', {meetup: item});
        }
    }

    onAddMeetup = () => {
        // const {navigation} = this.props;
        // navigation.navigate('AddMeetup');
        this.setState({showAddModal: true});
    }

    onEditMeetup = (meetup) => {
        this.setState({showAddModal: true, editMeetup: meetup});
    }

    onInterested = () => {
        const {reviewMeetup} = this.state;
        const {user} = this.props;
        const notification = {
            type: NOTIFICATION_TYPE_MEET_UP,
            state: NOTIFICATION_STATE_PENDING,
            sender: user.userId,
            receiver: reviewMeetup.userId,
            meetupId: reviewMeetup.id,
            message: `${user.firstName} ${user.lastName} is interested in an event!`,
            date: new Date()
        };

        this.setState({notifying: true});
        const interestedUsers = [...reviewMeetup.interestedUsers, user.userId];

        console.log('notification', notification);
        firebaseSdk.setData(firebaseSdk.TBL_MEET_UP, DB_ACTION_UPDATE, {id: reviewMeetup.id, interestedUsers})
            .then(() => {
                this.setState({showModal: false, notifying: false});
                firebaseSdk.registerNotification(notification, reviewMeetup.owner?.token).then(() => {}).catch((err) => {console.log('err', err)});
            }).catch((err) => {
                showErrorAlert('Failed.');
            })
    }

    onSendRequest = () => {
        const {reviewMeetup} = this.state;
        const {user} = this.props;
        const notification = {
            type: NOTIFICATION_TYPE_MEET_UP,
            state: NOTIFICATION_STATE_PENDING,
            sender: user.userId,
            receiver: reviewMeetup.userId,
            meetupId: reviewMeetup.id,
            message: `${user.firstName} ${user.lastName} sent join request.`,
            date: new Date(),
        };

        this.setState({notifying: true});
        const joinString = `${user.userId}-----${STATE_PENDING}`;
        const joinUsers = [...reviewMeetup.joinUsers, joinString];

        console.log('notification', notification);
        firebaseSdk.setData(firebaseSdk.TBL_MEET_UP, DB_ACTION_UPDATE, {id: reviewMeetup.id, joinUsers})
            .then((res) => {
                this.setState({showModal: false, notifying: false});
                firebaseSdk.registerNotification(notification, reviewMeetup.owner?.token).then(() => {}).catch(() => {});
            }).catch((err) => {
                showErrorAlert('Failed.');
            })
    }

    onSuccess = () => {
        showToast('Success');
        this.setState({showAddModal: false, editMeetup: null});
    }

    renderFooter = () => {
        const {loading} = this.state;
        const {theme} = this.props;
        if (loading) {
            return <ActivityIndicator theme={theme} size={'large'}/>;
        }
        return null;
    }

    render() {
        const {user, theme} = this.props;
        const {
            text,
            curTab,
            searchData,
            notifying,
            loading,
            refreshing,
            showModal,
            reviewMeetup,
            showAddModal,
            editMeetup
        } = this.state;

        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                <StatusBar/>
                {notifying && <ActivityIndicator absolute theme={theme} size={'large'}/>}
                <TouchableOpacity onPress={this.onAddMeetup} style={styles.addMeetupBtn}>
                    <Image source={images.ic_add} style={styles.addImage}/>
                </TouchableOpacity>
                <View style={[styles.tabBar, {backgroundColor: themes[theme].navbarBackground}]}>
                    {
                        this.routes.map(r => (
                            <TouchableOpacity onPress={() => this.onChangeTab(r.key)} style={styles.tabContainer}>
                                <Text key={r.key} style={[styles.tabLabel, (r.key === curTab) ? {
                                    color: COLOR_WHITE,
                                    borderBottomColor: COLOR_WHITE,
                                    borderBottomWidth: 4
                                } : {color: COLOR_GRAY}]}>
                                    {r.title}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <SearchBox
                    value={text}
                    onChangeText={this.onSearchChangeText}
                    onSubmitEditing={this.search}
                    testID='federation-view-search'
                    placeholder={'Search'}
                />
                {((searchData.length > 0) || loading) ?
                    <FlatList
                        style={{flexGrow: 1, paddingHorizontal: 16}}
                        data={searchData}
                        renderItem={({item, index}) => <MeetUp key={index} item={item} onPress={this.onOpenMeetUp}
                                                               onPressEdit={() => this.onEditMeetup(item)}
                                                               isEdit={item.userId === user.userId} theme={theme}/>}
                        keyExtractor={item => item.id}
                        ListFooterComponent={this.renderFooter}
                        refreshControl={(
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this.onRefresh}
                                tintColor={themes[theme].actionColor}
                            />
                        )}
                    /> :
                    <NoMeetUp onPress={this.onReload}/>
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        this.setState({showModal: false, reviewMeetup: null});
                    }}>
                    <ReviewMeetup
                        meetup={reviewMeetup}
                        onPressInterested={this.onInterested}
                        onPressJoin={this.onSendRequest}
                        onPressOwner={() => {
                            const {navigation} = this.props;
                            navigation.navigate('Account', {userId: reviewMeetup.userId});
                            this.setState({showModal: false});
                        }}
                        onPressCancel={() => {
                            this.setState({showModal: false, reviewMeetup: null});
                        }}
                        theme={theme}
                    />
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showAddModal}
                    onRequestClose={() => {
                        this.setState({showAddModal: false, editMeetup: null});
                    }}>
                    <MeetupModal
                        userId={user.userId}
                        meetup={editMeetup}
                        onSuccess={this.onSuccess}
                        onPressCancel={() => {
                            this.setState({showAddModal: false, editMeetup: null});
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

export default connect(mapStateToProps, null)(withTheme(withDimensions(HomeView)));

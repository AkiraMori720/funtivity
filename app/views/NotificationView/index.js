import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from "react-native";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";

import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import ActivityIndicator from "../../containers/ActivityIndicator";
import firebaseSdk from "../../lib/firebaseSdk";
import images from "../../assets/images";
import {DATE_TIME_STRING_FORMAT} from "../../utils/datetime";
import styles from "./styles";

class NotificationView extends React.Component{
    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            loading: true,
        }
        this.mounted = false;
        this.init();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        if(this.unSubscribeNotification){
            this.unSubscribeNotification();
        }
    }

    init = async () => {
        const {user} = this.props;
        const notificationSubscribe = await firestore().collection(firebaseSdk.TBL_NOTIFICATION);
        this.unSubscribeNotification = notificationSubscribe.onSnapshot(async(querySnapShot) => {
            let list = [];
            querySnapShot.forEach(doc => {
                const notification = doc.data();
                if(notification.receiver === user.userId){
                    list.push({id: doc.id, ...notification});
                }
            });
            list.sort((a, b) => b.date.seconds - a.date.seconds);

            if(this.mounted){
                this.setState({data: list, refreshing: false, loading: false});
            } else {
                this.state.data = list;
                this.state.loading = false;
                this.state.refreshing = false;
            }
            console.log('list', list);
        })
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.init();
    }

    onPressItem = (item) => {
        const { navigation } = this.props;
        navigation.navigate('MyMeetup', {meetup: {id: item.meetupId}});
    }

    renderItem = ({item}) => {
        return (<TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.itemContainer}>
            <Image source={images.ic_done} style={styles.checkImage}/>
            <View style={styles.itemContent}>
                <Text style={styles.itemMessage}>{item.message}</Text>
                <Text style={styles.itemCaption}>Tap to go to Event Details</Text>
                <Text style={styles.itemTime}>{item.date?(moment(item.date.seconds * 1000).format(DATE_TIME_STRING_FORMAT)):''}</Text>
            </View>
        </TouchableOpacity>);
    }

    render(){
        const {theme} = this.props;
        const {data, refreshing, loading} = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                {loading && <ActivityIndicator absolute theme={theme} size={'large'}/>}
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    refreshControl={(
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            tintColor={themes[theme].actionColor}
                        />
                    )}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(NotificationView));

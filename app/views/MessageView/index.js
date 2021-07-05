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
import images from "../../assets/images";
import styles from "./styles";
import firebaseSdk from "../../lib/firebaseSdk";
import {DATE_TIME_STRING_FORMAT} from "../../utils/datetime";
import ActivityIndicator from "../../containers/ActivityIndicator";

class MessageView extends React.Component {
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
        if(this.unSubscribeRoom){
            this.unSubscribeRoom();
        }
    }

    init = async () => {
        const {user} = this.props;
        const roomSubscribe = await firestore().collection(firebaseSdk.TBL_ROOM);
        this.unSubscribeRoom = roomSubscribe.onSnapshot(async(querySnapShot) => {
            const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get();
            const users = [];
            userSnaps.forEach(s => users.push(s.data()));

            let list = [];
            querySnapShot.forEach(doc => {
                const room = doc.data();
                if(room.sender === user.userId || room.receiver === user.userId){
                    const receiver = users.find(u => u.userId === (room.sender === user.userId?room.receiver:room.sender));
                    const unread = room.confirmUser === user.userId;
                    list.push({id: doc.id, ...room, account: receiver, unread});
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
        navigation.navigate('Chat', {room: item});
    }

    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.itemContainer}>
            <Image source={(item.account?.avatar) ? {uri: item.account?.avatar} : images.default_avatar}
                   style={styles.itemImage}/>
            <View style={styles.itemContent}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.account?.firstName} {item.account?.lastName}</Text>
                    <Text style={styles.itemTime}>{moment(item.date.seconds * 1000).format(DATE_TIME_STRING_FORMAT)}</Text>
                </View>
                <View style={styles.itemFooter}>
                    <Text style={styles.itemMessage}>{item.lastMessage}</Text>
                    {item.unread && <Image source={images.ic_dot} style={styles.unread}/>}
                </View>
            </View>
        </TouchableOpacity>
    )

    render() {
        const {theme} = this.props;
        const {data, refreshing, loading} = this.state;
        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
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

export default connect(mapStateToProps, null)(withTheme(MessageView));

import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import firestore from "@react-native-firebase/firestore";
import {GiftedChat} from "react-native-gifted-chat";
import moment from "moment";

import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import styles from "./styles";
import images from "../../assets/images";
import firebaseSdk from "../../lib/firebaseSdk";
import {showErrorAlert} from "../../lib/info";

class ChatView extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        const room = props.route.params?.room;
        this.mounted = false;
        this.state = {
            loading: false,
            messages: [],
            room: room,
            inputText: ''
        }
        this.setHeader();
        this.init();
    }


    componentDidMount() {
        this.mounted = true;
        firebaseSdk.onOnline(this.state.room.id, this.props.user.userId);
    }

    async componentWillUnmount() {
        const {room} = this.state;
        const {user} = this.props;

        if(this.unSubscribeMessage){
            this.unSubscribeMessage();
        }
        try{
            await firestore().collection(firebaseSdk.TBL_ROOM).doc(room.id).update({confirmUser: ""});
            firebaseSdk.onOffline(room.id, user.userId);
        } catch (e) {
            console.log('leftRoom Error', e);
        }
    }

    setHeader = () => {
        const {navigation} = this.props;
        const {room} = this.state;
        navigation.setOptions({
            title: `${room.account?.firstName} ${room.account?.lastName}`
        });
    }

    init = async () => {
        const {room} = this.state;
        const {user} = this.props;
        await firestore().collection(firebaseSdk.TBL_ROOM).doc(room.id).update({confirmUser: ""});
        let meetupSubscribe = await firestore().collection(firebaseSdk.TBL_MESSAGE);
        this.unSubscribeMessage = meetupSubscribe.onSnapshot(async(querySnapShot) => {
            const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get();
            const users = [];
            userSnaps.forEach(s => users.push(s.data()));

            let list = [];
            querySnapShot.forEach(doc => {
                const message = doc.data();
                if(message.roomId === room.id){
                    list.push({
                        _id: doc.id,
                        text: message.message,
                        createdAt: moment(message.date.seconds * 1000),
                        user: (message.sender === user.userId?
                            {_id: user.userId, name: `${user.firstName} ${user.lastName}`, avatar: user.avatar}
                            :{_id: room.account.userId, name: `${room.account.firstName} ${room.account.lastName}`, avatar: room.account.avatar}
                        )
                    });
                }
            });

            list.sort((a, b) => b.createdAt - a.createdAt);
            if(this.mounted){
                this.setState({messages: list});
            } else {
                this.state.messages = list;
            }
        });
    }

    sendMessage = async() => {
        const {room, inputText} = this.state;
        const {user} = this.props;
        if(inputText.trim().length === 0){
            return;
        }
        let text = inputText.trim();
        this.setState({inputText: ''});
        try {
            let message = {
                    roomId: room.id,
                    message: text,
                    date: new Date(),
                    sender: user.userId,
                    receiver: room.account.userId
                };
            await firebaseSdk.saveMessage(room.id, message, room.account);
        }catch (e) {
            console.log('error', e);
            showErrorAlert('Sending Message Failed.');
        }
    }

    renderInput = () => {
        const {room, inputText} = this.state;
        if (room.block && room.block.length) {
            return (<View style={styles.inputContainer}>
                <Text>This room is blocked!</Text>
            </View>);
        }
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    ref={(r) => this.input = r}
                    value={inputText}
                    multiline
                    keyboardType='twitter'
                    placeholder='Enter Message here'
                    onChangeText={val => this.setState({inputText: val})}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.btnContainer} onPress={this.sendMessage}>
                    <Image source={images.ic_send} style={styles.sendBtn}/>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {user, theme} = this.props;
        const {messages} = this.state;
        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                <StatusBar/>
                <GiftedChat
                    messages={messages}
                    user={{
                        _id: user.userId,
                        name: `${user.firstName} ${user.lastName}`,
                        avatar: user.avatar??''
                    }}
                    infiniteScroll
                    wrapInSafeArea
                    isCustomViewBottom
                    minComposerHeight={28}
                    maxComposerHeight={500}
                    maxInputToolbarHeight={500}
                    renderInputToolbar={() => this.renderInput()}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(ChatView));

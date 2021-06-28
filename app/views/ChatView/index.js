import React from 'react';
import PropTypes from "prop-types";
import {GiftedChat} from "react-native-gifted-chat";

import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import images from "../../assets/images";

class ChatView extends React.Component{
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            messages: [],
            room: {},
            inputText: ''
        }
        this.setHeader();
    }

    setHeader = () => {
        const {navigation} = this.props;
        navigation.setOptions({
            title: 'Michelle Panerio'
        });
    }

    sendMessage = () => {

    }

    renderInput = () => {
        const { room, inputText } = this.state;
        if(room.block && room.block.length){
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
                { inputText.length > 0 ?
                    <TouchableOpacity style={styles.btnContainer} onPress={this.sendMessage}>
                        <Image source={images.ic_send} style={styles.sendBtn}/>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        )
    }

    render(){
        const {theme} = this.props;
        const {messages} = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <GiftedChat
                    messages={messages}
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

export default withTheme(ChatView);

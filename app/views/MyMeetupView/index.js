import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import * as HeaderButton from "../../containers/HeaderButton";
import styles from "./styles";
import {Image, Modal, Text, View} from "react-native";
import {DATE_TIME_STRING_FORMAT, dateToString} from "../../utils/datetime";
import images from "../../assets/images";
import MeetupModal from "../HomeView/MeetupModal";
import {connect} from "react-redux";
import {showToast} from "../../lib/info";

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
            showModal: false
        }
        this.setHeader();
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

    render(){
        const {user, theme} = this.props;
        const {showModal, meetup} = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <View style={styles.container}>
                    <View style={styles.detail}>
                        <View style={styles.header}>
                            <Text style={[styles.titleText, {color: themes[theme].titleText}]}>{meetup.meetupName}</Text>
                            <Text style={[styles.captionText, {color: themes[theme].infoText}]}>{meetup.location} - {dateToString(meetup.date, DATE_TIME_STRING_FORMAT)}</Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.mainImage} source={{uri: meetup.photoA}}/>
                            <View style={styles.subImages}>
                                {(meetup.photoB.length > 0) ? <Image style={styles.subImage} source={{uri: meetup.photoB}}/>: null}
                                {(meetup.photoC.length > 0) ? <Image style={styles.subImage} source={{uri: meetup.photoC}}/>: null}
                            </View>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={{color: themes[theme].infoText}}>{meetup.description}</Text>
                        </View>
                        <View style={styles.ownerContainer}>
                            <Image source={meetup.owner.avatar?{uri: meetup.owner.avatar}:images.default_avatar} style={styles.avatar}/>
                            <View style={styles.ownerContent}>
                                <Text style={[styles.ownerName, {color: themes[theme].actionColor}]}>{meetup.owner.firstName} {meetup.owner.lastName}</Text>
                                <Text style={[styles.ownerCaption, {color: themes[theme].infoText}]}>Meetup Creator</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.extension}>
                        <View style={styles.join}>
                            <View style={[styles.headerBar, {backgroundColor: themes[theme].headerBackground}]}><Text style={styles.headerTitle}>JOIN REQUESTS</Text></View>
                            <View style={styles.extensionContent}></View>
                        </View>
                        <View style={styles.interested}>
                            <View style={[styles.headerBar,{backgroundColor: themes[theme].headerBackground}]}><Text style={styles.headerTitle}>INTERESTED</Text></View>
                            <View style={styles.extensionContent}></View>
                        </View>
                    </View>
                </View>
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

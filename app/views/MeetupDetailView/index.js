import React from 'react';
import {connect} from "react-redux";
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';

import {themes} from "../../constants/colors";
import {withTheme} from "../../theme";
import SafeAreaView from "../../containers/SafeAreaView";
import StatusBar from "../../containers/StatusBar";
import sharedStyles from "../Styles";
import {DATE_TIME_STRING_FORMAT, dateToString} from "../../utils/datetime";
import images from "../../assets/images";
import styles from "./styles";
import PropTypes from "prop-types";
import * as HeaderButton from "../../containers/HeaderButton";
import firestore from "@react-native-firebase/firestore";
import firebaseSdk from "../../lib/firebaseSdk";
import moment from "moment";
import {Rating} from "../../containers/Rating";

class MeetupDetailView extends React.Component{
    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        const meetup = props.route.params?.meetup;
        this.state = {
            meetup: meetup,
            reviews: []
        }
        this.mounted = false;
        this.setHeader();
        this.init();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        if(this.unSubscribeReview){
            this.unSubscribeReview();
        }
    }

    init = async () => {
        const {meetup} = this.state;
        const reviewSubscribe = await firestore().collection(firebaseSdk.TBL_REVIEW);
        this.unSubscribeReview = reviewSubscribe.onSnapshot(async(querySnapShot) => {
            const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get();
            const users = [];
            userSnaps.forEach(s => users.push(s.data()));

            let list = [];
            querySnapShot.forEach(doc => {
                const review = doc.data();
                if(review.meetupId === meetup.id){
                    const account = users.find(u => u.userId === review.userId);

                    list.push({id: doc.id, ...review, account});
                }
            });
            list.sort((a, b) => b.date.seconds - a.date.seconds);

            if(this.mounted){
                this.setState({reviews: list, loading: false});
            } else {
                this.state.reviews = list;
                this.state.loading = false;
            }
            console.log('list', list);
        })
    }

    setHeader = () => {
        const {navigation} = this.props;
        navigation.setOptions({
            title: 'Funtivity',
            headerRight: () => <HeaderButton.Report onPress={this.onReport}/>
        });
    }

    onReport = () => {
        const {navigation} = this.props;
        const {meetup} = this.state;

        navigation.navigate('Report', {meetup});
    }

    onReview = () => {
        const {navigation} = this.props;
        const {meetup} = this.state;

        navigation.navigate('Review', {meetup});
    }

    renderReview = (item) => {

        return(<View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <Image source={(item.account?.avatar) ? {uri: item.account?.avatar} : images.default_avatar}
                       style={styles.itemAccountImage}/>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.account?.firstName} {item.account?.lastName}</Text>
                    <View style={styles.rateContainer}>
                        <Text style={styles.rating}>{item.rating}</Text>
                        <Rating initValue={item.rating} changeable={false}/>
                    </View>
                    <Text style={styles.itemMessage}>{item.message}</Text>
                </View>
            </View>
            {   item.photo &&
                <View style={styles.itemImage}>
                    <Image source={{uri: item.photo}} style={styles.itemImage}/>
                </View>}
        </View>);
    }

    render() {
        const {user, theme} = this.props;
        const {meetup, reviews} = this.state;
        return(
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <View style={styles.container}>
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
                </View>
                <View style={styles.extension}>
                    <View style={[styles.actionBar, {backgroundColor: themes[theme].headerBackground}]}>
                        <Text style={styles.headerTitle}>RATINGS AND REVIEWS</Text>
                        <TouchableOpacity onPress={this.onReview} style={styles.action}>
                            <Text style={styles.actionText}>Write Review</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={reviews}
                        renderItem={this.renderReview}
                        keyExtractor={item => item.id}
                        />
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(MeetupDetailView));

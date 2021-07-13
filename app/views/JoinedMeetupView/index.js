import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FlatList, RefreshControl} from "react-native";
import firestore from "@react-native-firebase/firestore";

import {themes} from "../../constants/colors";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import SearchBox from "../../containers/SearchBox";
import MeetUp from "../HomeView/MeetUp";
import NoMeetUp from "../HomeView/NoMeetUp";
import debounce from "../../utils/debounce";
import ActivityIndicator from "../../containers/ActivityIndicator";
import firebaseSdk, {STATE_ACCEPTED} from "../../lib/firebaseSdk";

class JoinedMeetupView extends React.Component {
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
        this.mounted = false;
        this.state = {
            text: '',
            data: [],
            searchData: [],
            refreshing: false,
            loading: true
        }
        this.init();
    }

    componentDidMount() {
        this.mounted = true;
    }

    init = async () => {
        const {user} = this.props;
        let querySnapShot = await firestore().collection(firebaseSdk.TBL_MEET_UP).get();

        const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get();
        const users = [];
        userSnaps.forEach(s => users.push(s.data()));

        let list = [];
        querySnapShot.forEach(doc => {
            const meetup = doc.data();
            if(meetup.joinUsers.find(u => {
                    if(u.indexOf(user.userId) > -1){
                        console.log('joined', u);
                        const keys = u.split('-----');
                        if(Number(keys[1]) === STATE_ACCEPTED){
                            return true;
                        }
                    }
                    return false;
                })
            ){
                const owner = users.find(u => u.userId === doc.data().userId);
                list.push({id: doc.id, ...meetup, owner});
            }
        });
        list.sort((a, b) => b.date - a.date);
        if (this.mounted) {
            this.setState({data: list});
        } else {
            this.state.data = list;
        }
        this.search();
        console.log('list', list, users);
    }

    onSearchChangeText = (text) => {
        this.setState({text: text.trim()});
        this.search();
    };

    search = debounce(async () => {
        const {text, data} = this.state;
        let searchData = data.filter(d => {

            // Search
            if (text.length > 0) {
                const key = (d.owner ? (d.owner.firstName + d.owner.lastName) : '') + d.meetupName + d.location;
                if (key.toLowerCase().indexOf(text.toLowerCase()) < 0) {
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
        const {navigation} = this.props;
        navigation.navigate('MeetupDetail', {meetup: item});
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
            searchData,
            loading,
            refreshing,
        } = this.state;

        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                <StatusBar/>
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
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(JoinedMeetupView));

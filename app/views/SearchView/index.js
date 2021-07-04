import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import firebase from "@react-native-firebase/app";
import {FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from "react-native";

import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import SearchBox from "../../containers/SearchBox";
import debounce from "../../utils/debounce";
import styles from "./styles";
import images from "../../assets/images";
import firestore from "@react-native-firebase/firestore";
import firebaseSdk, {DB_ACTION_ADD} from "../../lib/firebaseSdk";
import ActivityIndicator from "../../containers/ActivityIndicator";
import {showErrorAlert} from "../../lib/info";
import {setUser as setUserAction} from "../../actions/login";

class SearchView extends React.Component {
    static propTypes = {
        setUser: PropTypes.func,
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            text: '',
            data: [],
            refreshing: false,
            loading: true,
            adding: false,
        }
        this.init();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        if (this.unSubscribeUser) {
            this.unSubscribeUser();
        }
    }

    init = async () => {
        let userSubscribe = await firestore().collection(firebaseSdk.TBL_USER);
        this.unSubscribeUser = userSubscribe.onSnapshot(async (querySnapShot) => {
            let list = [];
            querySnapShot.forEach(doc => {
                const userInfo = {
                    id: doc.id,
                    ...doc.data()
                }
                list.push(userInfo);
            });

            if (this.mounted) {
                this.setState({data: list});
            } else {
                this.state.data = list;
            }
            this.search();
            console.log('users', list);
        })
    }

    onSearchChangeText = (text) => {
        this.setState({text: text.trim(), loading: false});
        this.search();
    };

    search = debounce(async () => {
        const {user} = this.props;
        const {text, data} = this.state;
        let searchData = data.filter(d => {

            // Search
            if (text.length > 0) {
                const key = (d.firstName + d.lastName);
                if (key.toLowerCase().indexOf(text.toLowerCase()) < 0) {
                    return false;
                }
            }

            if (user.userId === d.userId) {
                return false;
            }
            return true;
        });

        console.log('searchData', searchData);
        this.setState({searchData, loading: false, refreshing: false});
    }, 200);

    onRefresh = () => {
        this.setState({refreshing: true});
        this.init();
    }

    onPressItem = (item) => {
        const {navigation} = this.props;
        navigation.navigate('Account', {userId: item.userId});
    }

    onAddFriend = async (item) => {
        const {user, setUser} = this.props;
        this.setState({adding: true});
        firebaseSdk.updateFriends(user.id, item.id, DB_ACTION_ADD)
            .then(({myFriends}) => {
                setUser({friends: myFriends});
                this.setState({adding: false});
            })
            .catch(err => {
                console.log('error', e);
                this.setState({adding: false});
                showErrorAlert('Adding Friend Failed.');

            });
    }

    renderItem = ({item, index}) => {
        const {user} = this.props;
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.header}>
                    <Image source={item.avatar ? {uri: item.avatar} : images.default_avatar} style={styles.itemImage}/>
                    <Text style={styles.itemName}>{item.firstName} {item.lastName}</Text>
                </TouchableOpacity>
                <View style={styles.actionContainer}>
                    {
                        !(user.friends.includes(item.userId)) &&
                        <TouchableOpacity onPress={() => this.onAddFriend(item)} style={styles.action}>
                            <Image source={images.bg_blue_button} style={styles.actionImage}/>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
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
        const {theme} = this.props;
        const {searchData, refreshing, adding} = this.state;
        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                <StatusBar/>
                {adding && <ActivityIndicator absolute theme={theme} size={'large'}/>}
                <SearchBox
                    onChangeText={this.onSearchChangeText}
                    onSubmitEditing={this.search}
                    testID='federation-view-search'
                    placeholder={'Search'}
                />
                <FlatList
                    data={searchData}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.userId}
                    ListFooterComponent={this.renderFooter}
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

const mapDispatchToProps = dispatch => ({
    setUser: params => dispatch(setUserAction(params))
})
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SearchView));

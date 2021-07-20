import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import SearchBox from "../../containers/SearchBox";
import {FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from "react-native";
import debounce from "../../utils/debounce";
import styles from "./styles";
import {VectorIcon} from "../../containers/VectorIcon";
import images from "../../assets/images";
import firestore from "@react-native-firebase/firestore";
import firebaseSdk from "../../lib/firebaseSdk";
import {connect} from "react-redux";
import ActivityIndicator from "../../containers/ActivityIndicator";

class FriendView extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            text: '',
            data: [
                {id: 1, name: 'Michelle'},
                {id: 2, name: 'Michelle'}
            ],
            searchData: [],
            refreshing: false,
            loading: true,
        }
        this.init();
    }

    componentDidMount() {
        this.mounted = true;
    }

    init = async () => {
        const {user} = this.props;
        const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get();
        const users = [];
        userSnaps.forEach(s => {
            const userInfo = s.data();
            if (user.friends.includes(userInfo.userId)) {
                users.push(userInfo);
            }
        });

        if (this.mounted) {
            this.setState({data: users});
        } else {
            this.state.data = users;
        }
        this.search();
        console.log('friends', users);
    }


    onSearchChangeText = (text) => {
        this.setState({text: text.trim(), loading: false});
        this.search();
    };

    search = debounce(async () => {
        const {text, data} = this.state;
        let searchData = data.filter(d => {

            // Search
            if (text.length > 0) {
                const key = (d.firstName + d.lastName);
                if (key.toLowerCase().indexOf(text.toLowerCase()) < 0) {
                    return false;
                }
            }
            return true;
        });
        console.log('searchData', searchData);
        this.setState({searchData, loading: false, refreshing: false});
    }, 200);

    onPressItem = (item) => {
        const {navigation} = this.props;
        navigation.navigate('Account', {userId: item.userId});
    }

    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Image source={item.avatar ? {uri: item.avatar} : images.default_avatar}
                       style={styles.itemImage}/>
                <Text style={styles.itemText}>{item.firstName} {item.lastName}</Text>
            </View>
            <VectorIcon type={'Ionicons'} name={'md-ellipsis-vertical-sharp'} size={20} color={'gray'}/>
        </TouchableOpacity>
    )

    renderFooter = () => {
        const { loading } = this.state;
        const { theme } = this.props;
        if (loading) {
            return <ActivityIndicator theme={theme} size={'large'}/>;
        }
        return null;
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.init();
    }

    render() {
        const {theme} = this.props;
        const {searchData, refreshing} = this.state;

        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                <StatusBar/>
                <View style={styles.container}>
                    <SearchBox
                        onChangeText={this.onSearchChangeText}
                        onSubmitEditing={this.search}
                        testID='federation-view-search'
                        placeholder={'Search'}
                    />
                    {searchData.length > 0 ?
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
                        :
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No Friends</Text>
                        </View>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(FriendView));

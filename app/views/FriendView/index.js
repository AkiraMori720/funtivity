import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import SearchBox from "../../containers/SearchBox";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import debounce from "../../utils/debounce";
import styles from "./styles";
import {VectorIcon} from "../../containers/VectorIcon";
import images from "../../assets/images";

class FriendView extends React.Component{
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: [
                {id: 1, name: 'Michelle'},
                {id: 2, name: 'Michelle'}
            ]
        }
    }

    onSearchChangeText = (text) => {
        this.setState({ text: text.trim(), data: null, loading: false });
    };

    search = debounce(async () => {

    }, 200);

    onPressItem = (item) => {
        const {navigation} = this.props;
        navigation.navigate('Account', {account: item});
    }

    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Image source={item.image_url?{uri: item.image_url}: images.default_avatar} style={styles.itemImage}/>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
            <VectorIcon type={'Ionicons'} name={'md-ellipsis-vertical-sharp'} size={20} color={'gray'}/>
        </TouchableOpacity>
    )

    render(){
        const {theme} = this.props;
        const {data} = this.state;

        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <View style={styles.container}>
                    <SearchBox
                        onChangeText={this.onSearchChangeText}
                        onSubmitEditing={this.search}
                        testID='federation-view-search'
                        placeholder={'Search'}
                    />
                    <FlatList
                        data={data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

export default withTheme(FriendView);

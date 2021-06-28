import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import images from "../../assets/images";
import styles from "./styles";

class MessageView extends React.Component {
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 1, name: 'Michelle', message: 'text'},
                {id: 2, name: 'Michelle'}
            ]
        }
    }

    onPressItem = (item) => {
        const { navigation } = this.props;
        navigation.navigate('Chat');
    }

    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <Image source={item.image_url ? {uri: item.image_url} : images.default_avatar}
                       style={styles.itemImage}/>
                <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemMessage}>{item.message}</Text>
                </View>
            </View>
            <View style={styles.itemTail}>
                <Text style={styles.itemTime}>06/27/2021 18:15</Text>
            </View>
        </TouchableOpacity>
    )

    render() {
        const {theme} = this.props;
        const {data} = this.state;
        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                <StatusBar/>
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        )
    }
}

export default withTheme(MessageView);

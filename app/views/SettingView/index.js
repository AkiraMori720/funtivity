import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {VectorIcon} from "../../containers/VectorIcon";

class SettingView extends React.Component{
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {

        }

        this.menus = [
            { id: 'edit_profile', title: 'Edit Profile', type: 'view' },
            { id: 'rate_app', title: 'Rate App', type: 'menu' },
            { id: 'send_feedback', title: 'Send Feedback', type: 'menu' },
            { id: 'about_app', title: 'About the App', type: 'view' },
            { id: 'privacy_policy', title: 'Privacy Policy', type: 'view' },
            { id: 'term_and_conditions', title: 'Terms and Conditions', type: 'view' },
        ]
    }

    renderItem = ({item}) => {
        const { theme } = this.props;
        return (
            <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.title}</Text>
                {item.type === 'view' && <VectorIcon type={'Ionicons'} name={'md-chevron-forward'} size={20} color={themes[theme].actionColor}/>}
            </TouchableOpacity>
        )
    }

    render(){
        const {theme} = this.props;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <FlatList
                    data={this.menus}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        )
    }
}

export default withTheme(SettingView);

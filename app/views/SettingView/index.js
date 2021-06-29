import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import {FlatList, Linking, Text, TouchableOpacity} from "react-native";
import styles from "./styles";
import {VectorIcon} from "../../containers/VectorIcon";
import {APP_STORE_LINK, PLAY_MARKET_LINK, STORE_REVIEW_LINK} from "../../constants/link";
import {isIOS} from "../../utils/deviceInfo";
import {ADMIN_EMAIL} from "../../constants/app";

class SettingView extends React.Component{
    static propTypes = {
        navigation: PropTypes.object,
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

    onPressItem = (menu_id) => {
        const {navigation} = this.props;

        switch (menu_id){
            case 'edit_profile':
                navigation.navigate('ProfileEdit');
                break;
            case 'rate_app':
                try {
                    Linking.openURL(STORE_REVIEW_LINK);
                } catch (e) {
                    Linking.openURL(isIOS?APP_STORE_LINK:PLAY_MARKET_LINK);
                }
                break;
            case 'send_feedback':
                const mail_url = `mailto:${ADMIN_EMAIL}?subject=Send Feedback&body=Hi.`;
                Linking.openURL(mail_url);
                break;
            case 'about_app':
                break;
            case 'privacy_policy':
                break;
            case 'term_and_conditions':
                break;
        }
    }

    renderItem = ({item}) => {
        const { theme } = this.props;
        return (
            <TouchableOpacity onPress={() => this.onPressItem(item.id)} style={styles.itemContainer}>
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

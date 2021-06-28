import React from 'react';
import PropTypes from "prop-types";
import {Image, ImageBackground, ScrollView, Text, View} from "react-native";

import {COLOR_ORANGE, themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import styles from "./styles";
import images from "../../assets/images";
import SidebarItem from "./SidebarItem";
import {VectorIcon} from "../../containers/VectorIcon";
import scrollPersistTaps from "../../utils/scrollPersistTaps";


class SidebarView extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: 'Funtivity'
    })

    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {

        }

        this.menus = [
            {
                id: 'home',
                name: 'Home',
                icon: images.ic_menu_home,
                route: 'Home',
            },
            {
                id: 'profile',
                name: 'Profile',
                icon: images.ic_menu_profile,
                route: 'Profile',
            },
            {
                id: 'friend',
                name: 'Friend',
                icon: images.ic_menu_profile,
                route: 'Friend',
            },
            {
                id: 'search',
                name: 'Search',
                icon: images.ic_menu_search,
                route: 'Search',
            },
            {
                id: 'message',
                name: 'Messages',
                icon: images.ic_menu_message,
                route: 'Message',
            },
            {
                id: 'notifications',
                name: 'Notifications',
                icon: images.ic_menu_notification,
                route: 'Notification',
            },
            {
                id: 'setting',
                name: 'Settings',
                icon: images.ic_menu_settings,
                route: 'Setting',
            },
        ]
    }

    onClick = (item) => {
        if (item.route) {
            const {navigation} = this.props;
            navigation.navigate(item.route);
        }
    };

    onLogOut = () => {

    }

    render(){
        const {theme} = this.props;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <ImageBackground style={styles.headerContainer} source={images.bg_sidebar}>
                    <Image source={images.default_avatar} style={styles.avatar}/>
                    <Text style={styles.profileName}>No Name</Text>
                </ImageBackground>
                <ScrollView style={{flexGrow: 1}} {...scrollPersistTaps}>
                    {
                        this.menus.map(m => (
                            <SidebarItem
                                id={`sidebar-view-key-${m.id}`}
                                text={m.name}
                                left={(
                                    <Image
                                        source={m.icon}
                                        style={styles.menuIcon}
                                    />
                                )}
                                onPress={() => this.onClick(m)}
                                current={false}
                            />
                        ))
                    }
                </ScrollView>
                <SidebarItem
                    id={`sidebar-view-key-logout`}
                    text={'Log Out'}
                    left={(
                        <Image
                            source={images.ic_menu_logout}
                            style={styles.menuIcon}
                        />
                    )}
                    onPress={this.onLogOut}
                    current={false}
                />
            </SafeAreaView>
        )
    }
}

export default withTheme(SidebarView);

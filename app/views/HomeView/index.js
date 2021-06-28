import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import {Dimensions, Text} from "react-native";
import {TabBar, TabView} from "react-native-tab-view";
import AllMeetUpTab from "./allMeetUpTab";
import PrivateTab from "./privateTab";
import MyMeetUpTab from "./myMeetUpTab";
import {withDimensions} from "../../dimensions";

class HomeView extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: 'Funtivity'
    })

    static propTypes = {
        theme: PropTypes.string,
        width: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            routes: [
                { key: 'all_meetup', title: 'ALL MEETUPS' },
                { key: 'private', title: 'PRIVATE' },
                { key: 'my_meetup', title: 'MY MEETUPS' },
            ],
            curTab: 0,
        }
    }

    renderScene = ({ route, jumpTo }) => {
        const { theme } = this.props;
        switch (route.key) {
            case 'all_meetup':
                return <AllMeetUpTab jumpTo={jumpTo} theme={theme}/>;
            case 'private':
                return <PrivateTab jumpTo={jumpTo} theme={theme}/>;
            case 'my_meetup':
                return <MyMeetUpTab jumpTo={jumpTo} theme={theme}/>;
        }
    };

    render(){
        const {theme, width} = this.props;
        const {curTab, routes} = this.state;

        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <TabView
                    navigationState={{ index: curTab, routes }}
                    renderScene={this.renderScene}
                    renderTabBar={props => (
                        <TabBar {...props}
                                indicatorStyle={{ backgroundColor: 'white', height: 4 }}
                                style={{ backgroundColor: themes[theme].headerBackground }}
                        />)}
                    onIndexChange={index => this.setState({curTab: index})}
                    initialLayout={{width}}
                    swipeEnabled={false}
                    />
            </SafeAreaView>
        )
    }
}

export default withTheme(withDimensions(HomeView));

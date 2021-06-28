import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";

class NotificationView extends React.Component{
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        const {theme} = this.props;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>

            </SafeAreaView>
        )
    }
}

export default withTheme(NotificationView);

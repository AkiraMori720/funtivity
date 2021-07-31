import React from 'react';
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import { WebView } from 'react-native-webview';

import {themes} from "../constants/colors";
import StatusBar from "../containers/StatusBar";
import SafeAreaView from "../containers/SafeAreaView";
import {withTheme} from "../theme";
import {CONTENT_ABOUT_THE_APP, CONTENT_PRIVACY_POLICY, CONTENT_TERMS_AND_CONDITIONS} from "../constants/app";

const styles = StyleSheet.create({

})

class AboutView extends React.Component{
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        const param_type = this.props.route.params?.type;
        let title = '';
        let content = '';
        if(param_type !== null){
            switch (param_type) {
                case 0:
                    title = "About the App";
                    content = `<html><head><meta name="viewport" content="width=device-width, initial-scale=0.8"><style>body{padding: 8px; line-height: 1.4rem}</style></head><body>${CONTENT_ABOUT_THE_APP}</body></html>`;
                    break;
                case 1:
                    title = "Privacy Policy";
                    content = `<html><head><meta name="viewport" content="width=device-width, initial-scale=0.8"><style>body{padding: 8px; line-height: 1.4rem}</style></head><body>${CONTENT_PRIVACY_POLICY}</body></html>`;
                    break;
                case 2:
                    title = "Terms and Conditions";
                    content = `<html><head><meta name="viewport" content="width=device-width, initial-scale=0.8"><style>body{padding: 8px; line-height: 1.4rem}</style></head><body>${CONTENT_TERMS_AND_CONDITIONS}</body></html>`;
                    break;
            }
        }
        this.state = {
            type: param_type??0,    // 0: about, 1: privacy, 2: terms
            title: title,
            content: content
        }
        this.init();
    }

    init = () => {
        const {navigation} = this.props;
        navigation.setOptions({
            title: this.state.title
        });
    }



    render(){
        const {theme} = this.props;
        const {content} = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <WebView originWhitelist={['*']} source={{ html: content, baseUrl: '' }} />
            </SafeAreaView>
        )
    }
}

export default withTheme(AboutView);

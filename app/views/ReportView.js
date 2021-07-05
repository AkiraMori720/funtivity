import React from 'react';
import PropTypes from "prop-types";
import {StyleSheet, View} from "react-native";
import { WebView } from 'react-native-webview';

import {themes} from "../constants/colors";
import sharedStyles from "./Styles";
import StatusBar from "../containers/StatusBar";
import SafeAreaView from "../containers/SafeAreaView";
import {withTheme} from "../theme";
import {CONTENT_ABOUT_THE_APP, CONTENT_PRIVACY_POLICY, CONTENT_TERMS_AND_CONDITIONS} from "../constants/app";
import TextInput from "../containers/TextInput";
import Button from "../containers/Button";
import {showErrorAlert, showToast} from "../lib/info";
import {connect} from "react-redux";
import firebaseSdk, {DB_ACTION_ADD} from "../lib/firebaseSdk";
import ActivityIndicator from "../containers/ActivityIndicator";

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    submitBtn: {
        marginTop: 12,
        alignSelf: 'center'
    }
})

class ReportView extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: 'Report'
    })

    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        const meetupId = props.route.params?.meetupId;
        const account = props.route.params?.account;
        this.state = {
            meetupId,
            account,
            reportText: '',
            isSaving: false
        }
    }


    isValid = () => {
        const {reportText} = this.state;
        if(!reportText.length){
            showToast('Please enter text.');
            this.reportTextInput.focus();
            return false;
        }
        return true;
    }

    onSubmit = () => {
        if(this.isValid()){
            const {user, navigation} = this.props;
            const {reportText, account, meetupId} = this.state;
            this.setState({isSaving: true});
            const report = {
                userId: user.userId,
                reporterId: account?.userId,
                message: reportText,
                meetupId: meetupId??"",
                date: new Date()
            }
            firebaseSdk.setData(firebaseSdk.TBL_REPORT, DB_ACTION_ADD, report)
                .then(() => {
                    showToast('Success');
                    this.setState({isSaving: false});
                    navigation.pop();
                }).catch(() => {
                    showErrorAlert('Failed.');
                    this.setState({isSaving: false});
                })
        }
    }

    render(){
        const {theme} = this.props;
        const {isSaving} = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <View style={styles.container}>
                    <TextInput
                        inputRef={e => this.reportTextInput = e}
                        placeholder={'Please enter text...'}
                        returnKeyType='submit'
                        keyboardType='twitter'
                        textContentType='oneTimeCode'
                        inputStyle={{height: 120, fontSize: 14, textAlignVertical: 'top'}}
                        multiline={true}
                        onChangeText={value => this.setState({reportText: value})}
                        theme={theme}
                    />
                    <Button
                        style={styles.submitBtn}
                        title={'Post'}
                        type='primary'
                        size='W'
                        onPress={this.onSubmit}
                        testID='login-view-submit'
                        loading={isSaving}
                        theme={theme}
                    />
                </View>

            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(ReportView));

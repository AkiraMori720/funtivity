import React from 'react';
import PropTypes from 'prop-types';

import {withTheme} from "../../theme";
import TextInput from '../../containers/TextInput';
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import KeyboardView from "../../containers/KeyboardView";
import StatusBar from "../../containers/StatusBar";
import {Text, View} from "react-native";
import styles from "./styles";
import Button from "../../containers/Button";
import {showErrorAlert, showToast} from "../../lib/info";
import {isValidEmail} from "../../utils/validators";
import firebaseSdk from "../../lib/firebaseSdk";


class ForgotPasswordView extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Reset Password'
    })

    static propTypes = {
        navigation: PropTypes.object,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLoading: false
        }
    }

    isValid = () => {
        const {email} = this.state;
        if(!email.length){
            showToast('Please enter your email.');
            this.emailInput.focus();
            return false;
        }
        if(!isValidEmail(email)){
            showToast('Email address is invalid.');
            this.emailInput.focus();
            return false;
        }
        return true;
    }

    onSubmit = () => {
        if(this.isValid()){
            const {email} = this.state;
            this.setState({isLoading: true});
            const {navigation} = this.props;

            firebaseSdk.resetPassword(email)
                .then(res => {
                    this.setState({isLoading: false});
                    showToast('We have sent a reset password link to your email.');
                    navigation.pop();
                })
                .catch(err => {
                    if(err === 'auth/user-not-found'){
                        showErrorAlert('This user is not registered.');
                    }
                    this.setState({isLoading: false});
                })
        }
    }

    render(){
        const {theme} = this.props;
        const {isLoading} = this.state;
        return (
            <KeyboardView
            style={{backgroundColor: themes[theme].backgroundColor}}
            contentContainerStyle={sharedStyles.container}
            keyboardVerticalOffset={128}
        >
                <StatusBar/>
                <View style={[sharedStyles.headerContainer, {backgroundColor: themes[theme].headerBackground}]}>
                    <Text style={styles.headerText}>Put in your email address so we can send you{"\n"} a password reset link</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        inputRef={(e) => {
                            this.emailInput = e;
                        }}
                        placeholder={'Email'}
                        returnKeyType='send'
                        keyboardType='email-address'
                        textContentType='oneTimeCode'
                        onChangeText={email => this.setState({email})}
                        theme={theme}
                    />
                    <Button
                        style={styles.submitBtn}
                        title={'Reset Password'}
                        type='primary'
                        size='W'
                        onPress={this.onSubmit}
                        testID='login-view-submit'
                        loading={isLoading}
                        theme={theme}
                    />
                </View>
        </KeyboardView>
        )
    }
}


export default withTheme(ForgotPasswordView);

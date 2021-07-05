import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Image, Platform, ScrollView, Text, View} from "react-native";


import {withTheme} from "../../theme";
import KeyboardView from "../../containers/KeyboardView";
import StatusBar from "../../containers/StatusBar";
import sharedStyles from "../Styles";
import styles from "./styles";
import {themes} from "../../constants/colors";
import images from "../../assets/images";
import Button from "../../containers/Button";
import TextInput from "../../containers/TextInput";
import {loginSuccess as loginSuccessAction} from "../../actions/login";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import SafeAreaView from "../../containers/SafeAreaView";
import {showErrorAlert, showToast} from "../../lib/info";
import {isValidEmail} from "../../utils/validators";
import firebaseSdk from "../../lib/firebaseSdk";
import AsyncStorage from "@react-native-community/async-storage";
import {CURRENT_USER} from "../../constants/keys";
import {appStart as appStartAction, ROOT_INSIDE} from "../../actions/app";

class SingInView extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Login'
    })

    static propTypes = {
        navigation: PropTypes.object,
        appStart: PropTypes.func,
        loginSuccess: PropTypes.func,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            password: ''
        }
    }

    onGoToSignUp = () => {
        const {navigation} = this.props;
        navigation.navigate('SignUp');
    }

    forgotPassword = () => {
        const {navigation} = this.props;
        navigation.navigate('ForgotPassword');
    }

    isValid = () => {
        const {email, password} = this.state;
        if(!email.length && !password.length){
            showToast('Please enter your email and password.');
            this.emailInput.focus();
            return false;
        }
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
        if(!password.length){
            showToast('Please enter your password.');
            this.passwordInput.focus();
            return false;
        }
        return true;
    }

    onSubmit = () => {
        if(this.isValid()){
            const {email, password} = this.state;
            const {loginSuccess, appStart} = this.props;
            this.setState({isLoading: true});

            firebaseSdk.signInWithEmail(email, password)
                .then(async (user) => {
                    await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
                    this.setState({isLoading: false});
                    loginSuccess(user);
                })
                .catch(err => {
                    this.setState({isLoading: false});
                    if(err.indexOf('auth/user-not-found')>0){
                        showErrorAlert('This user is not registered.');
                    } else if(err.indexOf('auth/wrong-password')>0){
                        showErrorAlert('Then password is invalid.');
                    } else {
                        showErrorAlert('Then user is invalid.');
                    }
                    console.log('error', err);
                })
        }
    }

    onSignInWithOAuth = async (oauth) => {
        const {loginSuccess} = this.props;
        switch (oauth){
            case 'facebook':
                await firebaseSdk.facebookSignIn()
                    .then(async(credential) => {
                        console.log('facebook', credential);
                        const { user } = credential;
                        const names = user.name.split(' ');
                        const credentialInfo = {
                            uid: user.uid,
                            firstName: names[0],
                            lastName: names[1]??'',
                            email: user.email,
                            avatar: user.photoURL??''
                        }
                        await firebaseSdk.socialLogin(credentialInfo).then((user) => {
                            loginSuccess(user);
                        })
                    });
                break;
            case 'google':
                await firebaseSdk.googleSignIn()
                    .then(async(credential) => {
                        console.log('google', credential);
                        const { user } = credential;
                        const names = user.displayName.split(' ');
                        const credentialInfo = {
                            uid: user.uid,
                            firstName: names[0],
                            lastName: names[1]??'',
                            email: user.email,
                            avatar: user.photoURL??''
                        }
                        await firebaseSdk.socialLogin(credentialInfo).then((user) => {
                            loginSuccess(user);
                        })
                    })
                break;
            case 'apple':
                await firebaseSdk.appleSignIn()
                    .then(async(credential) => {
                        console.log('apple', credential);
                        const { user } = credential;
                        const names = user.displayName.split(' ');
                        const credentialInfo = {
                            uid: user.uid,
                            firstName: names[0],
                            lastName: names[1]??'',
                            email: user.email,
                            avatar: user.photoURL??''
                        }
                        await firebaseSdk.socialLogin(credentialInfo).then((user) => {
                            loginSuccess(user);
                        })
                    });
                break;
        }
    }

    render() {
        const {theme} = this.props;
        const {isLoading} = this.state;
        return (
            <KeyboardView
                style={{backgroundColor: themes[theme].backgroundColor}}
                contentContainerStyle={sharedStyles.container}
                keyboardVerticalOffset={128}
            >
                <StatusBar/>
                <ScrollView contentContainerStyle={{flexGrow: 1}} {...scrollPersistTaps}>
                    <SafeAreaView>
                        <View style={[sharedStyles.headerContainer, {backgroundColor: themes[theme].headerBackground}]}>
                            <Image style={styles.logo} source={images.logo}/>
                        </View>
                        <View style={styles.formContainer}>
                            <TextInput
                                inputRef={(e) => {
                                    this.emailInput = e;
                                }}
                                placeholder={'Email'}
                                returnKeyType='next'
                                keyboardType='email-address'
                                textContentType='oneTimeCode'
                                onChangeText={email => this.setState({email})}
                                onSubmitEditing={() => {
                                    this.passwordInput.focus();
                                }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.passwordInput = e;
                                }}
                                placeholder={'Password'}
                                returnKeyType='send'
                                secureTextEntry
                                textContentType='oneTimeCode'
                                onChangeText={value => this.setState({password: value})}
                                theme={theme}
                            />
                            <Button
                                style={styles.submitBtn}
                                title={'Let`s Go'}
                                type='primary'
                                size='W'
                                onPress={this.onSubmit}
                                testID='login-view-submit'
                                loading={isLoading}
                                theme={theme}
                            />
                            <View style={styles.forgotContainer}>
                                <Text style={[sharedStyles.link, styles.forgotText]} onPress={this.forgotPassword}>Forgot
                                    Password?</Text>
                            </View>
                            <View style={styles.oauthContainer}>
                                <Button
                                    title={'logo_facebook'}
                                    type='oauth'
                                    onPress={() => this.onSignInWithOAuth('facebook')}
                                    testID='login-view-submit'
                                    theme={theme}
                                />
                                <Button
                                    title={'logo_google'}
                                    type='oauth'
                                    onPress={() => this.onSignInWithOAuth('google')}
                                    theme={theme}
                                />
                                {Platform.OS === 'ios' && <Button
                                    title={'logo_apple'}
                                    type='oauth'
                                    onPress={() => this.onSignInWithOAuth('apple')}
                                    theme={theme}
                                />}
                            </View>
                            <View style={styles.bottomContainer}>
                                <Text style={{color: themes[theme].actionTintColor}}>Not registered? </Text>
                                <Text style={{...sharedStyles.link, color: themes[theme].actionTintColor}}
                                      onPress={this.onGoToSignUp}> Sign Up!</Text>
                            </View>
                        </View>

                    </SafeAreaView>
                </ScrollView>
            </KeyboardView>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    loginSuccess: params => dispatch(loginSuccessAction(params)),
    appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(SingInView));

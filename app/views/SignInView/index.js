import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Image, ScrollView, Text, View} from "react-native";


import {withTheme} from "../../theme";
import KeyboardView from "../../containers/KeyboardView";
import StatusBar from "../../containers/StatusBar";
import sharedStyles from "../Styles";
import styles from "./styles";
import {themes} from "../../constants/colors";
import images from "../../assets/images";
import Button from "../../containers/Button";
import TextInput from "../../containers/TextInput";
import {loginRequest as loginRequestAction} from "../../actions/login";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import SafeAreaView from "../../containers/SafeAreaView";

class SingInView extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Login'
    })

    static propTypes = {
        navigation: PropTypes.object,
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

    onSubmit = () => {
        const {email, password} = this.state;
        const {loginRequest} = this.props;
        loginRequest({email, password});
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
                                    onPress={this.onSubmit}
                                    testID='login-view-submit'
                                    theme={theme}
                                />
                                <Button
                                    title={'logo_google'}
                                    type='oauth'
                                    onPress={this.onSubmit}
                                    theme={theme}
                                />
                                <Button
                                    title={'logo_apple'}
                                    type='oauth'
                                    onPress={this.onSubmit}
                                    theme={theme}
                                />
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
    loginRequest: params => dispatch(loginRequestAction(params))
});

export default connect(null, mapDispatchToProps)(withTheme(SingInView));

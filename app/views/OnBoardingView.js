import React from 'react';
import {
    ImageBackground,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native';
import {connect} from 'react-redux';

import {ROOT_OUTSIDE} from "../actions/app";
import {appStart as appStartAction} from '../actions/app';
import images from "../assets/images";
import StatusBar from "../containers/StatusBar";
import {COLOR_ORANGE, COLOR_WHITE} from "../constants/colors";
import Swiper from 'react-native-swiper';
import Button from "../containers/Button";
import {withTheme} from "../theme";
import PropTypes from "prop-types";
import CheckBox from "../containers/CheckBox";
import AsyncStorage from "@react-native-community/async-storage";
import {DO_NOT_SHOW_SPLASH_AGAIN} from "../constants/keys";
import {PERMISSIONS, requestMultiple} from "react-native-permissions";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
    },
    swipeContainer: {
        flexGrow: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    slides: {
        flex: 1,
        justifyContent: 'center'
    },
    swipeText: {
        textAlign: 'center',
        color: COLOR_ORANGE,
        fontSize: 20,
        lineHeight: 26,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        paddingHorizontal: 40
    },
    dot: {
        backgroundColor: COLOR_WHITE,
        borderColor: COLOR_ORANGE,
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot: {
        backgroundColor: COLOR_ORANGE,
        borderColor: COLOR_ORANGE,
        borderWidth: 1,
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    skipText: {
        paddingHorizontal: 60,
        fontWeight: 'bold',
        color: COLOR_ORANGE
    }
});


class OnBoardingView extends React.Component {
    static propTypes = {
        navigation: PropTypes.object,
        appStart: PropTypes.func,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            notShowAgain: false,
            currentIndex: 0,
            renderSlides: this.renderSlides()
        }
        this.requestPermission();
    }

    requestPermission = () => {
        if (Platform.OS === 'android') {
            this.requestPermissionAndroid()
                .then(() => {
                })
                .catch((err) => {
                    console.log('request permission error', err);
                })
        } else {
            this.requestPermissionIOS()
                .then(() => {
                })
                .catch((err) => {
                    console.log('request permission error', err);
                })
        }
    }

    requestPermissionAndroid = async () => {
        try {
            const results = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ]);
            if (results[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
                results[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
                results[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log('all permission granted');

            } else {
                console.log('permission denied');
            }
        } catch (err) {
            console.log(err);
        }
    };

    requestPermissionIOS = () => {
        return new Promise((resolve, reject) => {
            console.log('request permission');
            requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(
                (statuses) => {
                    console.log('request permission', statuses);
                    resolve();
                }
            ).catch((err) => {
                console.log('request permission', err);
                reject(err)
            })
        })
    }

    onNext = async (force = false) => {
        const {appStart} = this.props;

        if (force) {
            appStart({root: ROOT_OUTSIDE});
        } else if (!this.isSkipable()) {
            if (this.state.notShowAgain) {
                await AsyncStorage.setItem(DO_NOT_SHOW_SPLASH_AGAIN, "true");
            }
            appStart({root: ROOT_OUTSIDE});
        } else {
            this.swipe.scrollBy(1);
        }
    }

    renderSlides = () => {
        let sides = [];
        sides.push(<View style={styles.slides} key={'swipe-1'}>
            <Text style={styles.swipeText}>Welcome{"\n"}To Funtivity</Text>
        </View>);
        sides.push(
            <View style={styles.slides} key={'swipe-2'}>
                <Text style={styles.swipeText}>If you're looking to{"\n"} meet someone to do any activity like fishing,
                    sports, yoga, etc.In your area then you have come to the right app</Text>
            </View>
        );
        sides.push(
            <View style={styles.slides} key={'swipe-3'}>
                <Text style={styles.swipeText}>Sign up now and start meeting other people!</Text>
            </View>
        );
        return sides;
    }

    isSkipable = () => this.state.currentIndex !== 2;

    render() {
        const {theme} = this.props;
        const {notShowAgain, renderSlides} = this.state;
        return (
            <ImageBackground style={styles.mainContainer} source={images.bg_onboard}>
                <StatusBar/>
                <View style={styles.swipeContainer}>
                    <Swiper
                        loop={false}
                        ref={ref => this.swipe = ref}
                        onIndexChanged={(index) => this.setState({currentIndex: index})}
                        activeDotStyle={styles.activeDot}
                        dotStyle={styles.dot}
                        paginationStyle={{position: 'absolute', bottom: 60}}
                    >
                        {renderSlides}
                    </Swiper>
                </View>
                <View style={styles.buttonContainer}>
                    {
                        this.isSkipable() ?
                            <TouchableOpacity onPress={() => this.onNext(true)}>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity> :
                            <CheckBox
                                title={'Don`t show again'}
                                checked={notShowAgain}
                                onPress={() => this.setState({notShowAgain: !notShowAgain})}
                                containerStyle={{backgroundColor: 'transparent', borderWidth: 0, marginRight: 40}}
                            />
                    }
                    <Button
                        onPress={() => this.onNext()}
                        size='X'
                        text={this.isSkipable() ? 'Next' : 'Done'}
                        theme={theme}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(OnBoardingView));

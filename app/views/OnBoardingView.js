import React from 'react';
import {ImageBackground, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import {ROOT_OUTSIDE} from "../actions/app";
import { appStart as appStartAction } from '../actions/app';
import images from "../assets/images";
import StatusBar from "../containers/StatusBar";
import {COLOR_ORANGE, COLOR_WHITE} from "../constants/colors";
import Swiper from 'react-native-swiper';
import Button from "../containers/Button";
import {withTheme} from "../theme";
import PropTypes from "prop-types";
import CheckBox from "../containers/CheckBox";

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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
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
        this.currentIndex = 0;
        this.state = {
            notShowAgain: false
        }
    }

    onIndexChanged = (index) => {
        this.currentIndex = index;
        if(!this.isSkipable()){
            this.forceUpdate();
        }
    }

    onNext = (force = false) => {
        const { appStart } = this.props;
        if (force || this.currentIndex === 2) {
            appStart({ root: ROOT_OUTSIDE });
        } else {
            this.swipe.scrollBy(1);
        }
    }

    isSkipable = () => this.currentIndex !== 2;

    render(){
        const { theme } = this.props;
        const { notShowAgain } = this.state;
        return (
            <ImageBackground  style={styles.mainContainer} source={images.bg_onboard}>
                <StatusBar />
                <View style={styles.swipeContainer}>
                    <Swiper
                        loop={false}
                        ref={ref => this.swipe = ref}
                        onIndexChanged={this.onIndexChanged}
                        activeDotStyle={styles.activeDot}
                        dotStyle={styles.dot}
                        >
                        <View style={styles.slides}>
                            <Text style={styles.swipeText}>Welcome{"\n"}To Funtivity</Text>
                        </View>
                        <View style={styles.slides}>
                            <Text style={styles.swipeText}>If you're looking to{"\n"} meet someone to do any activity like fishing, sports, yoga, etc.In your area then you have come to the right app</Text>
                        </View>
                        <View style={styles.slides}>
                            <Text style={styles.swipeText}>Sign up now and start meeting other people!</Text>
                        </View>
                    </Swiper>
                </View>
                <View style={styles.buttonContainer}>
                    {
                        this.isSkipable() ?
                        <TouchableOpacity onPress={() => this.onNext(true)}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>:
                            <CheckBox
                                title={'Don`t show again'}
                                checked={notShowAgain}
                                onPress={() => this.setState({notShowAgain: !notShowAgain})}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                            />
                    }
                    <Button
                        onPress={() => this.onNext()}
                        size='X'
                        text={'Next'}
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

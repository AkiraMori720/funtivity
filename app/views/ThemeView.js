import React from 'react';
import PropTypes from "prop-types";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

import SafeAreaView from "../containers/SafeAreaView";
import StatusBar from "../containers/StatusBar";
import {themes} from "../constants/colors";
import {withTheme} from "../theme";
import images from "../assets/images";
import AsyncStorage from "@react-native-community/async-storage";
import {APP_THEME} from "../constants/keys";


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 40
    },
    themeTile: {
        position: 'relative',
        margin: 8
    },
    themeImage: {
        width: 140,
        height: 140
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    activeTheme: {
        width: 32,
        height: 32,
        position: 'absolute',
        right: 20,
        bottom: 20
    }
});

class ThemeView extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Choose Theme'
    })

    static propTypes = {
        navigation: PropTypes.object,
        setTheme: PropTypes.string,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.themes = [
            {id: 'theme_a', image: images.theme_a},
            {id: 'theme_b', image: images.theme_b},
            {id: 'theme_c', image: images.theme_c},
            {id: 'theme_d', image: images.theme_d},
            {id: 'theme_e', image: images.theme_e},
            {id: 'theme_f', image: images.theme_f}
        ]
    }

    onSelectTheme = async (theme) => {
        const {setTheme} = this.props;
        setTheme(theme);
        await AsyncStorage.setItem(APP_THEME, theme);
    }

    renderTheme = (item) => {
        const {theme} = this.props;
        return (<TouchableOpacity key={item.id} onPress={() => this.onSelectTheme(item.id)}
                          style={styles.themeTile}>
            <Image style={styles.themeImage} source={item.image}/>
            {item.id === theme?<Image style={styles.activeTheme} source={images.ic_check}/>:null}
        </TouchableOpacity>);
    }

    renderThemes = () => {
        let renderThemes = [];
        for (let i = 0; i < this.themes.length; i += 2) {
            renderThemes.push(<View style={styles.row}>
                {this.renderTheme(this.themes[i])}
                {this.themes[i + 1] && this.renderTheme(this.themes[i+1])}
            </View>)
        }

        return renderThemes;
    }

    render() {
        const {theme} = this.props;
        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                <StatusBar/>
                <View style={styles.container}>
                    {this.renderThemes()}
                </View>
            </SafeAreaView>
        );
    }
}

export default withTheme(ThemeView);

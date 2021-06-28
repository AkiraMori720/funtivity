import React from 'react';
import PropTypes from "prop-types";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

import SafeAreaView from "../containers/SafeAreaView";
import StatusBar from "../containers/StatusBar";
import {themes} from "../constants/colors";
import {withTheme} from "../theme";
import images from "../assets/images";


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
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            cur_theme : 'theme_a'
        };

        this.themes = [
            {id: 'theme_a', image: images.theme_a},
            {id: 'theme_b', image: images.theme_b},
            {id: 'theme_c', image: images.theme_c},
            {id: 'theme_d', image: images.theme_d},
            {id: 'theme_e', image: images.theme_e},
            {id: 'theme_f', image: images.theme_f}
        ]
    }

    onSelectTheme = (theme) => {
        this.setState({cur_theme: theme.id})
    }

    renderTheme = (theme) => {
        const {cur_theme} = this.state;
        return (<TouchableOpacity key={theme.id} onPress={() => this.onSelectTheme(theme)}
                          style={styles.themeTile}>
            <Image style={styles.themeImage} source={theme.image}/>
            {theme.id === cur_theme?<Image style={styles.activeTheme} source={images.ic_check}/>:null}
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

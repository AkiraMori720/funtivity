import React from 'react';
import PropTypes from "prop-types";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import SearchBox from "../../containers/SearchBox";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import debounce from "../../utils/debounce";
import styles from "./styles";
import images from "../../assets/images";

class SearchView extends React.Component{
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: [
                {id: 1, name: 'Simba King'}
            ],
            loading: false
        }
    }

    onSearchChangeText = (text) => {
        this.setState({text: text.trim(), data: null, loading: false});
    };

    search = debounce(async () => {

    }, 200);

    renderItem = ({item, index}) => {
        return (
          <View style={styles.itemContainer}>
              <View style={styles.header}>
                  <Image source={item.image_url?{uri: item.image_url}:images.default_avatar} style={styles.itemImage}/>
                  <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <View style={styles.actionContainer}>
                  <TouchableOpacity onPress={() => this.onPressItem(item)} style={styles.action}>
                      <Image source={images.bg_blue_button} style={styles.actionImage}/>
                  </TouchableOpacity>
              </View>
          </View>
        );
    }

    render(){
        const {theme} = this.props;
        const {data} = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <SearchBox
                    onChangeText={this.onSearchChangeText}
                    onSubmitEditing={this.search}
                    testID='federation-view-search'
                    placeholder={'Search'}
                />
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        )
    }
}

export default withTheme(SearchView);

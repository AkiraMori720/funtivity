import React from 'react';
import PropTypes from "prop-types";
import debounce from "../../utils/debounce";
import {FlatList, Text, View} from "react-native";
import SearchBox from "../../containers/SearchBox";
import MeetUp from "./MeetUp";
import NoMeetUp from "./NoMeetUp";

class PrivateTab extends React.Component {
    static propTypes = {
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: null,
            loading: false
        }
    }

    onSearchChangeText = (text) => {
        this.setState({text: text.trim(), data: null, loading: false});
    };

    search = debounce(async () => {

    }, 200);

    render() {
        const {theme} = this.props;
        const {data} = this.state;

        return (
            <View key={'private'}>
                <SearchBox
                    onChangeText={this.onSearchChangeText}
                    onSubmitEditing={this.search}
                    testID='federation-view-search'
                    placeholder={'Search'}
                />
                {data ?
                    <FlatList
                        data={data}
                        renderItem={({item, index}) => <MeetUp key={index} item={item} onPress={this.onOpenMeetUp}/>}
                        keyExtractor={item => item.id}
                    /> :
                    <NoMeetUp onPress={this.search}/>
                }
            </View>
        )
    }
}

export default PrivateTab;

import React from 'react';
import PropTypes from "prop-types";
import SearchBox from "../../containers/SearchBox";
import {FlatList, Text, View} from "react-native";
import debounce from "../../utils/debounce";
import MeetUp from "./MeetUp";
import NoMeetUp from "./NoMeetUp";

class MyMeetUpTab extends React.Component {
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
            <View key={'my_meetup'} style={{}}>
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
                    <NoMeetUp/>
                }

            </View>
        )
    }
}

export default MyMeetUpTab;

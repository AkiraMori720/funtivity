import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FlatList, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";

import {COLOR_BORDER, COLOR_SEPARATOR, themes} from "../constants/colors";
import sharedStyles from "./Styles";
import StatusBar from "../containers/StatusBar";
import SafeAreaView from "../containers/SafeAreaView";
import {withTheme} from "../theme";
import Button from "../containers/Button";
import {OUTDOOR_ARRAY} from "../constants/app";
import CheckBox from "../containers/CheckBox";
import firebaseSdk, {DB_ACTION_UPDATE} from "../lib/firebaseSdk";
import {showToast} from "../lib/info";
import {setUser as setUserAction} from "../actions/login";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_BORDER
    },
    itemHeader: {
        fontSize: 16
    },
    submitBtn: {
        marginVertical: 12,
        alignSelf: 'center'
    }
});

class OutdoorActivitiesView extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Outdoor Activities'
    })

    static propTypes = {
        user: PropTypes.object,
        setUser: PropTypes.func,
        theme: PropTypes.string,
        width: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            text: '',
            selected: props.user.outdoor,
            loading: false
        }
        this.categoryOptions = OUTDOOR_ARRAY.map((c, index) => ({value: index,  text: c}));
    }

    componentDidMount() {
        this.mounted = true;
    }

    toggleCheck = (category_id) => {
        if(this.state.selected.includes(category_id)){
            this.setState({selected: this.state.selected.filter(v => v !== category_id)});
        } else {
            this.setState({selected: [...this.state.selected, category_id]});
        }
    }

    onSubmit = () => {
        const {user, setUser, navigation} = this.props;
        const userInfo = {
            id: user.id,
            outdoor: this.state.selected
        }
        this.setState({loading: true});
        firebaseSdk.setData(firebaseSdk.TBL_USER, DB_ACTION_UPDATE, userInfo)
            .then(() => {
                showToast('Success');
                this.setState({loading: false});
                const updateUser = {...userInfo};
                setUser(updateUser);
                navigation.pop();
            })
            .catch(err => {
                showToast(err.message);
                this.setState({loading: false});
            })
    }

    renderSelectItem = (c) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemHeader}>{c.text}</Text>
            <CheckBox
                checked={this.state.selected.includes(c.value)}
                onPress={() => this.toggleCheck(c.value)}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            />
        </View>
    )

    render() {
        const {theme} = this.props;
        const {
            loading,
        } = this.state;

        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                <StatusBar/>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    {
                        this.categoryOptions.map(c => this.renderSelectItem(c))
                    }
                    </ScrollView>
                    <Button
                        style={styles.submitBtn}
                        title={'Save'}
                        type='primary'
                        size='W'
                        onPress={this.onSubmit}
                        testID='login-view-submit'
                        loading={loading}
                        theme={theme}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

const mapDispatchToProps = dispatch => ({
    setUser: params => dispatch(setUserAction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(OutdoorActivitiesView));

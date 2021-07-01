import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

import {COLOR_BLUE, COLOR_WHITE, themes} from "../../constants/colors";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import TextInput from "../../containers/TextInput";
import DatePicker from "../../containers/DatePicker";
import {Select} from "../../containers/Select";
import {CATEGORY_ARRAY, KIND_ARRAY, SEX_ARRAY} from "../../constants/app";
import {RangeSlider} from "../../containers/RangeSlider";
import UploadPhotos from "../../containers/UploadPhotos";
import {withTheme} from "../../theme";
import SafeAreaView from "../../containers/SafeAreaView";
import StatusBar from "../../containers/StatusBar";
import KeyboardView from "../../containers/KeyboardView";
import sharedStyles from "../Styles";

const styles = StyleSheet.create({
    mainContainer: {
        padding: 12,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8
    },
    btnContainer: {
        marginTop: 8,
        width: '100%',
        backgroundColor: COLOR_BLUE
    },
    btnText: {
        marginVertical: 12,
        color: COLOR_WHITE,
        textAlign: 'center'
    },
    slider: {

    }
});

class AddMeetupView extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'Create Meetup'
    })

    constructor(props) {
        super(props);
        this.state = {
            meetupName: '',
            address: '',
            date: null,
            time: null,
            category: null,
            sex: null,
            kind: null,
        }
        this.age = {startAge: 18, endAge: 48};

        this.categoryOptions = CATEGORY_ARRAY.map((c, index) => ({value: index,  text: c}));
        this.sexOptions = SEX_ARRAY.map((s) => ({value: s, text: s}));
        this.kindOptions = KIND_ARRAY.map((k) => ({value: k, text: k}));
    }

    isValid = () => {

    }

    onCreateMeetup = () => {
        if(this.isValid){

        }
    }

    onPressCancel = () => {
        const {navigation} = this.props;
        navigation.pop();
    }

    render() {
        const {theme} = this.props;
        const {meetupName, category, date, time, sex, age, kind} = this.state;
        return(
            <KeyboardView
                style={{backgroundColor: themes[theme].backgroundColor}}
                contentContainerStyle={sharedStyles.container}
                keyboardVerticalOffset={128}
            >
                <StatusBar/>
                <ScrollView {...scrollPersistTaps}>
                    <SafeAreaView style={[styles.mainContainer, {backgroundColor: themes[theme].backgroundColor}]}>
                        <TextInput
                            inputRef={(e) => {
                                this.meetupNameInput = e;
                            }}
                            placeholder={'Meetup Name'}
                            returnKeyType='next'
                            keyboardType='twitter'
                            textContentType='oneTimeCode'
                            onChangeText={value => this.setState({meetupName: value})}
                            theme={theme}
                        />
                        <Select
                            options={this.categoryOptions}
                            placeholder={'Active Category'}
                            theme={theme}
                            value={category}
                            onChange={() => {}}
                        />
                        <TextInput
                            inputRef={(e) => {
                                this.addressInput = e;
                            }}
                            placeholder={'Location'}
                            returnKeyType='next'
                            keyboardType='twitter'
                            textContentType='oneTimeCode'
                            onChangeText={value => this.setState({address: value})}
                            theme={theme}
                        />
                        <View style={{flexDirection:'row', alignItems: 'center', marginBottom: 8}}>
                            <DatePicker
                                style={{flex: 1}}
                                placeholder={'MM/dd/YY'}
                                type={'time'}
                                value={date}
                                action={({value}) => {
                                    if(!value){
                                        return;
                                    }
                                }}
                                theme={theme}
                            />
                            <DatePicker
                                style={{flex: 1}}
                                placeholder={'HH:MM AM'}
                                type={'time'}
                                value={time}
                                action={({value}) => {
                                    if(!value){
                                        return;
                                    }
                                }}
                                theme={theme}
                            />
                        </View>
                        <TextInput
                            inputRef={(e) => {
                                this.numberOfGuests = e;
                            }}
                            placeholder={'Number of Guests'}
                            returnKeyType='next'
                            keyboardType='twitter'
                            textContentType='oneTimeCode'
                            onChangeText={value => this.setState({numberOfGuests: value})}
                            theme={theme}
                        />
                        <Select
                            options={this.sexOptions}
                            placeholder={'Sex'}
                            theme={theme}
                            value={sex}
                            onChange={() => {}}
                        />
                        <TextInput
                            inputRef={(e) => {
                                this.descriptionInput = e;
                            }}
                            placeholder={'Description'}
                            returnKeyType='next'
                            keyboardType='twitter'
                            textContentType='oneTimeCode'
                            onChangeText={value => this.setState({description: value})}
                            theme={theme}
                        />
                        <Select
                            options={this.kindOptions}
                            placeholder={'Kind'}
                            theme={theme}
                            value={kind}
                            onChange={() => {}}
                        />
                        <RangeSlider
                            style={styles.slider}
                            min={0}
                            max={100}
                            step={1}
                            label={'Age Bracket'}
                            initValue={{low: 18, high: 48}}
                            onValueChanged={(low, high) => {
                                this.age = {startAge: low, endAge: high};
                            }}
                            theme={theme}
                        />
                        <UploadPhotos theme={theme}/>
                        <TouchableOpacity style={styles.btnContainer} onPress={this.onCreateMeetup}>
                            <Text style={styles.btnText}>Create</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnContainer} onPress={this.onPressCancel}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardView>
        );
    }
}

export default withTheme(AddMeetupView);

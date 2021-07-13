import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import {COLOR_BLUE, COLOR_WHITE, themes} from "../../constants/colors";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import TextInput from "../../containers/TextInput";
import DatePicker from "../../containers/DatePicker";
import {Select} from "../../containers/Select";
import {CATEGORY_ARRAY, KIND_ARRAY, SEX_ARRAY} from "../../constants/app";
import {RangeSlider} from "../../containers/RangeSlider";
import UploadPhotos from "../../containers/UploadPhotos";
import {showErrorAlert, showToast} from "../../lib/info";
import moment from "moment";
import {DATE_STRING_FORMAT, TIME_STRING_FORMAT} from "../../utils/datetime";
import firebaseSdk, {DB_ACTION_ADD, DB_ACTION_UPDATE} from "../../lib/firebaseSdk";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    mainContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: 12,
        borderRadius: 8
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },
    btnContainer: {
        marginTop: 8,
        width: '100%',
        backgroundColor: COLOR_BLUE,
        paddingVertical: 12,
    },
    btnText: {
        color: COLOR_WHITE,
        textAlign: 'center'
    },
    slider: {

    }
});

const MeetupModal = React.memo(({ meetup, userId, onPressCancel, onSuccess, theme }) => {
    //console.log('meetup', new Date(meetup.date.seconds * 1000));
    const isEdit = !!(meetup);
    const [meetupName, setMeetupName] = useState(isEdit?meetup.meetupName:'');
    const [category, setCategory] = useState(isEdit?meetup.category:null);
    const [location, setLocation] = useState(isEdit?meetup.location:'');
    const [date, setDate] = useState(isEdit?moment(meetup.date.seconds * 1000).format(DATE_STRING_FORMAT):moment().format(DATE_STRING_FORMAT));
    const [time, setTime] = useState(isEdit?moment(meetup.date.seconds * 1000).format(TIME_STRING_FORMAT):moment().format(TIME_STRING_FORMAT));
    const [numberOfGuests, setNumberOfGuests] = useState(isEdit?String(meetup.guests):null);
    const [description, setDescription] = useState(isEdit?meetup.description:'');
    const [sex, setSex] = useState(isEdit?meetup.sex:null);
    const [kind, setKind] = useState(isEdit?meetup.kind:null);
    const [registering, setRegistering] = useState(false);

    const initPhotos = isEdit?[meetup.photoA]:[];
    if(isEdit && meetup.photoB.length > 0){
        initPhotos.push(meetup.photoB);
        if(meetup.photoC.length > 0) initPhotos.push(meetup.photoC);
    }
    const [photos, setPhotos] = useState(initPhotos);

    let age = {startAge: isEdit?meetup.startAge:18, endAge: isEdit?meetup.endAge:48};

    let meetupNameInput=useRef();
    let numberOfGuestsInput=useRef();
    let locationInput=useRef();
    let descriptionInput=useRef();

    const categoryOptions = CATEGORY_ARRAY.map((c, index) => ({value: index,  text: c}));
    const sexOptions = SEX_ARRAY.map((s, index) => ({value: index, text: s}));
    const kindOptions = KIND_ARRAY.map((k,index) => ({value: index, text: k}));

    const isValid = () => {
        if(!meetupName.trim().length){
            showErrorAlert('Please enter meetup name.', 'Error', () => {
                meetupNameInput.current.focus();
            });
            return false;
        }
        if(category === null){
            showErrorAlert('Please enter activity category.', 'Error');
            return false;
        }
        if(!location.trim().length){
            showErrorAlert('Please enter your location.', 'Error', () => {
                locationInput.current.focus();
            });
            return false;
        }
        if(!date){
            showErrorAlert('Please enter date.', 'Error');
            return false;
        }
        if(!time){
            showErrorAlert('Please enter time.', 'Error');
            return false;
        }
        if(moment().diff(moment(date +' '+ time, DATE_STRING_FORMAT + ' ' + TIME_STRING_FORMAT)) > 0){
            showErrorAlert('Date must be => Current Date', 'Error');
            return false;
        }
        if(numberOfGuests === null){
            showErrorAlert('Please enter number of guests.', 'Error', ()=>{
                numberOfGuestsInput.current.focus();
            });
            return false;
        }
        if(sex === null){
            showErrorAlert('Please choose sex.', 'Error');
            return false;
        }
        if(!description.trim().length){
            showErrorAlert('Please enter description.', 'Error', () => {
                descriptionInput.current.focus();
            });
            return false;
        }
        if(kind === null){
            showErrorAlert('Please choose kind.', 'Error');
            return false;
        }
        if(!photos.length){
            showErrorAlert('Please choose photo.', 'Error');
            return false;
        }
        return true;
    }

    const onCreate = () => {
        if(isValid()){
            setRegistering(true);
            const datetime = new Date(moment(date +' '+ time, DATE_STRING_FORMAT + ' ' + TIME_STRING_FORMAT));
            let newMeetup = {
                userId,
                meetupName,
                location,
                sex,
                date: datetime,
                kind,
                description,
                category,
                guests: Number(numberOfGuests),
                startAge: age.startAge,
                endAge: age.endAge,
                interestedUsers: [],
                joinUsers: [],
                photoA: '',
                photoB: '',
                photoC: ''
            }

            if(isEdit){
                newMeetup.id = meetup.id;
            }

            if(isEdit && (photos[0].indexOf('https') > -1)){
                newMeetup.photoA = photos[0];
                if(photos[1] && photos[1].indexOf('https://') < 0){
                    firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, photos[1]).then((image_url) => {
                        newMeetup.photoB = image_url;
                        if(!photos[2]){
                            registerMeetup(newMeetup);
                        } else {
                            firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, photos[2]).then((image_url) => {
                                newMeetup.photoC = image_url;
                                registerMeetup(newMeetup);
                            });
                        }
                    });
                } else {
                    newMeetup.photoB = photos[1]??'';
                    if(photos[2] && photos[2].indexOf('https://') < 0){
                        firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, photos[2]).then((image_url) => {
                            newMeetup.photoC = image_url;
                            registerMeetup(newMeetup);
                        });
                    } else {
                        newMeetup.photoC = photos[2]??'';
                        registerMeetup(newMeetup);
                    }
                }
            } else {
                firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, photos[0]).then((image_url) => {
                    newMeetup.photoA = image_url;
                    if(!photos[1]){
                        registerMeetup(newMeetup);
                    } else {
                        firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, photos[1]).then((image_url) => {
                            newMeetup.photoB = image_url;
                            if(!photos[2]){
                                registerMeetup(newMeetup);
                            } else {
                                firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_PHOTO, photos[2]).then((image_url) => {
                                    newMeetup.photoC = image_url;
                                    registerMeetup(newMeetup);
                                });
                            }
                        });
                    }
                })
            }
        }
    }

    const registerMeetup = (item) => {
        console.log('register', item);
        firebaseSdk.setData(firebaseSdk.TBL_MEET_UP, isEdit?DB_ACTION_UPDATE:DB_ACTION_ADD, item)
            .then(() => {
                setRegistering(false);
                onSuccess();
            })
            .catch(err => {
                setRegistering(false);
                showErrorAlert('Registering Meetup Failed.', 'Error');
            })
    }

    return(
        <View style={styles.container}>
            <ScrollView {...scrollPersistTaps}
                        style={[styles.mainContainer, {backgroundColor: themes[theme].backgroundColor}]} contentContainerStyle={{paddingBottom: 24}}>
                <Text style={styles.titleText}>{isEdit?'Edit Meetup':'Create Meetup'}</Text>
                <TextInput
                    inputRef={meetupNameInput}
                    placeholder={'Meetup Name'}
                    returnKeyType='next'
                    keyboardType='twitter'
                    textContentType='oneTimeCode'
                    value={meetupName}
                    onChangeText={value => setMeetupName(value)}
                    theme={theme}
                />
                <Select
                    options={categoryOptions}
                    placeholder={'Select Active Category...'}
                    theme={theme}
                    value={category}
                    onChange={value => setCategory(value)}
                />
                <TextInput
                    inputRef={locationInput}
                    placeholder={'Location'}
                    returnKeyType='next'
                    keyboardType='twitter'
                    textContentType='oneTimeCode'
                    value={location}
                    onChangeText={value => setLocation(value)}
                    theme={theme}
                />
                <View style={{flexDirection:'row', alignItems: 'center', marginBottom: 8}}>
                    <DatePicker
                        style={{flex: 1}}
                        placeholder={'MM/dd/YY'}
                        type={'date'}
                        value={isEdit?new Date(meetup.date.seconds * 1000):new Date()}
                        action={({value}) => {
                            if(!value){
                                return;
                            }
                            setDate(value);
                        }}
                        theme={theme}
                    />
                    <DatePicker
                        style={{flex: 1}}
                        placeholder={'HH:MM AM'}
                        type={'time'}
                        value={isEdit?new Date(meetup.date.seconds * 1000):new Date()}
                        action={({value}) => {
                            if(!value){
                                return;
                            }
                            setTime(value);
                        }}
                        theme={theme}
                    />
                </View>
                <TextInput
                    inputRef={numberOfGuestsInput}
                    placeholder={'Number of Guests'}
                    returnKeyType='next'
                    keyboardType='numeric'
                    textContentType='oneTimeCode'
                    value={numberOfGuests}
                    onChangeText={value => setNumberOfGuests(value.replace(/\D/gm, ''))}
                    theme={theme}
                />
                <Select
                    options={sexOptions}
                    placeholder={'Select Sex...'}
                    theme={theme}
                    value={sex}
                    onChange={value => setSex(value)}
                />
                <TextInput
                    inputRef={descriptionInput}
                    placeholder={'Description'}
                    returnKeyType='next'
                    keyboardType='twitter'
                    textContentType='oneTimeCode'
                    inputStyle={{height: 120, textAlignVertical: 'top'}}
                    multiline={true}
                    value={description}
                    onChangeText={value => setDescription(value)}
                    theme={theme}
                />
                <Select
                    options={kindOptions}
                    placeholder={'Select Kind...'}
                    theme={theme}
                    value={kind}
                    onChange={value => setKind(value)}
                />
                <RangeSlider
                    style={styles.slider}
                    min={0}
                    max={100}
                    step={1}
                    label={'Age Bracket'}
                    initValue={{low: isEdit?meetup.startAge:18, high: isEdit?meetup.endAge:48}}
                    onValueChanged={(low, high) => {
                        age = {startAge: low, endAge: high};
                    }}
                    theme={theme}
                />
                <UploadPhotos value={photos} onChangePhotos={(ps) => setPhotos(ps)} maxCount={3} theme={theme}/>
                <TouchableOpacity style={styles.btnContainer} onPress={onCreate}>
                    {registering?<ActivityIndicator color={themes[theme].buttonText}/>:<Text style={styles.btnText}>{isEdit?'SAVE':'Create'}</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnContainer} onPress={onPressCancel}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
});

export default MeetupModal;

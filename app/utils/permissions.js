import {Alert} from "react-native";

const {Platform} = require("react-native");
import {check, openSettings, PERMISSIONS, RESULTS} from "react-native-permissions";

const fetchCameraPermission = () => {
    return new Promise((resolve, reject) => {
        check(Platform.OS === 'ios'?PERMISSIONS.IOS.CAMERA:PERMISSIONS.ANDROID.CAMERA)
            .then((result) => {
                if (result === RESULTS.GRANTED) resolve(true);
                else resolve(false);
            })
            .catch((error) => {
                console.log('error', error);
                resolve(false);
            })
    })
}

const fetchPhotosPermission = () => {
    return new Promise((resolve, reject) => {
        check(Platform.OS === 'ios'?PERMISSIONS.IOS.PHOTO_LIBRARY:PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
            .then((result) => {
                if (result === RESULTS.GRANTED) resolve(true);
                else resolve(false);
            })
            .catch((error) => {
                resolve(false);
            })
    })
}

export const checkCameraPermission = async () => {
    if(!await fetchCameraPermission()){
        Alert.alert(
            'Visit settings and allow camera permission',
            '',
            [
                {
                    text: "OK", onPress: () => {
                        openSettings();
                    }
                },
                {
                    text: "CANCEL", onPress: () => {
                    }
                }
            ]);
        return false;
    }
    return true;
}

export const checkPhotosPermission = async () => {
    if(!await fetchPhotosPermission()){
        Alert.alert(
            'Visit settings and allow photos permission',
            '',
            [
                {
                    text: "OK", onPress: () => {
                        openSettings();
                    }
                },
                {
                    text: "CANCEL", onPress: () => {
                    }
                }
            ]);
        return false;
    }
    return true;
}

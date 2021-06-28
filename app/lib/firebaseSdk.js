import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {GoogleSignin} from '@react-native-community/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

import NetInfo from '@react-native-community/netinfo';
import messaging from "@react-native-firebase/messaging";

const CLOUD_MESSAGING_SERVER_KEY = 'AAAAfoaJ3wk:APA91bH9EK9uwyXrFaGjxu09s-WJIkEt5l26yaQKqOaomDhKLhWvdefpDLsVg4AEaJxOd1c-76wq4aLharmvy8oG2UaEqptb64Vr3yiXsvggizwhz7ryctVPSApObfzi9KOGJHT_PUz5';
const GOOGLE_SIGN_IN_WEBCLIENT_ID = '543423061769-d9r2rv8t2bqom533um8q1k0gvhds5010.apps.googleusercontent.com';

const firebaseSdk = {

    async checkInternet(){
        return NetInfo.fetch().then(state => {
            return state.isConnected;
        })
    },

    signInWithEmail(email, password){
        return new Promise((resolve, reject) => {
            auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log('res', res);
                    resolve(getUser(res.user.uid));
                })
                .catch((err) => {
                    console.log('error', err);
                    reject(err);
                });
        })
    },

    appleSignIn(){
        return new Promise(async (resolve, reject) => {
            try {
                // Start the sign-in request
                const appleAuthRequestResponse = await appleAuth.performRequest({
                    requestedOperation: appleAuth.Operation.LOGIN,
                    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
                });

                // Ensure Apple returned a user identityToken
                if (!appleAuthRequestResponse.identityToken) {
                    throw 'Apple Sign-In failed - no identify token returned';
                }

                // Create a Firebase credential from the response
                const {identityToken, nonce} = appleAuthRequestResponse;
                const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

                // Sign the user in with the credential
                resolve(auth().signInWithCredential(appleCredential));
            } catch (err) {
                reject(err);
            }
        })
    },

    googleSignIn(){
        return new Promise(async (resolve, reject) => {
            try {
                GoogleSignin.configure({
                    webClientId: GOOGLE_SIGN_IN_WEBCLIENT_ID,
                    offlineAccess: false
                })

                // Get the users ID token
                const {idToken} = await GoogleSignin.signIn();

                // // Create a Google credential with the token
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                // // Sign-in the user with the credential
                resolve(auth().signInWithCredential(googleCredential));
            } catch (err) {
                reject(err);
            }
        })
    },

    facebookSignIn(){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                if (result.isCancelled) {
                    throw 'User cancelled the login process';
                }

                // Once signed in, get the users AccesToken
                const data = await AccessToken.getCurrentAccessToken();

                if (!data) {
                    throw 'Something went wrong obtaining access token';
                }

                // Create a Firebase credential with the AccessToken
                const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

                // Sign-in the user with the credential
                resolve(auth().signInWithCredential(facebookCredential));
            } catch (err) {
                reject(err);
            }
        })
    },

    resetPassword(email){
        return new Promise((resolve, reject) => {
            auth().sendPasswordResetEmail(email)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    signUp(email, password){
        return new Promise((resolve, reject) => {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    },

    signOut(){
        auth().signOut();
    },

    createUser(userInfo){
        return new Promise((resolve, reject) => {
            firestore()
                .collection('users')
                .doc(userInfo.id)
                .set(userInfo)
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    deleteUser(id){
        return new Promise((resolve, reject) => {
            firestore()
                .collection('users')
                .doc(id)
                .delete()
                .then(() => {
                    console.log('delete user on doc success');
                })
                .catch((err) => {
                    console.log('delete user on doc error', err)
                });

            auth().currentUser.delete()
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err)
                });
        })
    },

    getUser(id){
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('users')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        if (doc.data().id == id) {
                            resolve(doc.data());
                        }
                    })
                    resolve('no exist');
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getUserSocialRegistered(email){
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('users')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        if (doc.data().email == email) {
                            resolve(doc.data());
                        }
                    })
                    resolve('no exist');
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getData(kind = ''){
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection(kind)
                .get()
                .then(snapshot => {
                    var data = [];
                    snapshot.forEach(doc => {
                        var obj = doc.data();
                        Object.assign(obj, {id: doc.id});
                        data.push(obj);
                    })
                    console.log('getData : ' + kind + ' Data: ', data);
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },

    setData(kind = '', act, item){
        return new Promise((resolve, reject) => {
            if (act == 'add') {
                firebase.firestore()
                    .collection(kind)
                    .add(item)
                    .then((res) => {
                        var itemWithID = {...item, id: res.id};
                        firebase.firestore()
                            .collection(kind)
                            .doc(res.id)
                            .update(itemWithID)
                            .then((response) => {
                                resolve(res)
                            })
                            .catch((err) => {
                                reject(err);
                            })
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else if (act == 'update') {
                firebase.firestore()
                    .collection(kind)
                    .doc(item.id)
                    .update(item)
                    .then(() => {
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else if (act == 'delete') {
                firebase.firestore()
                    .collection(kind)
                    .doc(item.id)
                    .delete()
                    .then(() => {
                        console.log(kind, act)
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    })
            }
        })
    },

    uploadMedia(folder, name, path){
        var milliSeconds = new Date().getTime();
        return new Promise((resolve, reject) => {

            let ref = storage().ref(`${folder}/${name}`);

            ref.putFile(path)
                .then(async (res) => {
                    const downloadURL = await ref.getDownloadURL();
                    resolve(downloadURL);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    },


    async setFcmToken(userid){
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log("Your Firebase Token is:", fcmToken);
                return setData('users', 'update', {id: userid, fcmToken: fcmToken});
            }
        }
        console.log("Failed", "No token received");
        return null
    },

    sendNotifications(tokens, title, content, data){
        for (let i = 0; i < tokens.length; i++) {
            let params = {
                to: tokens[i],
                data,
                notification: {
                    body: content,
                    title: title
                }
            };

            let options = {
                method: 'POST',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                    'Authorization': `key=${CLOUD_MESSAGING_SERVER_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            };
            console.log('send notification: ', options);
            try {
                fetch('https://fcm.googleapis.com/fcm/send', options);
            } catch (e) {
                console.log('Send Notification Error:', e);
            }
        }
        return true;
    }
}

export default firebaseSdk;

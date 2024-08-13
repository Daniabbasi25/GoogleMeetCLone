import {SafeAreaView, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {RootStack} from 'navigations';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const App = () => {
  async function requestUserPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async (): Promise<void> => {
    const token = await messaging().getToken();
    console.log('Token', token);
    await firestore().collection('Users').doc(auth().currentUser?.uid).update({
      fcmtoken: token,
    });
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, [auth().currentUser?.uid]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <RootStack />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;

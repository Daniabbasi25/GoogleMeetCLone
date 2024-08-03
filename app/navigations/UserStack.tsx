import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const UserStack = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}>
        <Text>UserStack = {auth().currentUser?.email}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserStack;

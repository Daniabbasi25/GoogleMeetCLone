import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useTheme} from '@react-navigation/native';

const GroupListScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const navigation = useNavigation();
  const {colors} = useTheme();
  useEffect(() => {
    const ALLDATA: any[] = [];
    firestore()
      .collection('Groups')
      .get()
      .then(querySnapshot => {
        console.log('Total Groups: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          ALLDATA.push(documentSnapshot.id, documentSnapshot.data());
        });
      });
    setData(ALLDATA);
  }, []);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}>
        <Text>UserStack = {auth().currentUser?.email}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateGroupScreen' as never)}
        style={[styles.floatingButton, {backgroundColor: colors.primary}]}>
        <Icon name="plus" size={40} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default GroupListScreen;

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

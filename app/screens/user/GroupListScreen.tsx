import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Avatar, Card, IconButton} from 'react-native-paper';

const GroupListScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const navigation = useNavigation();
  const {colors} = useTheme();
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Groups')
      .onSnapshot(
        querySnapshot => {
          const ALLDATA = [];
          querySnapshot.forEach(documentSnapshot => {
            ALLDATA.push({id: documentSnapshot.id, ...documentSnapshot.data()});
          });
          setData(ALLDATA);
          console.log('Updated Groups: ', ALLDATA);
        },
        error => {
          console.error('Error fetching real-time updates: ', error);
        },
      );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}>
        <Text>UserStack = {auth().currentUser?.email}</Text>
      </TouchableOpacity> */}

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View style={styles.card}>
            <Card.Title
              title={item?.name}
              left={props => (
                <Avatar.Image {...props} source={{uri: item.image}} />
              )}
            />
          </View>
        )}
      />
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
  card: {
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    marginTop: 5,
    borderBlockColor: 'gray',
  },
});

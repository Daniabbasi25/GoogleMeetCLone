import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Avatar, Card} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {GroupListItem} from 'components';

const GroupListScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const navigation = useNavigation();
  const {colors} = useTheme();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Groups')
      .onSnapshot(
        querySnapshot => {
          const ALLDATA: any[] = [];
          querySnapshot.forEach(documentSnapshot => {
            if (
              documentSnapshot
                .data()
                ?.members?.find(
                  (item: {status: string; id: string | undefined}) =>
                    item.id === auth().currentUser?.uid &&
                    item.status !== 'Reject',
                )
            )
              ALLDATA.push({
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
              });
          });
          setData(ALLDATA);
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
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyComponent}>
            <Text style={styles.emptyText}>No Group Found</Text>
          </View>
        )}
        renderItem={({item, index}) => (
          <GroupListItem index={index} item={item} />
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
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 18,
  },
});

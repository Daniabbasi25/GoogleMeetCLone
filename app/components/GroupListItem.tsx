import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Button, Card} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface Props {
  item: any;
  index: number;
}
const GroupListItem: FC<Props> = ({item}) => {
  const navigation = useNavigation();

  const MEMBER = item.members.find(
    (item: {id: string | undefined}) => item.id === auth().currentUser?.uid,
  );
  const handleStatusChange = async (status: String): Promise<void> => {
    const updatedMembers = item.members.map((member: any) => {
      if (member.id === MEMBER.id) {
        return {...member, status: status};
      }
      return member;
    });

    await firestore().collection('Groups').doc(item.id).update({
      members: updatedMembers,
    });
  };
  return (
    <TouchableOpacity
      disabled={MEMBER?.status === 'Pending'}
      onPress={() =>
        navigation.navigate(
          'ChatScreen' as never,
          {
            groupId: 'groupId',
            userId: 'userId',
            userToken: 'userToken',
          } as never,
        )
      }
      style={styles.card}>
      <Card.Title
        title={item?.name}
        left={props => <Avatar.Image {...props} source={{uri: item.image}} />}
        right={props =>
          MEMBER?.status === 'Pending' ? (
            <View>
              <Button
                textColor="green"
                onPress={() => handleStatusChange('Accept')}>
                Accept
              </Button>
              <Button
                textColor="red"
                onPress={() => handleStatusChange('Reject')}>
                Reject
              </Button>
            </View>
          ) : (
            <></>
          )
        }
      />
    </TouchableOpacity>
  );
};

export default GroupListItem;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    marginTop: 5,
    borderBlockColor: 'gray',
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button, Snackbar, Modal} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {UserFlatList} from 'components';

const CreateGroupScreen = ({navigation, route}: any) => {
  // const navigation = useNavigation();
  const [name, setname] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [groupid, setGroupId] = useState<string>('');

  const [snackMessage, setSnackMessage] = useState<string | undefined>(
    undefined,
  );

  const handleSave = async (): Promise<void> => {
    try {
      const userDoc = {
        name: name,
        image: `https://avatar.iran.liara.run/username?username=${name}`,
        members: [
          {
            id: auth().currentUser?.uid,
            email: auth().currentUser?.email,
            admin: true,
            status: 'Accept',
          },
        ],
      };

      const docref = await firestore().collection('Groups').add(userDoc);
      setGroupId(docref.id);
      setSnackMessage('Group Created Successful');
      // setTimeout(() => {
      //   navigation.goBack();

      // }, 300);
      setShowUserList(true);
    } catch (error) {
      console.error('Error during Creating Group:', error);
      setSnackMessage(String(error));
    }
  };

  const handleAddUser = async (id: string, email: string): Promise<void> => {
    const newMember = {
      id: id,
      email: email,
      admin: false,
      status: 'Pending',
    };

    try {
      await firestore()
        .collection('Groups')
        .doc(groupid)
        .update({
          members: firestore.FieldValue.arrayUnion(newMember),
        });
      setSnackMessage('Member added successfully');
      setData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error adding member to group:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .onSnapshot(
        querySnapshot => {
          const ALLDATA: any[] = [];
          querySnapshot.forEach(documentSnapshot => {
            if (documentSnapshot.id !== auth().currentUser?.uid) {
              ALLDATA.push({
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
              });
            }
          });
          setData(ALLDATA);
          console.log('Updated Users: ', ALLDATA);
        },
        error => {
          console.error('Error fetching real-time updates: ', error);
        },
      );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Create Group</Text>
      <TextInput
        value={name}
        onChangeText={e => setname(e)}
        mode="outlined"
        label="Name"
        placeholder="Type Name here"
        style={{
          height: 50,
          width: '90%',
        }}
      />

      <Button
        mode="contained"
        onPress={() => handleSave()}
        style={{borderRadius: 5}}>
        Save
      </Button>

      <Modal
        visible={showUserList}
        onDismiss={() => {}}
        contentContainerStyle={styles.modalStyle}>
        <UserFlatList
          data={data}
          rightButtonTitle="Add"
          onrightButtonPress={handleAddUser}
        />
        <Button
          mode="contained"
          onPress={() => {
            setShowUserList(false);
            navigation.goBack();
          }}
          style={{borderRadius: 5}}>
          Done
        </Button>
      </Modal>
      <Snackbar
        visible={snackMessage !== undefined}
        onDismiss={() => setSnackMessage(undefined)}
        action={{
          label: 'Undo',
        }}>
        {snackMessage}
      </Snackbar>
    </View>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  heading: {
    fontWeight: '600',
    fontSize: 24,
  },
  modalStyle: {
    backgroundColor: '#fff',
    height: '80%',
    width: '90%',
    alignSelf: 'center',
    padding: 5,
  },
});

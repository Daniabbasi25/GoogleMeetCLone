import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const CreateGroupScreen = ({navigation, route}: any) => {
  // const navigation = useNavigation();
  const [name, setname] = useState<string>('');

  const [snackMessage, setSnackMessage] = useState<string | undefined>(
    undefined,
  );

  const handleSave = async (): Promise<void> => {
    try {
      const userDoc = {
        name: name,
        image: `https://avatar.iran.liara.run/username?username=${name}`,
      };

      await firestore().collection('Groups').add(userDoc);

      setSnackMessage('Group Created Successful');
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    } catch (error) {
      console.error('Error during Creating Group:', error);
      setSnackMessage(String(error));
    }
  };

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
});

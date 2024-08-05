import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [snackMessage, setSnackMessage] = useState<string | undefined>(
    undefined,
  );
  const handleSignUp = async (): Promise<void> => {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);
      console.log('User signed up:', res.user);

      const userDoc = {
        email: res.user.email,
        image: `https://avatar.iran.liara.run/username?username=${res.user.email}`,
      };

      await firestore().collection('Users').doc(res.user.uid).set(userDoc);
      console.log('User document created:', userDoc);

      setSnackMessage('User signed up and logged in!');
    } catch (error) {
      console.error('Error during sign up or document creation:', error);
      setSnackMessage(String(error));
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Sign Up </Text>
      <TextInput
        value={email}
        onChangeText={e => setEmail(e)}
        mode="outlined"
        label="Email"
        placeholder="Type Email here"
        style={{
          height: 50,
          width: '90%',
        }}
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={e => setPassword(e)}
        mode="outlined"
        label="Password"
        placeholder="Type Password here"
        style={{
          height: 50,
          width: '90%',
        }}
        // secureTextEntry
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() => handleSignUp()}
        style={{borderRadius: 5}}>
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('LoginScreen' as never)}>
        Already have Account? Login
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

export default SignUpScreen;

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

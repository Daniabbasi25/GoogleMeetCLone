import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [snackMessage, setSnackMessage] = useState<string | undefined>(
    undefined,
  );

  const handleLogin = async (): Promise<void> => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSnackMessage('User signed in!');
      })
      .catch(error => {
        setSnackMessage(String(error));
      });
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Login</Text>
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
        onPress={() => handleLogin()}
        style={{borderRadius: 5}}>
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('SignUpScreen' as never)}>
        Don't have an account? SignUp
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

export default LoginScreen;

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

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput, Button} from 'react-native-paper';

const LoginScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
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
        onPress={() => console.log('Pressed')}
        style={{borderRadius: 5}}>
        Login
      </Button>
      <Button mode="text" onPress={() => console.log('first')}>
        Don't have an account? SignUp
      </Button>
      <Text></Text>
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

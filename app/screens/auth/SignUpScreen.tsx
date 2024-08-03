import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput, Button} from 'react-native-paper';

const SignUpScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Sign Up </Text>
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

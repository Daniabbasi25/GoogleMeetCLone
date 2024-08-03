import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {LoginScreen} from 'screens';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LoginScreen />
    </SafeAreaView>
  );
};

export default App;

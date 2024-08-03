import {SafeAreaView} from 'react-native';
import React from 'react';
import {RootStack} from 'navigations';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <RootStack />
    </SafeAreaView>
  );
};

export default App;

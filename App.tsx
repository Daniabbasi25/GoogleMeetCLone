import {SafeAreaView} from 'react-native';
import React from 'react';
import {RootStack} from 'navigations';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <RootStack />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;

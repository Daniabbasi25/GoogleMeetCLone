import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen, CreateGroupScreen, GroupListScreen} from 'screens';
const Stack = createNativeStackNavigator();

const CreateGroupStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GroupListScreen" component={GroupListScreen} />
      <Stack.Screen name="CreateGroupScreen" component={CreateGroupScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default CreateGroupStack;

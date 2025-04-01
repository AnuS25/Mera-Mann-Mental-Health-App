import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoodTrackerBingofirst from './MoodTrackerBingofirst';
import MoodTrackerreminder from './MoodTrackerreminder';
const Stack = createStackNavigator();

export default function MoodTrackerBingoScreen() {
  return (
    
      <Stack.Navigator initialRouteName="MoodTrackerBingofirst">
        <Stack.Screen name="MoodTrackerBingofirst" component={MoodTrackerBingofirst} />
        <Stack.Screen name="TaskReminderSettings" component={MoodTrackerreminder} />
      </Stack.Navigator>
    
  );
}

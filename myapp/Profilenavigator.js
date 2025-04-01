import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MoodHistory from './src/screen/MoodTrackerScreen';
import LoginScreen from './src/screen/LoginScreen';
//import UpdateProfile from './src/screen/UpdateProfile' ;
import AccountScreen from './src/screen/AccountScreen';
import ProfileDetails from './src/screen/ProfileDetails.jsx'
import TrackingDataScreen from './src/screen/TrackingScreen.jsx';
import RecordsScreen from './src/screen/RecordsScreen.jsx';
import StreaksScreen from './src/screen/StreaksScreen.js';
import TaskReminderSettings from './src/screen/TaskReminderSettings.jsx';
const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    
      <Stack.Navigator>
      <Stack.Screen initialRouteName="ProfilePage"
          options={{headerShown: false}}
          name="ProfilePage"
          component={AccountScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Moodhistory"
          component={MoodHistory}
        />
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="UpdateProfile"
          component={UpdateProfile}
        /> */}
        <Stack.Screen
          options={{headerShown: false}}
          name="ProfileDetails"
          component={ProfileDetails}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TrackingHistory"
          component={TrackingDataScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Record"
          component={RecordsScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Streaks"
          component={StreaksScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Daily Reminder"
          component={TaskReminderSettings}
        />
      </Stack.Navigator>
    
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({});
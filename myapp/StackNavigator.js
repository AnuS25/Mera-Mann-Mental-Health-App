import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MealPlannerScreen from './src/screen/MealPlannerScreen';
import MenuScreen from './src/screen/MenuScreen'; 

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={MealPlannerScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Menu"
          component={MenuScreen}
        />
      </Stack.Navigator>
    
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
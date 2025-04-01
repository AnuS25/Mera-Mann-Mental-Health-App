import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import JournalScreen from "./src/screen/JournalScreen";
import AddJournalScreen from "./src/screen/AddJournalScreen";
import EditJournalScreen from "./src/screen/EditJournalScreen";

const Stack = createStackNavigator();

const JournalStack = () => {
  return (
    
      <Stack.Navigator initialRouteName="JournalScreen">
        <Stack.Screen name="JournalScreen" component={JournalScreen} />
        <Stack.Screen name="AddJournal" component={AddJournalScreen} />
        <Stack.Screen name="EditJournal" component={EditJournalScreen} />
      </Stack.Navigator>
   
  );
};

export default JournalStack;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoodMemoryGame from './src/screen/MoodMemoryGame';
import MoodTrackerBingoScreen from './src/screen/MoodTrackerBingoScreen';
import AffirmationMatchGame from './src/screen/AffirmationMatchGame';
import AffirmationWheel from './src/screen/AffirmationWheel';
import BreathingGame from './src/screen/BreathingGame';
import GratitudeGarden from './src/screen/GratitudeGarden';
import QuizGame from './quiznavigator';
import TherapeuticWordSearch from './src/screen/TherapeuticWordSearch';
import ModulesPage from './src/screen/ModulesPages';
const Stack = createStackNavigator();

const GameNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="ModulesPage" component={ModulesPage} />
            <Stack.Screen name="MoodTrackerBingoScreen" component={MoodTrackerBingoScreen} />
            <Stack.Screen name="TherapeuticWordSearch" component={TherapeuticWordSearch} />
            <Stack.Screen name="AffirmationMatchGame" component={AffirmationMatchGame} />
            <Stack.Screen name="GratitudeGarden" component={GratitudeGarden} />
            <Stack.Screen name="BreathingGame" component={BreathingGame} />
            <Stack.Screen name="AffirmationWheel" component={AffirmationWheel} />
            <Stack.Screen name="MoodMemoryGame" component={MoodMemoryGame} />
            <Stack.Screen name="QuizGame" component={QuizGame} />
        </Stack.Navigator>
    );
};

export default GameNavigator;

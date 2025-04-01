//import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuizScreen from './src/screen/QuizScreen';
import QuizHome from './src/screen/QuizHome';
import QuizResults from './src/screen/QuizResult';
const Stack = createStackNavigator();

export default function QuizGame() {
  return (
   
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={QuizHome} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="ResultsScreen" component={QuizResults} />
      </Stack.Navigator>

  );
}

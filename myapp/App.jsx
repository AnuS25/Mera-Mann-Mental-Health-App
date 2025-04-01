import { StyleSheet, Text, View,Button,Modal,TouchableOpacity,SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
   } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView

import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SignupScreen from './src/screen/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createDrawerNavigator,DrawerContent} from '@react-navigation/drawer';
//import Explore from './sr./src/screen/ExploreScreen';
//import Home from './src/screen/UserScreen';
import Task from './src/screen/TaskScreen';
//import DailyScreen from './src/screen/DailyScreen'
import ExploreScreen from './src/screen/MenuScreen';
import TaskScreen from './src/screen/TaskScreen';
import DailyScreen from './src/screen/MealPlannerScreen';
//import Home from './src/screen/UserScreen';
import MoodTracker from './src/screen/MoodTrackerScreen';
import { AuthProvider, useAuth } from './src/screen/Auth';
import AppHome from './src/screen/UserScreen';
import MealPlannerScreen from './src/screen/MealPlannerScreen';
//import { ModalPortal } from 'react-native-modals';
import StackNavigator from './StackNavigator';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MoodHistory from './src/screen/MoodTrackerScreen';
import ProfileNavigator from './Profilenavigator';
import HabitTrackerScreen from './src/screen/HabitTracker';
import JournalStack from './JournalStackNavigator';
import ModulesPage from './src/screen/ModulesPages';
import GameNavigator from './gamesnavigator';
// const StackNav = () => {
//   const Stack = createNativeStackNavigator();
//   const navigation = useNavigation();
//   return (
//     <Stack.Navigator initialRouteName='Home'
//       screenOptions={{
//         statusBarColor: '#0163d2',
//         headerShown: false,
//         headerStyle: {
//           backgroundColor: '#0163d2',
//         },
//         headerTintColor: '#fff',
//         headerTitleAlign: 'center',
//       }}>
//       {/* <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={
//           {
//             headerLeft: () => {
//               return (
//                 <Icon
//                   name="menu"
//                   //onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//                   size={30}
//                   color="#fff"
//                 />
//               );
//             },
//           }
//         }
//       /> */}
//       {/* <Stack.Screen name="LOGIN" component={LoginScreen}/>
//       <Stack.Screen name='SIGNUP' component={SignupScreen}/> */}
//       <Stack.Screen name="PROFILE" component={ProfileScreen} />
//       <Stack.Screen
//         name="User"
//         component={Home}
//         options={{
//           headerShown: true,
//         }}
//       />
//       <Stack.Screen name="Mood Tracker" component={MoodTracker}/>
//       {/* <Stack.Screen
//         name="UpdateProfile"
//         component={ProfileScreen}
//         options={{
//           headerShown: false,
//         }}
//       /> */}
//       {/* <Stack.Screen name="LoginUser" component={LoginNav} /> */}
//     </Stack.Navigator>
//   );
// };



// function App() {
//   const Stack = createNativeStackNavigator();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userType, setUserType] = useState('');
// const Tab = createBottomTabNavigator();

//   async function getData() {
//     const data = await AsyncStorage.getItem('isloggedin');
//     const userType1 = await AsyncStorage.getItem('usertype');
//     console.log(data, 'at app.jsx');
//     setIsLoggedIn(data === 'true'); // Convert to boolean
//     setUserType(userType1);
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <NavigationContainer>
//       {isLoggedIn ? (
//         userType === 'Admin' ? (
//           <StackNav />
//         ) : (
//           <Tab.Navigator screenOptions={{ headerShown: false }}>
//             <Tab.Screen name="User" component={Home} />
//             <Tab.Screen name="Explore" component={ExploreScreen} />
//             <Tab.Screen name="Task" component={TaskScreen} />
//             <Tab.Screen name="Daily" component={DailyScreen} />
//             <Tab.Screen name="PROFILE" component={ProfileScreen} />
//           </Tab.Navigator>
//         )
//       ) : (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//           <Stack.Screen name="LOGIN" component={LoginScreen} />
//           <Stack.Screen name="SIGNUP" component={SignupScreen} />
//           <Stack.Screen name="PROFILE" component={ProfileScreen} />
//         </Stack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// }
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
function Section({children, title}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
const AppTabs = () => (
  <Tab.Navigator 
    screenOptions={{ headerShown: false }} 
    initialRouteName='AppHome'
  >
    <Tab.Screen 
      name="AppHome" 
      component={AppHome} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Task" 
      component={HabitTrackerScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="check" color={color} size={size} />
        ),
      }} 
    />
    <Tab.Screen 
      name="MealPlanner" 
      component={StackNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="book" color={color} size={size} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Journal" 
      component={JournalStack} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="edit" color={color} size={size} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Games" 
      component={GameNavigator} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="game-controller" color={color} size={size} />
        ),
      }} 
    />
  </Tab.Navigator>
);

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [userType, setUserType] = useState('');
  const { isLoggedIn, checkLoginStatus } = useAuth();  // Access auth context
    const [loading, setLoading] = useState(true); // Declare loading state

//const navigation = useNavigation();
  // async function getData() {
  //   const data = await AsyncStorage.getItem('isloggedin');
  //   const userType1 = await AsyncStorage.getItem('usertype');
  //   console.log(data, 'at app.jsx');
  //   setIsLoggedIn(data === 'true'); // Convert to boolean
  //   setUserType(userType1);
  // }

  // useEffect(() => {
  //   //getData();
  //   checkLoginStatus();
  // }, []);
    
  
// useEffect(() => {
  
//     checkLoginStatus();  // Check login status on app load
//     if (!isLoggedIn) {
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'LOGIN' }],
//     });
//   }
//   }, [checkLoginStatus, isLoggedIn]);

  //   return (
  //   <NavigationContainer>
  //     {isLoggedIn ? (
  //       <Tab.Navigator screenOptions={{ headerShown: false }}>
  //         <Tab.Screen name="AppHome" component={AppHome} />
  //         <Tab.Screen name="Explore" component={ExploreScreen} />
  //         <Tab.Screen name="Task" component={TaskScreen} />
  //         <Tab.Screen name="Daily" component={DailyScreen} />
  //         <Tab.Screen name="PROFILE" component={ProfileScreen} />
          
  //       </Tab.Navigator>
  //     ) : (
  //       <Stack.Navigator screenOptions={{ headerShown: false }}>
  //         <Stack.Screen name="HomeScreen" component={HomeScreen} />
  //         <Stack.Screen name="LOGIN" component={LoginScreen} />
  //         <Stack.Screen name="SIGNUP" component={SignupScreen} />
  //         <Stack.Screen name="PROFILE" component={ProfileScreen} />
  //       </Stack.Navigator>
  //     )}
  //   </NavigationContainer>
  // );
useEffect(() => {
  const checkLogin = async () => {
    // Perform the login check
    await checkLoginStatus();  // This function should set isLoggedIn correctly
    setLoading(false);
  };
    // After login check, navigate if not logged in
    // if (!isLoggedIn) {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'LOGIN' }],
    //   });
    // }
  //};

  checkLogin();  // Call the async function to handle login status check

}, [checkLoginStatus]);
console.log("isLoggedIn:", isLoggedIn);  // Add this log to see if the state is correct

  
if (loading) {
    return <></>; // Optionally show a loading spinner here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          
            <Stack.Screen name="AppTabs" component={AppTabs} />
           
            
        ) : (
          <>
            <Stack.Screen name="LOGIN" component={LoginScreen} />
            <Stack.Screen name="SIGNUP" component={SignupScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//const Tab = createBottomTabNavigator();


//export default App;
export default function WrappedApp() {
  return (
        <GestureHandlerRootView style={{ flex: 1 }}> {/* Wrap your app with GestureHandlerRootView */}

    <AuthProvider>
      <App />
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
//export default App;

   //<Toast config={toastConfig} />
   const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


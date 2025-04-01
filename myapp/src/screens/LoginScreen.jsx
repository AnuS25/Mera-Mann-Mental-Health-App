import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../utils/colors';
import { useNavigation,NavigationContainer,DrawerActions } from '@react-navigation/native';
import axios from 'axios'; // Add this import statement for axios
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './Auth';
import { ScrollView } from 'react-native-gesture-handler';

const LoginScreen = () => {
  const navigation = useNavigation();
    const { login } = useAuth();  // Access the login function from context

  const [secureentry, setsecureentry] = useState(true);
  const [email, setEmail] = useState(""); // Define email state
  const [password, setPassword] = useState(""); // Define password state

  // const handlegoback = () => {
  //   navigation.goBack();
  // };
const handlegoback = () => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    // If there's no screen to go back to, navigate to a specific screen (e.g., Home or Login)
    navigation.navigate('HomeScreen'); // Or replace with the route you want
  }
};
  const handleSignup = () => {
    navigation.navigate("SIGNUP");
  };

  const handlesubmit = async () => {
    console.log("Email:", email); // Log email
    console.log("Password:", password); // Log password
    const userdata ={ email, password };

    try {
      const res = await axios.post("https://mentalapp-backend.onrender.com/login", userdata);
      if (res.data.status === "ok") {
        Alert.alert("Logged in Successfully");
        AsyncStorage.setItem("token", res.data.data);
        console.log("Token saved:", res.data.data);  // Log the token
        AsyncStorage.setItem('isloggedin',JSON.stringify(true));
         //await AsyncStorage.setItem('userData', JSON.stringify(res.data.user)); // Store user data
      console.log("Token saved:", res.data.data); // Print token to console
//navigation.navigate("AppTabs");
        //navigation.navigate("Profile");
        await login(userdata);
    //     navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'AppTabs' }],
    // });
    navigation.replace('AppTabs');

      } else {
        Alert.alert("Login failed", "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      if (error.response) {
      console.log("Error response:", error.response.data);
      Alert.alert("Error", `Something went wrong: ${error.response.data.message || "Please try again."}`);
    } else {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity style={styles.backbuttonwrapper} onPress={handlegoback}>
        <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.textcontainer}>
        <Text style={styles.headingtext}>Hey,</Text>
        <Text style={styles.headingtext}>Welcome</Text>
        <Text style={styles.headingtext}>Back</Text>
      </View>
      <View style={styles.formcontainer}>
        <View style={styles.inputcontainer}>
          <Ionicons name={"mail-outline"} size={30} color="#D3D3D3" />
          <TextInput
            style={styles.textinput}
            placeholder="Enter your email"
            placeholderTextColor={"#D3D3D3"}
            keyboardType="email-address"
            value={email} // Bind value to email state
            onChangeText={(text) => setEmail(text)} // Update email state
          />
        </View>
        <View style={styles.inputcontainer}>
          <SimpleLineIcons name={"lock"} size={30} color="#D3D3D3" />
          <TextInput
            style={styles.textinput}
            placeholder="Enter your password"
            placeholderTextColor={"#D3D3D3"}
            secureTextEntry={secureentry}
            value={password} // Bind value to password state
            onChangeText={(text) => setPassword(text)} // Update password state
          />
          <TouchableOpacity onPress={() => setsecureentry((prev) => !prev)}>
            <SimpleLineIcons name={"eye"} size={20} color="#D3D3D3" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotpasswordtext}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginbuttonwrapper} onPress={handlesubmit}>
          <Text style={styles.logintext}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.continue}>or continue with</Text>
        <TouchableOpacity style={styles.googlebuttoncontainer}>
          <Image source={require("../assets/google.jpg")} style={styles.googleimage} />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footercontainer}>
          <Text style={styles.accounttext}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signuptext}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  backbuttonwrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    backgroundColor: "#808080",
    borderRadius: 20,
  },
  textcontainer: {
    marginVertical: 20,
  },
  headingtext: {
    fontSize: 32,
    color: "#000000",
  },
  formcontainer: {
    marginTop: 20,
  },
  inputcontainer: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textinput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  forgotpasswordtext: {
    textAlign: "right",
    color: "#000000",
    marginVertical: 10,
  },
  loginbuttonwrapper: {
    backgroundColor: "#000000",
    borderRadius: 100,
    marginTop: 20,
  },
  logintext: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  continue: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    color: "#000000",
  },
  googlebuttoncontainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleimage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
  },
  footercontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accounttext: {
    color: "#000000",
  },
  signuptext: {
    color: "#000000",
  },
});

import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureentry, setsecureentry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState(""); // New state for name

  const [errors, setErrors] = useState([]); // For storing validation errors
  const [usertype,setusertype]=useState('');
  const [secrettext, setsecrettext]=useState('');

  // Email and phone validation regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^[0-9]{10}$/;

  // Validation before making the signup request
  const validateForm = () => {
    let validationErrors = [];
if (!name) {
      validationErrors.push("Name is required.");
    }
    if (!email || !emailRegex.test(email)) {
      validationErrors.push("Please enter a valid email address.");
    }

    if (!phone || !phoneRegex.test(phone)) {
      validationErrors.push("Phone number must be 10 digits.");
    }

    if (!password) {
      validationErrors.push("Password is required.");
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  // Handle signup process
  const handleSignup = async () => {
    if (!validateForm()) {
      return; // Stop submission if there are validation errors
    }
const userdata = { name, email, password, phone };
  console.log("Sending data:", userdata);

    
    try {
      const response = await axios.post("https://mentalapp-backend.onrender.com/signup", userdata);
      if (response.data.status === "ok") {
        console.log("Signup successful:", response.data);
        navigation.navigate("LOGIN");
      } else {
        console.error("Signup failed:", response.data);
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      alert("An error occurred during signup.");
    }
  };

  const handlegoback = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  return (
    <ScrollView>
    <View style={styles.container}>
    
    <View style={styles.action}>
      <FontAwesome
        name="user-o"
        color="#420475"
        style={StyleSheet.smallIcon}
      />
      <TextInput 
        placeholder="Secret Text" style={styles.textinput} onChange={e=>setsecrettext(e.nativeEvent.text)}
      />
    </View>
      <TouchableOpacity style={styles.backbuttonwrapper} onPress={handlegoback}>
        <Ionicons name="arrow-back-outline" color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.textcontainer}>
        <Text style={styles.headingtext}>Let's get</Text>
        <Text style={styles.headingtext}>started</Text>
      </View>
      <View style={styles.formcontainer}>
      <View style={styles.inputcontainer}>
          <Ionicons name="person-outline" size={30} color="#D3D3D3" />
          <TextInput
            style={styles.textinput}
            placeholder="Enter your name"
            placeholderTextColor="#D3D3D3"
            value={name}
            onChangeText={(text) => setName(text)} // Handle name input
          />
        </View>
        <View style={styles.inputcontainer}>
          <Ionicons name="mail-outline" size={30} color="#D3D3D3" />
          <TextInput
            style={styles.textinput}
            placeholder="Enter your email"
            placeholderTextColor="#D3D3D3"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputcontainer}>
          <SimpleLineIcons name="lock" size={30} color="#D3D3D3" />
          <TextInput
            style={styles.textinput}
            placeholder="Enter your password"
            placeholderTextColor="#D3D3D3"
            secureTextEntry={secureentry}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setsecureentry((prev) => !prev)}>
            <SimpleLineIcons name="eye" size={20} color="#D3D3D3" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputcontainer}>
          <SimpleLineIcons name="screen-smartphone" size={30} color="#D3D3D3" />
          <TextInput
            style={styles.textinput}
            placeholder="Enter your phone no."
            placeholderTextColor="#D3D3D3"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>

        {/* Displaying validation errors */}
        {errors.length > 0 && (
          <View style={styles.errorContainer}>
            {errors.map((error, index) => (
              <Text key={index} style={styles.errorText}>{error}</Text>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.loginbuttonwrapper} onPress={handleSignup}>
          <Text style={styles.logintext}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.continue}>or continue with</Text>
        <TouchableOpacity style={styles.googlebuttoncontainer}>
          <Image source={"../assets/google.jpg"} style={styles.googleimage} />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footercontainer}>
          <Text style={styles.accounttext}>Already have an account!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signuptext}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default SignupScreen;

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
  errorContainer: {
    marginVertical: 10,
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "#721c24",
    fontSize: 14,
  },
});

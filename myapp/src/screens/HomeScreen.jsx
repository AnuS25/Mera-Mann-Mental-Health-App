import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
    const navigation= useNavigation();
    const handleLogin=()=>{
        navigation.navigate("LOGIN");
    }
    const handleSignup=()=>{
        navigation.navigate("SIGNUP");
    }
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      <Image source={require("../assets/girl.png")} style={styles.bannerimg}/>
      <Text style={styles.title}>Khushiyon Ka Saathi - MERA MANN</Text>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={[
            styles.loginbuttonwrapper,
            {backgroundColor:colors.primary},
            ]}
            onPress={handleLogin}
            >
            <Text style={styles.loginbuttontext}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginbuttonwrapper]} onPress={handleSignup}>
            <Text style={styles.signupbuttontext}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
        alignItems:"center",
    },
    logo:{
        height:80,
        width:100,
        marginVertical:20,
    },
    bannerimg:{
        height:400,
        width:500,
    },
    title:{
        fontSize:33,
        paddingHorizontal:20,
        textAlign:"center",
        color:colors.primary,
        marginVertical:20,
        marginTop:40,

    },
    buttoncontainer:{
        marginTop:20,
        flexDirection:"row",
        borderWidth:1,
        borderColor:colors.primary,
        width:"85%",
        height:60,
        borderRadius:100,

    },
    loginbuttonwrapper:{
        justifyContent:"center",
        alignItems:"center",
        width:"50%",
        
        borderRadius:98,
    },
    loginbuttontext:{
        color:"#FFFFFF",
        fontSize:18,
    },
    signupbuttontext:{
        fontSize:18,
    }
});
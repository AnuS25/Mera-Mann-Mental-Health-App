// import React, { createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // Create the context
// const AuthContext = createContext();

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);

// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   //const [userData, setUserData] = useState(null); // State to hold user data
//   //const [loading, setLoading] = useState(true); // Loading state

//   // Function to check if the user is logged in
//   const checkLoginStatus = async () => {
//     const data = await AsyncStorage.getItem('isloggedin');
//     setIsLoggedIn(data === 'true');
//   };
//   //   if (data === 'true') {
//   //     // Fetch the user data if logged in
//   //     const storedUserData = await AsyncStorage.getItem('userData');
//   //     if (storedUserData) {
//   //       setUserData(JSON.parse(storedUserData)); // Set user data if available
//   //     }
//   //     setIsLoggedIn(true);
//   //   } else {
//   //     setIsLoggedIn(false);
//   //   }
//   //   setLoading(false); // Once loading is complete, set loading to false
//   // };

//   // Login function
//   const login = async () => {
//     try {
//       const res = await axios.post("https://mentalapp-backend.onrender.com/login", userdata);
//       if (res.data.status === "ok") {
//         alert("Logged in Successfully");
//         AsyncStorage.setItem("token", res.data.data);
//         AsyncStorage.setItem('isloggedin', JSON.stringify(true));
//         //AsyncStorage.setItem('userData', JSON.stringify(res.data.user)); // Store user data

//         // Update context after login
//         setIsLoggedIn(true);
//         //setUserData(res.data.user);
//       } else {
//         alert("Login failed", "Invalid email or password");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("Error", "Something went wrong. Please try again.");
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     await AsyncStorage.removeItem('isloggedin');
//     //await AsyncStorage.removeItem('userData');
//     setIsLoggedIn(false); // Update the login status to false
//     //setUserData(null); // Clear user data from context
//   };

//   useEffect(() => {
//     checkLoginStatus(); // Check login status on app start
//   }, []);

//   // if (loading) {
//   //   return null; // Return nothing or a loading indicator while checking login status
//   // }

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, logout, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// import React, { createContext, useState, useContext,useEffect  } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView

// // Create the context
// const AuthContext = createContext();

// // Custom hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);
//   //const [userData, setUserData] = useState(null); // Store user data in the context

// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
// const [userData, setUserData] = useState(null); // Optional, if you want to store user info

//   // Function to check if the user is logged in
//   const checkLoginStatus = async () => {
//     const data = await AsyncStorage.getItem('isloggedin');
//     setIsLoggedIn(data === 'true');
//   };

// // const login = async (userdata) => {
// //     try {
// //       const res = await axios.post("https://mentalapp-backend.onrender.com/login", userdata);
// //           console.log("Login response:", res.data);

// //       if (res.data.status === "ok") {
// //         alert("Logged in Successfully");
// //         AsyncStorage.setItem("token", res.data.data);
// //         AsyncStorage.setItem('isloggedin', JSON.stringify(true));
// //         //AsyncStorage.setItem('userData', JSON.stringify(res.data.user)); // Store user data
// // if (res.data.user) {
// //         await AsyncStorage.setItem('userData', JSON.stringify(res.data.user)); // Store user data
// //         console.log("User data saved:", res.data.user); // Log user data for debugging
// //       } else {
// //         console.error("User data is missing or invalid:", res.data.user);
// //       }
// // const savedToken = await AsyncStorage.getItem("token");
// //       console.log("Token saved in context:", savedToken);  // Print token from AsyncStorage

// //         // Update context after login
// //         setIsLoggedIn(true);  // Update context here
// //         setUserData(res.data.user); // Set user data in context

// //       } else {
// //         alert("Login failed", "Invalid email or password");
// //       }
// //     } catch (error) {
// //       console.error("Error during login:", error);
// //       alert("Error", "Something went wrong. Please try again.");
// //     }
// //   };


//   // Function to handle logout
  
//   const login = async (userdata) => {
//   try {
//     const res = await axios.post("https://mentalapp-backend.onrender.com/login", userdata);

//     // Log the response for debugging
//     console.log("Login response:", res);

//     if (res.data.status === "ok") {
//       alert("Logged in Successfully");

//       // Save the token to AsyncStorage
//       await AsyncStorage.setItem("token", res.data.data);

//       // Save login status to AsyncStorage
//       await AsyncStorage.setItem('isloggedin', JSON.stringify(true));

//       // Check if userData exists and is valid before saving it
//       if (res.data.user && res.data.user !== null) {
//         await AsyncStorage.setItem('userData', JSON.stringify(res.data.user)); // Store user data
//         console.log("User data saved:", res.data.user); // Log user data for debugging
//       } else {
//         console.error("Error: User data is missing or invalid", res.data.user);
//         alert("Error: User data is missing or invalid");
//       }

//       // Optionally log the token to verify it's saved
//       const savedToken = await AsyncStorage.getItem("token");
//       console.log("Token saved in context:", savedToken);

//       // Update context after login
//       setIsLoggedIn(true); // Update context here
//       setUserData(res.data.user); // Set user data in context

//     } else {
//       alert("Login failed", "Invalid email or password");
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     alert("Error", "Something went wrong. Please try again.");
//   }
// };

  
//   const logout = async () => {
//     await AsyncStorage.removeItem('isloggedin');
//         await AsyncStorage.removeItem('userData'); // Remove user data as well
//     await AsyncStorage.removeItem('token'); // Remove token

//     //await AsyncStorage.removeItem('usertype');
//     setIsLoggedIn(false); // Update the login status to false
//         setUserData(null); // Reset userData in context

//   };
//  useEffect(() => {
//     checkLoginStatus(); // Check login status when app starts
//  const loadUserData = async () => {
//       const storedToken = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage

//     if (storedToken) {
//       console.log("Token loaded from AsyncStorage:", storedToken); // Log the token
//     }


//       const storedUserData = await AsyncStorage.getItem('userData');
//           console.log("Stored user data from AsyncStorage:", storedUserData); // Add this log

//       if (storedUserData) {
//         setUserData(JSON.parse(storedUserData)); // Load user data from AsyncStorage
//       }else {
//       console.log("No user data found in AsyncStorage");
//     }
//     };
//   loadUserData();
//   }, []); // Empty dependency array ensures it runs once
// // Inside AuthProvider.js or wherever you're managing authentication
// const fetchUserData = async () => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     if (!token) {
//       console.log("No token found.");
//       return;
//     }

//     const response = await axios.get('https://your-api-url.com/userdata', {
//       headers: {
//         Authorization: `Bearer ${token}`, // Use token in header
//       },
//     });

//     console.log('User Data:', response.data);
//     setUserData(response.data); // Store fetched user data in the context
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };

// useEffect(() => {
//   fetchUserData(); // Call this function when the component mounts or when the token is available
// }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn,userData, checkLoginStatus,fetchUserData, logout,login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useContext,useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data

  // Function to check if the user is logged in
  const checkLoginStatus = useCallback(async () => {
    const data = await AsyncStorage.getItem('isloggedin');
    setIsLoggedIn(data === 'true');
    if (data === 'true') {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        fetchUserData(token); // Fetch user data after checking login status
      }
    }
  }, []);  // Empty dependency array means it only gets created once

  // Fetch user data from the backend
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("https://mentalapp-backend.onrender.com/profile", {
        headers: {
          'Authorization': `Bearer ${token}`  // Sending token in header for authentication
        }
      });
      
      if (response.data && response.data.status === 'ok') {
        setUserData(response.data.data);  // Assuming user data is in response.data.data
      } else {
        console.log('Failed to fetch user data');
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // Login function
  const login = async (userdata) => {
    try {
      const res = await axios.post("https://mentalapp-backend.onrender.com/login", userdata);

      if (res.data.status === "ok") {
        alert("Logged in Successfully");

        // Save the token and login status to AsyncStorage
        await AsyncStorage.setItem("token", res.data.data);
        await AsyncStorage.setItem('isloggedin', JSON.stringify(true));

        // Update the context
        setIsLoggedIn(true);
      } else {
        alert("Login failed", "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Logout function
  const logout = async () => {
    await AsyncStorage.removeItem('isloggedin');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userData'); // Remove stored user data

    // Update the context
    setIsLoggedIn(false);
        setUserData(null); // Clear user data on logout

  };

  // Check login status on initial load
  useEffect(() => {
    checkLoginStatus(); // Check login status when app starts
  }, [checkLoginStatus]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, checkLoginStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

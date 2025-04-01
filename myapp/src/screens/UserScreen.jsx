// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// const AppHome = () => {
//   const navigation = useNavigation();
// // const handleStartJournal = () => {
// //     // Navigate to JournalPage
// //     navigation.navigate('JournalScreen');
// //   };
// //   const Mood = require('https://mentalapp-backend.onrender.com/moods');
// // const saveMood = async (userId, mood, note = '') => {
// //   try {
// //     const newMood = new Mood({ userId, mood, note });
// //     await newMood.save();
// //     console.log('Mood saved:', newMood);
// //   } catch (error) {
// //     console.error('Error saving mood:', error);
// //   }
// // };
// // const saveMood = async (userId, mood, note = '') => {
// //     try {
// //       const token = await AsyncStorage.getItem('token');
// //       if (!token) {
// //         alert('User is not logged in!');
// //         navigation.navigate('LOGIN');
// //         return;
// //       }
// //       const response = await axios.post("https://mentalapp-backend.onrender.com/moods",  {
// //         // method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
      
// //         body: JSON.stringify({userId, mood, note }),
// //       });
// //       const responseText = await response.text(); // Get response as text 
// //       console.log('Response Status:', response.status); 
// //       console.log('Response Text:', responseText);

// //       if (response.ok) {
// //         alert('Mood saved successfully!');
// //       } else {
// //         alert(`Failed to save mood: ${responseText}`);
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };
// const [todoList, setTodoList] = useState([]);
//   const [morningRoutine, setMorningRoutine] = useState({
//     meditation: false,
//     breakfast: false,
//     vitamins: false,
//   });
//   const [waterIntake, setWaterIntake] = useState(0);
//   const [gratitude, setGratitude] = useState("");
//   const [sleepHours, setSleepHours] = useState(0);
//   const [productivity, setProductivity] = useState(0);
//   const [mood, setMood] = useState("");
// const userId = "679667b065de96ebd1d7d086"
// const saveMood = async ( mood, note = '') => {
//   try {
//     const token = await AsyncStorage.getItem('token');
//     console.log('Token:', token);
//     if (!token) {
//   alert('User is not logged in!');
//   navigation.navigate('LOGIN');
//   return;
// }
// //       const userId = await AsyncStorage.getItem('userId'); // Get userId from AsyncStorage
// //     if (!userId) {
// //       alert('User ID is missing!');
// //       // Navigate to the login screen if userId is missing
// //       navigation.reset({
// //         index: 0,
// //         routes: [{ name: 'LOGIN' }],
// //       });
// //       return;
// //     }
// //  console.log('Sending mood data:', { userId, mood, note });
//     // Send POST request
//     const response = await axios.post(
//       "https://mentalapp-backend.onrender.com/moods",
//       {  mood, note },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log('Response Status:', response.status);
//     console.log('Response Data:', response.data);

//     if (response.status === 200) {
//       alert('Mood saved successfully!');
//     } else {
//       alert(`Failed to save mood: ${response.data.message}`);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     alert('An error occurred while saving the mood.');
//   }
// };

  

//  const handleEmojiClick = async (mood) => {
  
//   try {
//     // Get the user ID from AsyncStorage or wherever it's stored
// //     const token = await AsyncStorage.getItem('userId');
// //     if (!token) {
// //       alert('User ID is missing!');
// //       //navigation.navigate('LOGIN');
// //       navigation.reset({
// //   index: 0,
// //   routes: [{ name: 'LOGIN' }],
// // });
// // //navigation.replace('LOGIN');
// //       return;
// //     }

//     // Call saveMood with proper parameters
//     await saveMood(mood);  // Pass the correct userId and mood
//   } catch (error) {
//     console.error('Error during emoji click:', error);
//   }
// };

//  const handleSave = () => {
//     const data = {
//       userId,
//       todoList,
//       morningRoutine,
//       waterIntake,
//       gratitude,
//       sleepHours,
//       productivity,
//       mood,
//     };

//     axios.post("/api/tracking", data).then((response) => {
//       console.log("Data saved!", response.data);
//     });
//   };
//   return (
//     <ScrollView style={styles.container}>
      

//       {/* Greeting Section */}
//       <Text style={styles.greetingText}>Hey Anisha Sailoni</Text>
//       <Text style={styles.subText}>How are you feeling?</Text>
//       <Text style={styles.subTextSmall}>Identify and track your emotions</Text>

//       {/* Emotion Tracker */}
//       <View style={styles.emotionTracker}>
//         {["😡", "😟", "😐", "😊", "😌"].map((emoji, index) => (
//           <TouchableOpacity key={index} onPress={() => handleEmojiClick(emoji)}>
//             <Text style={styles.emotion}>{emoji}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//        <Text style={styles.sectionTitle}>Mental Health Tracking</Text>
//       <TouchableOpacity onPress={() => navigation.navigate('TrackingScreen')} style={styles.taskCard}>
//         <Text style={styles.taskTitle}>Go to Mental Health Tracker</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f7f4",
//     paddingHorizontal: 16,
//   },
//   searchBar: {
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     marginVertical: 16,
//     fontSize: 16,
//     color: "#000",
//   },
//   greetingText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 4,
//     color: "#000",
//   },
//   subText: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#555",
//   },
//   subTextSmall: {
//     fontSize: 14,
//     color: "#888",
//   },
//   emotionTracker: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 16,
//   },
//   emotion: {
//     fontSize: 28,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginVertical: 12,
//   },
//   taskList: {
//     marginVertical: 8,
//   },
//   taskCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   taskTitle: {
//     fontSize: 16,
//     color: "#000",
//   },
//   taskStatus: {
//     fontSize: 14,
//     color: "#888",
//   },
//   taskDuration: {
//     fontSize: 14,
//     color: "#888",
//   },
//   showAllButton: {
//     alignItems: "center",
//     marginVertical: 8,
//   },
//   showAllText: {
//     fontSize: 16,
//     color: "#007BFF",
//   },
//   journeyCards: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   journeyCard: {
//     width: "48%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   cardTitle: {
//     fontSize: 16,
//     color: "#000",
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: "#888",
//   },
//   sessionCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 16,
//     marginVertical: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sessionButton: {
//     backgroundColor: "#007BFF",
//     borderRadius: 10,
//     padding: 12,
//     marginTop: 8,
//     alignItems: "center",
//   },
//   sessionButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   journalCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 16,
//     marginVertical: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   journalButton: {
//     backgroundColor: "#007BFF",
//     borderRadius: 10,
//     padding: 12,
//     marginTop: 8,
//     alignItems: "center",
//   },
//   journalButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });
// export default AppHome;


import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ImageBackground,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AppHome = () => {
  const [todoList, setTodoList] = useState([]);
  const [morningRoutine, setMorningRoutine] = useState({
    meditation: false,
    breakfast: false,
    vitamins: false,
  });
  const [waterIntake, setWaterIntake] = useState(0);
  const [gratitude, setGratitude] = useState('');
  const [sleepHours, setSleepHours] = useState(0);
  const [productivity, setProductivity] = useState(0);
  const [mood, setMood] = useState('');
  const [newTask, setNewTask] = useState('');
    const [userName, setUserName] = useState(''); // State to store user's name

const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('User is not logged in!');
        return;
      }
      const response = await axios.get('https://mentalapp-backend.onrender.com/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserName(response.data.user.name); // Update the state with the user's name
      } else {
        alert('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('An error occurred while fetching user data.');
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component loads
  }, []);

  // Save mood data to the backend
  const saveMood = async (mood, note = '') => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Retrieved token:', token);  // Check if token is retrieved properly

      if (!token) {
        alert('User is not logged in!');
        return;
      }
    console.log('Saving mood:', mood);  // Add this line to log the mood being saved

      const response = await axios.post(
        'https://mentalapp-backend.onrender.com/moods',
        { mood, note },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Mood saved successfully!');
      } else {
        alert(`Failed to save mood: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the mood.');
    }
  };

  // Handle emoji click to update mood
  const handleEmojiClick = async (mood) => {
    try {
          console.log('Clicked emoji:', mood);  // This will log the emoji clicked

      await saveMood(mood);
      setMood(mood); // Update the mood in the state
    } catch (error) {
      console.error('Error during emoji click:', error);
    }
  };

  // Handle saving tracking data (to-do, morning routine, etc.)
  const handleSave = async () => {
    const data = {
      todoList,
      morningRoutine,
      waterIntake,
      gratitude,
      sleepHours,
      productivity,
      mood,
    };

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('User is not logged in!');
        return;
      }
      const response = await axios.post(
        'https://mentalapp-backend.onrender.com/api/tracking',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert('Tracking data saved successfully!');
      } else {
        alert(`Failed to save data: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving tracking data.');
    }
  };

  // Add task to to-do list
  const handleAddTask = () => {
    if (newTask.trim() === '') {
      return; // Do nothing if the task is empty
    }
    setTodoList([...todoList, { task: newTask, completed: false }]);
    setNewTask(''); // Reset the input after adding task
  };

  // Toggle task completion status
  const toggleTaskCompletion = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index].completed = !updatedTodoList[index].completed;
    setTodoList(updatedTodoList);
  };
 const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.taskItem}
      onPress={() => toggleTaskCompletion(index)}
    >
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.task}
      </Text>
    </TouchableOpacity>
  );

  const renderSection = (title, content) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {content}
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/peaceful_background.jpg')}
      style={styles.container}
    >
      <FlatList
        contentContainerStyle={styles.scrollContainer}
        data={[
          {
            title: 'Greeting',
            content: (
              <>
                <Text style={styles.greetingText}> Hey {userName ? userName : 'there'}!</Text>
                <Text style={styles.subText}>How are you feeling today?</Text>
                <Text style={styles.subTextSmall}>
                  Take a moment to reflect on your emotions
                </Text>
              </>
            ),
          },
          {
            title: 'Emotion Tracker',
            content: (
              <View style={styles.emotionTracker}>
                {['😡', '😟', '😐', '😊', '😌'].map((emoji, index) => (
                  <TouchableOpacity key={index} onPress={() => handleEmojiClick(emoji)}>
                    <Text style={styles.emotion}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ),
          },
          {
            title: 'To-Do List',
            content: (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Add a task..."
                  value={newTask}
                  onChangeText={setNewTask}
                  onSubmitEditing={handleAddTask}
                />
                <FlatList
                  data={todoList}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </>
            ),
          },
          {
            title: 'Morning Routine',
            content: (
              <View style={styles.checkboxGroup}>
                {['Meditation', 'Breakfast', 'Vitamins'].map((item, index) => (
                  <View key={index} style={styles.checkboxItem}>
                    <Text style={styles.checkboxText}>{item}</Text>
                    <TouchableOpacity
                      style={styles.checkboxButton}
                      onPress={() =>
                        setMorningRoutine({
                          ...morningRoutine,
                          [item.toLowerCase()]: !morningRoutine[item.toLowerCase()],
                        })
                      }
                    >
                      <Text style={styles.checkbox}>
                        {morningRoutine[item.toLowerCase()] ? '✔' : '❌'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ),
          },
          {
            title: 'Water Intake',
            content: (
              <TextInput
                style={styles.input}
                placeholder="Enter amount of water (in glasses)"
                keyboardType="numeric"
                value={String(waterIntake)}
                onChangeText={(text) => setWaterIntake(Number(text))}
              />
            ),
          },
          {
            title: 'Gratitude',
            content: (
              <TextInput
                style={styles.input}
                placeholder="What are you grateful for?"
                value={gratitude}
                onChangeText={setGratitude}
              />
            ),
          },
          {
            title: 'Sleep Hours',
            content: (
              <TextInput
                style={styles.input}
                placeholder="Enter hours of sleep"
                keyboardType="numeric"
                value={String(sleepHours)}
                onChangeText={(text) => setSleepHours(Number(text))}
              />
            ),
          },
          {
            title: 'Productivity',
            content: (
              <TextInput
                style={styles.input}
                placeholder="Rate your productivity"
                keyboardType="numeric"
                value={String(productivity)}
                onChangeText={(text) => setProductivity(Number(text))}
              />
            ),
          },
          {
            title: 'Save Data',
            content: (
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Tracking Data</Text>
              </TouchableOpacity>
            ),
          },
        ]}
        renderItem={({ item }) => renderSection(item.title, item.content)}
        keyExtractor={(item, index) => index.toString()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  greetingText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  subText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  subTextSmall: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  emotionTracker: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  emotion: {
    fontSize: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  checkboxGroup: {
    flexDirection: 'column',
    marginVertical: 16,
  },
  checkboxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  checkboxText: {
    fontSize: 18,
    color: '#333',
  },
  checkboxButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
  },
  checkbox: {
    fontSize: 20,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppHome;
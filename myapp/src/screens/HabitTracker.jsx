import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  ImageBackground,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const HABITS_API_URL = 'https://mentalapp-backend.onrender.com/habits';

const HabitTrackerScreen = () => {
  const [habitName, setHabitName] = useState('');
  const [habits, setHabits] = useState([]);
  const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

  const fadeAnim = useState(new Animated.Value(0))[0]; // Animation for fade-in

  // Retrieve user token
  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('userToken');
  //             console.log('Fetched Token:', token); // Log to verify

  //       if (token) {
  //         setUserToken(token);
  //       } else {
  //         console.error('No token found!');
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving token:', error);
  //     }
  //   };
  //   getToken();
  // }, []);
const checkStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Fetched Token:', token); // Log to verify

      if (token) {
        setUserToken(token);
      } else {
        console.error('No token found!');
        Alert.alert('Authentication Error', 'No user token found. Please log in again.');
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };

  // Check for user token on component mount
  // useEffect(() => {
  //   checkStorage();
  // }, []);
useEffect(() => {
    // Immediately call the checkStorage function
    const initialize = async () => {
      await checkStorage();
      setLoading(false); // Set loading to false once token retrieval is complete
    };

    initialize();
  }, []); // Empty dependency array to call this only once on mount

  // Fetch habits with fade-in animation
  const fetchHabits = useCallback(async () => {
    try {
      const response = await fetch(HABITS_API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setHabits(data);
        // Fade-in animation when data is fetched
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        console.error('Failed to fetch habits');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [userToken, fadeAnim]);

  // Add habit
  const addHabit = async () => {
    if (habitName.trim() === '') {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    if (!userToken) {
      Alert.alert('Error', 'User is not authenticated');
      return;
    }

    try {
      const response = await fetch(HABITS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ name: habitName }),
      });

      if (response.ok) {
        const newHabit = await response.json();
        setHabits([...habits, newHabit]);
        setHabitName('');
      } else {
        console.error('Failed to add habit');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Toggle habit completion
  const toggleHabit = async (habitId) => {
    try {
      const response = await fetch(`${HABITS_API_URL}/${habitId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const updatedHabit = await response.json();
        setHabits(habits.map((habit) => (habit._id === habitId ? updatedHabit : habit)));
      } else {
        console.error('Failed to toggle habit');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Delete habit
  const deleteHabit = async (habitId) => {
    try {
      const response = await fetch(`${HABITS_API_URL}/${habitId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        setHabits(habits.filter((habit) => habit._id !== habitId));
      } else {
        console.error('Failed to delete habit');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchHabits();
    }
  }, [fetchHabits, userToken]);

  return (
    <ImageBackground
      source={require('../assets/habit.jpeg')} // Ensure the path is correct for your image
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']}
        style={styles.overlay}
      >
        <Text style={styles.header}>Habit Tracker</Text>

        <View style={styles.addHabitContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter habit"
            placeholderTextColor="#fff"
            value={habitName}
            onChangeText={setHabitName}
          />
          <TouchableOpacity style={styles.addButton} onPress={addHabit}>
            <Text style={styles.addButtonText}>Add Habit</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList
            data={habits}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={[styles.habitToggle, item.completed && styles.completed]}
                  onPress={() => toggleHabit(item._id)}
                >
                  <Text style={styles.habitText}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteHabit(item._id)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </Animated.View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    flexDirection: 'row', // Landscape mode uses row direction
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  addHabitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%', // Ensures the input field and button are within the container
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  habitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%', // Adjusted for landscape mode
  },
  habitToggle: {
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  habitText: {
    fontSize: 18,
    color: '#333',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 20,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HabitTrackerScreen;

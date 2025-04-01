import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';

const bingoTasks = [
  'Exercise for 20 minutes',
  'Write down three things you\'re grateful for',
  'Spend time with a friend',
  'Meditate for 10 minutes',
  'Listen to your favorite song',
  'Compliment someone',
  'Take a walk outside',
  'Laugh for 5 minutes',
  'Do something creative',
  'Try a new hobby',
  'Complete a self-care task',
  'Read a book for 10 minutes',
  'Drink enough water today',
  'Organize your workspace',
  'Plan your day ahead',
];

export default function MoodTrackerBingofirst({ navigation }) {
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleTaskComplete = (task) => {
    if (completedTasks.includes(task)) {
      Alert.alert("Already completed", "You've already marked this task as complete.");
    } else {
      setCompletedTasks([...completedTasks, task]);
      Alert.alert("Task Completed!", `You've completed: ${task}`);
    }
  };

  const renderItem = ({ item }) => {
    const isCompleted = completedTasks.includes(item);
    return (
      <TouchableOpacity
        style={[styles.taskItem, isCompleted ? styles.completed : styles.incomplete]}
        onPress={() => handleTaskComplete(item)}
      >
        <Text style={styles.taskText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Tracker Bingo</Text>
      <Text style={styles.subHeader}>Complete tasks to earn rewards!</Text>

      <FlatList
        data={bingoTasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TaskReminderSettings')}>
        <Text style={styles.buttonText}>Set Your Mood Reminder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  grid: {
    alignItems: 'center',
  },
  taskItem: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  taskText: {
    textAlign: 'center',
    fontSize: 14,
  },
  incomplete: {
    backgroundColor: '#98FB98',
    borderColor: 'green',
  },
  completed: {
    backgroundColor: '#FFD700',
    borderColor: 'gold',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

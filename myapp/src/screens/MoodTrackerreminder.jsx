import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function MoodTrackerreminder({ navigation }) {
  const [reminderTime, setReminderTime] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);
  const [reminderSet, setReminderSet] = useState(false);

  const handleSaveReminder = () => {
    // Convert reminder time to milliseconds
    const [hours, minutes] = reminderTime.split(':').map((part) => parseInt(part.trim(), 10));
    const now = new Date();
    const reminderDate = new Date();
    reminderDate.setHours(hours, minutes, 0, 0); // Set the reminder time

    const timeDifference = reminderDate.getTime() - now.getTime();
    if (timeDifference > 0) {
      setRemainingTime(timeDifference / 1000); // Set the timer in seconds
      setReminderSet(true);
      console.log('Reminder set successfully');
    } else {
      Alert.alert('Invalid Time', 'Reminder time must be in the future.');
    }
  };

  useEffect(() => {
    let interval;
    if (reminderSet && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1); // Decrease time every second
      }, 1000);
    } else if (remainingTime === 0) {
      // When the reminder time is reached
      Alert.alert("Reminder", "It's time for your task!");
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [remainingTime, reminderSet]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Mood Reminder</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter reminder time (e.g., 08:00 AM)"
        value={reminderTime}
        onChangeText={setReminderTime}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
        <Text style={styles.saveButtonText}>Save Reminder</Text>
      </TouchableOpacity>

      {reminderSet && remainingTime !== null && (
        <Text style={styles.timerText}>
          Time remaining: {Math.floor(remainingTime / 60)}:{remainingTime % 60}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', padding: 10, backgroundColor: '#f1f1f1', borderRadius: 5, marginBottom: 20 },
  saveButton: { padding: 10, backgroundColor: '#4CAF50', borderRadius: 5 },
  saveButtonText: { color: '#fff', fontSize: 16 },
  timerText: { fontSize: 18, marginTop: 20, color: 'red' },
});

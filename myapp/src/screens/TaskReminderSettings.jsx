import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function TaskReminderSettings({ navigation }) {
    const [reminderTime, setReminderTime] = useState('');
    const [reminderSet, setReminderSet] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);

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

    const handleSaveReminder = () => {
        // Get the current local time
        const now = new Date();

        // Convert reminderTime (with AM/PM) to 24-hour format (military time)
        const [time, period] = reminderTime.split(' ');  // Split time and AM/PM
        let [hours, minutes] = time.split(':').map((part) => parseInt(part.trim(), 10));

        // Convert to 24-hour format
        if (period === 'PM' && hours !== 12) {
            hours += 12; // Convert PM times
        }
        if (period === 'AM' && hours === 12) {
            hours = 0; // Convert 12 AM to 00:00
        }

        // Set the reminder date to today at the given time, using local time
        const reminderDate = new Date(now);  // Start with the current date
        reminderDate.setHours(hours, minutes, 0, 0); // Set to desired reminder time today

        // Get the local timezone offset in minutes
        const timezoneOffset = now.getTimezoneOffset();  // Offset in minutes from UTC

        // Adjust the reminder time for the local timezone offset
        reminderDate.setMinutes(reminderDate.getMinutes() - timezoneOffset);

        console.log('Current time:', now);
        console.log('Reminder time:', reminderDate);

        // Check if the reminder time is in the future
        const timeDifference = reminderDate.getTime() - now.getTime();
        console.log('Time difference (ms):', timeDifference);

        if (timeDifference > 0) {
            setRemainingTime(timeDifference / 1000); // Set the timer in seconds
            setReminderSet(true);
            console.log('Reminder set successfully');
        } else {
            Alert.alert('Invalid Time', 'Reminder time must be in the future.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{"< Back"}</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Set/Modify Task Reminders</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter reminder time (e.g., 02:58 PM)"
                value={reminderTime}
                onChangeText={setReminderTime}  // Update the reminder time state
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
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, width: '100%' },
    backButton: { marginRight: 10, padding: 10 },
    backButtonText: { fontSize: 18, color: '#007BFF' },  // Custom Back button style
    header: { fontSize: 24, fontWeight: 'bold', flex: 1, textAlign: 'center' },
    input: { width: '100%', padding: 10, backgroundColor: '#f1f1f1', borderRadius: 5, marginBottom: 20 },
    saveButton: { padding: 10, backgroundColor: '#4CAF50', borderRadius: 5 },
    saveButtonText: { color: '#fff', fontSize: 16 },
    timerText: { fontSize: 18, marginTop: 20, color: 'red' }
});

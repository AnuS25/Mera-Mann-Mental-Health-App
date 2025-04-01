import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from './Auth'; // Assuming the context is in the `Auth` file

export default function AccountScreen({ navigation }) {
    const { userData: authUserData, logout } = useAuth();  // Renamed 'userData' to 'authUserData' to avoid conflict
    const [userName, setUserName] = useState('');  // State to store the user's name
    const [dailyTasks, setDailyTasks] = useState([]);  // State to store user's daily tasks
    const [loadingTasks, setLoadingTasks] = useState(true);  // State to track task loading status

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                // Fetch user data using authUserData (previously userData)
                const response = await fetch('https://mentalapp-backend.onrender.com/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authUserData.token}`,  // Use the renamed authUserData
                    },
                });
                const data = await response.json();
                if (data && data.name) {
                    setUserName(data.name);  // Set the fetched name in the state
                } else {
                    console.log('No name found in the response');
                }
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };

        const fetchDailyTasks = async () => {
            try {
                const response = await fetch('https://mentalapp-backend.onrender.com/tasks', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authUserData.token}`,  // Pass token for authorization
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const tasks = await response.json();  // Get tasks data from the API response
                setDailyTasks(tasks);  // Set tasks in the state
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoadingTasks(false);  // Stop loading once tasks are fetched
            }
        };

        if (authUserData) {
            fetchUserName();
            fetchDailyTasks();  // Fetch daily tasks after loading the user name
        }
    }, [authUserData]);  // Re-run when authUserData changes

    const handleLogout = async () => {
        await logout();  // Log out and update the state
        navigation.reset({
            index: 0,  // Reset to the first route
            routes: [{ name: 'LOGIN' }],  // Define the screen to navigate to
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Text style={styles.profileName}>{userName || 'Loading...'}</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.settingsText}>⚙</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.optionsContainer}>
                {[
                    'Personal Insights',
                    'View psychological profile',
                    'View goals',
                ].map((option, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.option} 
                        onPress={() => {
                            if (option === 'View psychological profile') {
                                navigation.navigate('ProfileDetails');  // Navigate to ProfileDetails
                            } else if (option === 'View goals') {
                                navigation.navigate('TrackingHistory'); // Navigate to TrackingHistory
                            } else if (option === 'Personal Insights') {
                                navigation.navigate('Moodhistory'); // Navigate to Moodhistory
                            }
                        }}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.cardsContainer}>
                {/* Streaks Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Streaks</Text>
                    <Text style={styles.cardDescription}>Track your consecutive tasks completed</Text>
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('Streaks')}  // Navigate to Streaks screen
                    >
                        <Text style={styles.cardButtonText}>View Streaks</Text>
                    </TouchableOpacity>
                </View>

                {/* Rewards Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Insights</Text>
                    <Text style={styles.cardDescription}>Mood, stress and other insights</Text>
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('Record')}  // Navigate to Rewards screen
                    >
                        <Text style={styles.cardButtonText}>View Rewards</Text>
                    </TouchableOpacity>
                </View>

                {/* Daily Reminder Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Daily Reminder</Text>
                    {loadingTasks ? (
                        <Text style={styles.cardDescription}>Loading your tasks...</Text>
                    ) : (
                        <View>
                            {dailyTasks.length > 0 ? (
                                <View>
                                    {dailyTasks.map((task, index) => (
                                        <Text key={index} style={styles.cardDescription}>
                                            {task.name}
                                        </Text>
                                    ))}
                                </View>
                            ) : (
                                <Text style={styles.cardDescription}>No tasks for today</Text>
                            )}
                        </View>
                    )}
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('Daily Reminder')} // Navigate to reminder settings if needed
                    >
                        <Text style={styles.cardButtonText}>Set/Modify Reminders</Text>
                    </TouchableOpacity>
                </View>

                {[ 
                    { title: 'Records and Logs', description: 'All your past entries' },
                    { title: 'Bookmarks', description: "Pages you've bookmarked" },
                    { title: 'Rewards', description: 'See your earned rewards for completed tasks' },
                ].map((card, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardDescription}>{card.description}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f7f4' },
    profileHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
    profileName: { fontSize: 18, fontWeight: 'bold' },
    settingsButton: { padding: 10 },
    settingsText: { fontSize: 18, color: '#000' },
    optionsContainer: { paddingHorizontal: 20 },
    option: { padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 },
    optionText: { fontSize: 16 },
    cardsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' },
    card: { width: '45%', padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 },
    cardTitle: { fontWeight: 'bold', marginBottom: 5 },
    cardDescription: { fontSize: 12 },
    cardButton: { marginTop: 10, backgroundColor: '#4CAF50', padding: 8, borderRadius: 5 },
    cardButtonText: { color: '#fff', textAlign: 'center' },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f44336',
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: { color: '#fff', fontSize: 16 },
});

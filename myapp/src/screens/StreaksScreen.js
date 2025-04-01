import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function StreaksScreen() {
    const [streak, setStreak] = useState(0); // Track user's streak
    const [reward, setReward] = useState('');
    const navigation = useNavigation(); // Get the navigation object

    const increaseStreak = () => {
        setStreak(streak + 1);
        checkReward(streak + 1); // Check for rewards when streak increases
    };

    const checkReward = (newStreak) => {
        if (newStreak === 3) {
            setReward('🎉 Congratulations! You earned a 3-day streak badge!');
        } else if (newStreak === 7) {
            setReward('🏆 Awesome! You earned a 7-day streak reward!');
        }
    };

    const handleGoBack = () => {
        navigation.goBack(); // Go back to the previous screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Streaks & Rewards</Text>
            <Button title="Back" onPress={handleGoBack} /> {/* Back button */}
            <Text style={styles.streak}>Current Streak: {streak} days</Text>
            <Button title="Complete Task" onPress={increaseStreak} />
            {reward ? <Text style={styles.reward}>{reward}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    streak: { fontSize: 18, marginTop: 20 },
    reward: { fontSize: 16, color: 'green', marginTop: 10 },
});

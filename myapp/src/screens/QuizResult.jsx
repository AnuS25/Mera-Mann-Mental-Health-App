import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function QuizResults({ route, navigation }) {
    const { score } = route.params;
    const totalQuestions = 4;
    const percentage = (score / totalQuestions) * 100;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quiz Results</Text>
            <Text style={styles.score}>Your Score: {score} / {totalQuestions}</Text>
            <Text style={styles.percentage}>Percentage: {percentage}%</Text>
            {percentage === 100 ? (
                <Text style={styles.congratulations}>🎉 Excellent work! You got a perfect score! 🎉</Text>
            ) : percentage >= 50 ? (
                <Text style={styles.encouragement}>Good job! Keep learning about mental health!</Text>
            ) : (
                <Text style={styles.encouragement}>Don't worry, try again and learn more!</Text>
            )}
            <Button 
                title="Take the Quiz Again"
                onPress={() => navigation.navigate('QuizScreen')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    score: {
        fontSize: 20,
        marginBottom: 10,
    },
    percentage: {
        fontSize: 18,
        marginBottom: 20,
    },
    congratulations: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    encouragement: {
        fontSize: 18,
        color: 'orange',
        marginBottom: 20,
    },
});

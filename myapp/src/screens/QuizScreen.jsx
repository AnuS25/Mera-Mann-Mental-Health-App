import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const questions = [
    {
        question: "What is a common symptom of depression?",
        options: ["Fatigue", "Increased energy", "Euphoria", "Sleepiness"],
        answer: "Fatigue"
    },
    {
        question: "Which of these is a good coping strategy for stress?",
        options: ["Exercising", "Avoiding friends", "Ignoring emotions", "Procrastinating"],
        answer: "Exercising"
    },
    {
        question: "What is a sign of anxiety?",
        options: ["Feeling calm", "Increased heart rate", "Increased focus", "Deep breathing"],
        answer: "Increased heart rate"
    },
    {
        question: "Which of the following is important for self-care?",
        options: ["Ignoring your feelings", "Eating nutritious food", "Overworking", "Staying indoors all day"],
        answer: "Eating nutritious food"
    },
];

export default function QuizScreen({ navigation }) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // State to track selected answer

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer); // Set the selected answer

        if (answer === questions[questionIndex].answer) {
            setScore(score + 1);
            Alert.alert("Correct!", "You got it right!");
        } else {
            Alert.alert("Incorrect", "Try again!");
        }

        setTimeout(() => { // Delay navigation to show alert
            setSelectedAnswer(null); // Reset selected answer
            if (questionIndex + 1 < questions.length) {
                setQuestionIndex(questionIndex + 1);
            } else {
                navigation.navigate('ResultsScreen', { score });
            }
        }, 500); // Delay of 500 milliseconds (adjust as needed)
    };

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{questions[questionIndex].question}</Text>
            </View>
            <View style={styles.optionsContainer}>
                {questions[questionIndex].options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedAnswer === option && option === questions[questionIndex].answer // Correct answer selected
                                ? styles.correctAnswerButton
                                : selectedAnswer === option && option !== questions[questionIndex].answer // Incorrect answer selected
                                ? styles.incorrectAnswerButton
                                : null, // Default style
                        ]}
                        onPress={() => handleAnswer(option)}
                        disabled={selectedAnswer !== null} // Disable buttons while showing result
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        padding: 20,
        justifyContent: 'center',
    },
    questionContainer: {
        marginBottom: 30,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    optionsContainer: {},
    optionButton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    correctAnswerButton: {
        backgroundColor: '#A0EE00', // Green for correct
    },
    incorrectAnswerButton: {
        backgroundColor: '#FF5733', // Red for incorrect
    },
});
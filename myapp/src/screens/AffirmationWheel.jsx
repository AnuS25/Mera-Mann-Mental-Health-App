import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const affirmations = [
    "I am worthy of love and happiness.",
    "Every challenge is an opportunity to grow.",
    "I trust myself and my abilities.",
    "I am strong, capable, and resilient.",
    "I am at peace with my past and excited for my future.",
    "I choose happiness and positivity every day."
];

export default function AffirmationWheel() {
    const [selectedAffirmation, setSelectedAffirmation] = useState('');

    const spinWheel = () => {
        const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
        setSelectedAffirmation(randomAffirmation);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Spin for Your Affirmation!</Text>
            <Button title="Spin the Wheel" onPress={spinWheel} />
            {selectedAffirmation ? (
                <Text style={styles.affirmation}>{selectedAffirmation}</Text>
            ) : null}
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
    affirmation: {
        fontSize: 18,
        marginTop: 20,
        color: '#4CAF50',
        fontStyle: 'italic',
    },
});

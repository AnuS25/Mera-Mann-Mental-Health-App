import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Animated, Button } from 'react-native';

export default function BreathingGame() {
    const [isBreathing, setIsBreathing] = useState(false);
    const [breathDuration, setBreathDuration] = useState(4000); // 4 seconds per phase (inhale, hold, exhale)
    const [currentPrompt, setCurrentPrompt] = useState('');
    
    const mindfulnessPrompts = useMemo(() => [
        "I am present in this moment",
        "I am grateful for my breath",
        "I am releasing tension",
        "I am at peace",
        "I am calm and centered",
        "I embrace the present"
    ], []);  // Memoize this array so it won't change on every render
    
    const circleScale = useRef(new Animated.Value(1)).current; // Create a ref for the circle scale
    const animation = useRef(null); // To store the looped animation

    // Function to start the animation loop
    const startBreathingAnimation = () => {
        animation.current = Animated.loop(
            Animated.sequence([
                Animated.timing(circleScale, {
                    toValue: 2,  // Expanding the circle for inhale
                    duration: breathDuration,
                    useNativeDriver: true,
                }),
                Animated.timing(circleScale, {
                    toValue: 1,  // Shrinking the circle for exhale
                    duration: breathDuration,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.current.start();
    };

    // Function to stop the animation
    const stopBreathingAnimation = () => {
        if (animation.current) {
            animation.current.stop();
        }
        circleScale.setValue(1);  // Reset the circle size when stopped
    };

    // Function to toggle breathing state
    const toggleBreathing = () => {
        if (!isBreathing) {
            setIsBreathing(true);
            startBreathingAnimation(); // Start animation when state is true
        } else {
            setIsBreathing(false);
            stopBreathingAnimation(); // Stop animation when state is false
        }
    };

    // Set mindfulness prompt at regular intervals
    useEffect(() => {
        const promptInterval = setInterval(() => {
            const randomPrompt = mindfulnessPrompts[Math.floor(Math.random() * mindfulnessPrompts.length)];
            setCurrentPrompt(randomPrompt);
        }, 15000); // Change prompt every 15 seconds

        return () => clearInterval(promptInterval);  // Clean up the interval
    }, [mindfulnessPrompts]);  // Add mindfulnessPrompts as a dependency (memoized)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mindful Breathing Challenge</Text>
            <Text style={styles.instructions}>Follow the expanding and contracting circle with your breath.</Text>
            <Animated.View style={[styles.circle, { transform: [{ scale: circleScale }] }]}>
                <Text style={styles.breathText}>{isBreathing ? 'Breathe In' : 'Breathe Out'}</Text>
            </Animated.View>
            <Button title={isBreathing ? 'Stop' : 'Start'} onPress={toggleBreathing} />
            <Text style={styles.prompt}>{currentPrompt}</Text> {/* Display current mindfulness prompt */}
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
    instructions: {
        fontSize: 16,
        marginBottom: 30,
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#66CCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    breathText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    prompt: {
        fontSize: 18,
        color: '#666',
        marginTop: 20,
        fontStyle: 'italic',
    },
});

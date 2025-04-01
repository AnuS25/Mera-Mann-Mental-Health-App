import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';

// Example moods and their affirmations
const moodAffirmations = [
    { mood: 'Happy', affirmation: 'I am grateful for today.' },
    { mood: 'Sad', affirmation: 'I am allowed to feel this way.' },
    { mood: 'Excited', affirmation: 'I embrace new opportunities.' },
    { mood: 'Calm', affirmation: 'I am at peace with myself.' },
    { mood: 'Stressed', affirmation: 'I can handle this.' },
    { mood: 'Grateful', affirmation: 'I am thankful for the present moment.' },
    { mood: 'Anxious', affirmation: 'I am capable of handling this.' },
    { mood: 'Hopeful', affirmation: 'I trust that things will get better.' },
];

export default function MoodMemoryGame() {
    // Shuffle moods and affirmations, duplicate them for the memory game
    const shuffledAffirmations = [...moodAffirmations, ...moodAffirmations].sort(() => Math.random() - 0.5);
    
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameWon, setGameWon] = useState(false);

    const [celebrationVisible, setCelebrationVisible] = useState(false);
    const [celebrationAnim] = useState(new Animated.Value(0)); // For animation

    // Wrap triggerCelebration in useCallback to prevent unnecessary re-renders
    const triggerCelebration = useCallback(() => {
        setCelebrationVisible(true);
        Animated.sequence([
            Animated.timing(celebrationAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(celebrationAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, [celebrationAnim]);

    useEffect(() => {
        if (matchedCards.length === moodAffirmations.length) {
            setGameWon(true);
            triggerCelebration();  // This triggers the celebration animation
        }
    }, [matchedCards, triggerCelebration]); // triggerCelebration is now stable

    const handleFlipCard = (index) => {
        if (flippedCards.length === 2 || flippedCards.includes(index)) return;

        setFlippedCards(prevState => [...prevState, index]);

        if (flippedCards.length === 1) {
            const [firstCardIndex] = flippedCards;
            if (shuffledAffirmations[firstCardIndex].mood === shuffledAffirmations[index].mood) {
                setMatchedCards(prevState => [...prevState, shuffledAffirmations[firstCardIndex]]);
            } else {
                setTimeout(() => {
                    setFlippedCards([]);  // Reset flipped cards after a short delay
                }, 1000);
            }
        }
    };

    const renderCards = () => {
        return shuffledAffirmations.map((item, index) => {
            const isFlipped = flippedCards.includes(index) || matchedCards.includes(item);

            return (
                <View key={index} style={styles.cardContainer}>
                    <Animated.View
                        style={[
                            styles.card,
                            {
                                transform: [
                                    {
                                        rotateY: celebrationAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '360deg'],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <View style={[styles.cardInner, isFlipped && styles.flipped]}>
                            <Text style={styles.cardText}>{isFlipped ? item.mood : '?'}</Text>
                        </View>
                    </Animated.View>
                    <Button
                        title="Flip"
                        onPress={() => handleFlipCard(index)}
                        disabled={isFlipped || matchedCards.includes(item)}
                    />
                </View>
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mood Tracker Memory Game</Text>
            <View style={styles.grid}>{renderCards()}</View>
            {gameWon && (
                <Text style={styles.congratulations}>🎉 You matched all moods! 🎉</Text>
            )}
            {celebrationVisible && (
                <Animated.View style={[styles.celebration, { opacity: celebrationAnim }]}>
                    <Text style={styles.celebrationText}>🎉 Celebration! 🎉</Text>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f8ff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardContainer: {
        margin: 10,
        alignItems: 'center',
    },
    card: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardInner: {
        backfaceVisibility: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flipped: {
        transform: [{ rotateY: '180deg' }],
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    congratulations: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 20,
    },
    celebration: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    celebrationText: {
        fontSize: 24,
        color: 'orange',
    },
});

import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';  // Import the ConfettiCannon

// Sample affirmations
const affirmations = [
    "I am enough",
    "I deserve happiness",
    "I am worthy of love",
    "I am resilient",
    "I am strong",
    "I am at peace",
    "I am confident",
    "I am in control"
];

export default function AffirmationMatchGame() {
    const [cards, setCards] = useState([...affirmations, ...affirmations].sort(() => Math.random() - 0.5));
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isFlipping, setIsFlipping] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [width, setWidth] = useState(Dimensions.get('window').width);

    // Memoize flipAnim to prevent it from being recreated on every render
    const flipAnim = useMemo(() => new Animated.Value(0), []);

    // Update layout on screen resize
      useEffect(() => {
        const onResize = () => setWidth(Dimensions.get('window').width);
        
        // Add the event listener for dimension change
        const subscription = Dimensions.addEventListener('change', onResize);
        
        // Return the cleanup function to remove the listener
        return () => subscription.remove(); // Unsubscribe from the event when the component unmounts
    }, []);
    const handleCardFlip = (index) => {
        if (flippedCards.length === 2 || isFlipping || flippedCards.includes(index)) return;

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);
        setIsFlipping(true);

        if (newFlippedCards.length === 2) {
            checkForMatch(newFlippedCards);
        } else {
            setIsFlipping(false);
        }
    };

    const checkForMatch = (flippedCards) => {
        const [firstCardIndex, secondCardIndex] = flippedCards;
        if (cards[firstCardIndex] === cards[secondCardIndex]) {
            setMatchedCards([...matchedCards, cards[firstCardIndex]]);
            setIsFlipping(false);
        } else {
            setTimeout(() => {
                setFlippedCards([]);
                setIsFlipping(false);
            }, 1000); // Flip back after 1 second
        }
    };

    const shuffleCards = () => {
        setCards([...affirmations, ...affirmations].sort(() => Math.random() - 0.5));
        setMatchedCards([]);
        setFlippedCards([]);
        setGameWon(false);
    };

    useEffect(() => {
        if (matchedCards.length === affirmations.length) {
            setGameWon(true);
        }
    }, [matchedCards]);

    const renderCard = (card, index) => {
        const flipped = flippedCards.includes(index) || matchedCards.includes(card);
        return (
            <TouchableOpacity
                key={index}
                style={[styles.card, flipped && styles.cardFlipped]}
                onPress={() => handleCardFlip(index)}
                activeOpacity={0.7}
            >
                <Text style={styles.cardText}>{flipped ? card : "?"}</Text>
            </TouchableOpacity>
        );
    };

    const renderCongratulations = () => {
        return (
            <Animated.View
                style={[styles.congratulationsContainer, { transform: [{ scale: flipAnim }] }]}
            >
                <Text style={styles.congratulationsText}>🎉 You matched all the affirmations! 🎉</Text>
            </Animated.View>
        );
    };

    useEffect(() => {
        if (gameWon) {
            Animated.spring(flipAnim, {
                toValue: 1.2,
                friction: 3,
                useNativeDriver: true,
            }).start();
        }
    }, [gameWon, flipAnim]);  // flipAnim is now memoized

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mental Health Affirmation Match</Text>
            <View style={[styles.cardContainer, { width: width - 40 }]}>
                {cards.map(renderCard)}
            </View>
            {gameWon && (
                <>
                    {renderCongratulations()}
                    <ConfettiCannon
                        count={200} // Number of confetti pieces
                        origin={{ x: width / 2, y: 0 }} // Start from the top center
                        fadeOut={true}
                        fallSpeed={3000} // Speed of the confetti fall
                        explosionSpeed={200} // Speed of the explosion effect
                    />
                </>
            )}
            <TouchableOpacity style={styles.shuffleButton} onPress={shuffleCards}>
                <Text style={styles.shuffleButtonText}>Shuffle</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4a4a4a',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#e6e6fa',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
    },
    cardFlipped: {
        backgroundColor: '#dcdcdc',
    },
    cardText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    congratulationsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    congratulationsText: {
        fontSize: 18,
        color: '#3a9b7f',
        fontWeight: 'bold',
    },
    shuffleButton: {
        marginTop: 20,
        backgroundColor: '#4a90e2',
        padding: 10,
        borderRadius: 5,
    },
    shuffleButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

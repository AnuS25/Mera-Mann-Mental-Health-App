import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function QuizHome({ navigation }) {
    return (
        <ImageBackground 
            source={require('../assets/quiz.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}> {/* Semi-transparent overlay */}
                <View style={styles.container}>
                    <Text style={styles.title}>Mental Health Awareness Quiz</Text>

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('QuizScreen')}
                    >
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Or 'stretch', depending on your preference
        justifyContent: 'center', // Center content vertically
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // Adjust opacity for darkness of overlay
        justifyContent: 'center', // Center content vertically
        padding: 20, // Add padding around the content
    },
    container: {
        alignItems: 'center', // Center content horizontally
    },
    title: {
        fontSize: 32, // Increased title size
        fontWeight: 'bold',
        color: 'white', // White title for contrast
        marginBottom: 30,
        textAlign: 'center', // Center the title
    },
    button: {
        backgroundColor: '#FF9800', // Example orange color
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 3, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    categoriesContainer: {
        flexDirection: 'row', // Arrange categories horizontally
        flexWrap: 'wrap', // Allow wrapping to the next line
        justifyContent: 'center', // Center categories horizontally
    },
    categoryButton: {
        backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent white
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        margin: 5,
    },
    categoryText: {
        color: 'white',
        fontSize: 16,
    },
});
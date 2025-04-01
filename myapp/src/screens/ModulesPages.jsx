import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const modules = [
  { 
    name: 'Quiz Game', 
    color: '#FFB6C1', 
    description: 'Test your knowledge with fun quizzes to challenge your mind.', 
    icon: '🧠', 
    screen: 'QuizGame', // Screen name to navigate to
  },
  { 
    name: 'Mood Tracker Bingo', 
    color: '#98FB98', 
    description: 'Track your daily moods and earn rewards in this bingo-style game.', 
    icon: '🎯',
    screen: 'MoodTrackerBingoScreen', 
  },
  { 
    name: 'Therapeutic Word Search', 
    color: '#FFD700', 
    description: 'Relax your mind while finding words related to therapy and wellness.', 
    icon: '🔎',
    screen: 'TherapeuticWordSearch', 
  },
  { 
    name: 'Mindful Breathing Game (Breathing Challenge)', 
    color: '#87CEFA', 
    description: 'Practice mindfulness with a fun game to improve your breathing technique.', 
    icon: '🌬️',
    screen: 'BreathingGame', 
  },
  { 
    name: 'Affirmation Match Game', 
    color: '#FF6347', 
    description: 'Match positive affirmations to help boost self-esteem and confidence.', 
    icon: '🃏',
    screen: 'AffirmationMatchGame', 
  },
  { 
    name: 'Gratitude Garden', 
    color: '#FF69B4', 
    description: 'Plant seeds of gratitude and watch your garden grow as you reflect on what you’re thankful for.', 
    icon: '🌱',
    screen: 'GratitudeGarden', 
  },
  { 
    name: 'Mood Tracker Memory Game', 
    color: '#8A2BE2', 
    description: 'Test your memory while tracking your moods and improving emotional awareness.', 
    icon: '🧩',
    screen: 'MoodMemoryGame', 
  },
  { 
    name: 'Positive Affirmation Spin Wheel', 
    color: '#FFD700', 
    description: 'Spin the wheel for a random positive affirmation to brighten your day.', 
    icon: '🎉',
    screen: 'AffirmationWheel', 
  },
];

const ModulesPage = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.modulesPage}>
        <Text style={styles.heading}>Start with Small Steps</Text>
        <View style={styles.modulesGrid}>
          {modules.map((module, index) => (
            <TouchableOpacity 
              key={index} 
              style={{ ...styles.moduleCard, backgroundColor: module.color }} 
              onPress={() => navigation.navigate(module.screen)} // Navigate on click
            >
              <Text style={styles.moduleTitle}>{module.icon} {module.name}</Text>
              <Text style={styles.moduleDescription}>{module.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modulesPage: {
    backgroundColor: '#FFF5E1', // Cream background color
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modulesGrid: {
    flexDirection: 'column', // Change to column to make cards stack vertically
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  moduleCard: {
    borderRadius: 15,
    padding: 25,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  moduleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  moduleDescription: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 20,
  },
});

export default ModulesPage;

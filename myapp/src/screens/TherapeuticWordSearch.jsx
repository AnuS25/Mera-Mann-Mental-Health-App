import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';

const wordList = [
  'Breathe', 'Yoga', 'Relax', 'Peace', 'Meditate', 'Therapy', 'Mindfulness', 'Healing', 'Calm', 'Affirmation', 
  'Gratitude', 'Wellness', 'Selfcare', 'Balance', 'Focus', 'Strength', 'Empathy', 'Hope', 'Joy', 'Love'
];

const gridSize = 10; // Size of the word search grid (10x10)
const wordSearchGrid = generateWordSearchGrid(gridSize, wordList);

function generateWordSearchGrid(gridSize, wordList) {
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

  // Add words to grid randomly
  wordList.forEach((word) => {
    placeWordInGrid(grid, word);
  });

  // Fill in remaining cells with random letters
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter
      }
    }
  }

  return grid;
}

function placeWordInGrid(grid, word) {
  const directions = [
    { x: 0, y: 1 }, // Horizontal
    { x: 1, y: 0 }, // Vertical
    { x: 1, y: 1 }, // Diagonal (down-right)
    { x: 1, y: -1 } // Diagonal (up-right)
  ];

  const direction = directions[Math.floor(Math.random() * directions.length)];

  let placed = false;
  while (!placed) {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);
    const canPlace = canPlaceWord(grid, word, row, col, direction);

    if (canPlace) {
      for (let i = 0; i < word.length; i++) {
        grid[row + i * direction.y][col + i * direction.x] = word[i];
      }
      placed = true;
    }
  }
}

function canPlaceWord(grid, word, row, col, direction) {
  if (row + (word.length - 1) * direction.y >= gridSize || row + (word.length - 1) * direction.y < 0) return false;
  if (col + (word.length - 1) * direction.x >= gridSize || col + (word.length - 1) * direction.x < 0) return false;

  for (let i = 0; i < word.length; i++) {
    if (grid[row + i * direction.y][col + i * direction.x] !== '' && grid[row + i * direction.y][col + i * direction.x] !== word[i]) {
      return false;
    }
  }

  return true;
}

export default function TherapeuticWordSearchScreen({ navigation }) {
  const [foundWords, setFoundWords] = useState([]);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const handleWordPress = (word) => {
    if (foundWords.includes(word)) {
      Alert.alert("Already Found", "This word is already found!");
    } else {
      setFoundWords([...foundWords, word]);

      if (foundWords.length + 1 === wordList.length) {
        setIsGameComplete(true);
      }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.gridItem, foundWords.includes(item) && styles.found]}
      onPress={() => handleWordPress(item)}
    >
      <Text style={styles.gridItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Therapeutic Word Search</Text>
      <Text style={styles.subHeader}>Find the therapy and wellness words!</Text>

      <FlatList
        data={wordList}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={5}
        contentContainerStyle={styles.grid}
      />

      {isGameComplete && (
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardText}>Great job! You found all the words!</Text>
          <Text style={styles.rewardMessage}>Keep up with your wellness journey! 🌟</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#FFD700',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  grid: {
    alignItems: 'center',
  },
  gridItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
  },
  gridItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  found: {
    backgroundColor: '#98FB98', // Green when the word is found
  },
  rewardContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  rewardMessage: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
});

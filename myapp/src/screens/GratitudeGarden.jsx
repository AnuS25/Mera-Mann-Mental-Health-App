import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function GratitudeGarden() {
  const [gratitude, setGratitude] = useState('');
  const [garden, setGarden] = useState([]);

  const handleAddGratitude = () => {
    if (gratitude) {
      setGarden([...garden, gratitude]);
      setGratitude('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gratitude Garden</Text>
      <Text style={styles.subtitle}>What are you grateful for today?</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your gratitude here"
        value={gratitude}
        onChangeText={setGratitude}
      />
      <Button title="Add Gratitude" onPress={handleAddGratitude} />
      <ScrollView style={styles.gardenContainer}>
        {garden.map((item, index) => (
          <View key={index} style={styles.gratitudeItem}>
            <Text style={styles.gratitudeText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  gardenContainer: {
    marginTop: 20,
    width: '100%',
  },
  gratitudeItem: {
    padding: 10,
    backgroundColor: '#8CCB9B',
    marginBottom: 10,
    borderRadius: 5,
  },
  gratitudeText: {
    fontSize: 16,
    color: 'white',
  },
});

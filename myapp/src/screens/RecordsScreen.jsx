import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, FlatList, RefreshControl } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const RecordsScreen = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [moodDistribution, setMoodDistribution] = useState([]);
  const navigation = useNavigation();

  const moodLabel = (score) => {
    if (score <= -2) return "Very Sad";
    if (score === -1) return "Sad";
    if (score === 0) return "Neutral";
    if (score === 1) return "Happy";
    if (score >= 2) return "Very Happy";
  };

  const calculateStatistics = useCallback((moodData) => {
    const moodEmojiToValue = {
      "😐": 0, // Neutral
      "😟": -1, // Sad
      "😊": 1,  // Happy
      "😄": 2,  // Very Happy
      "😞": -2, // Very Sad
      "😢": -3, // Crying
      "😃": 1,  // Grinning
      "😜": 2,  // Playful
    };

    // Map moodData to numeric scores
    const validMoodScores = moodData
      .map(item => {
        const moodValue = moodEmojiToValue[item.mood];  
        return moodValue !== undefined ? moodValue : null;  // Use null for invalid moods
      })
      .filter(mood => mood !== null);  // Remove invalid values

    console.log('Valid Mood Scores:', validMoodScores);  // Log mood scores for debugging

    // If no valid mood scores, set all values to "Neutral"
    if (validMoodScores.length === 0) {
      setStatistics({
        totalMoodEntries: 0,
        averageMood: "Neutral",  // Default to "Neutral" if no valid moods
        highestMood: "Neutral",
        lowestMood: "Neutral",
      });
      return;
    }

    const total = validMoodScores.reduce((sum, score) => sum + score, 0);
    const averageScore = total / validMoodScores.length;

    // Get highest and lowest mood values
    const highestMoodValue = Math.max(...validMoodScores);
    const lowestMoodValue = Math.min(...validMoodScores);

    setStatistics({
      totalMoodEntries: validMoodScores.length,
      averageMood: moodLabel(averageScore),  // Convert numeric average to mood label
      highestMood: moodLabel(highestMoodValue),
      lowestMood: moodLabel(lowestMoodValue),
    });
  }, []);

  const calculateMoodDistribution = (moodData) => {
    const moodCount = {};
    moodData.forEach(item => {
      if (moodCount[item.mood]) {
        moodCount[item.mood]++;
      } else {
        moodCount[item.mood] = 1;
      }
    });

    const moodDistArray = Object.keys(moodCount).map(key => {
      // Generate a valid hex color
      let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      
      // Ensure the color is 6 characters long
      if (color.length < 7) {
        color = color.padStart(7, '0'); // Pad with leading zeros if color is too short
      }

      return {
        name: `Mood ${key}`,
        population: moodCount[key],
        color: color, // Use the corrected color format
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      };
    });

    setMoodDistribution(moodDistArray);
  };

  const fetchMoodHistory = useCallback(async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('User is not logged in!');
        return;
      }

      const response = await axios.get('https://mentalapp-backend.onrender.com/moods/history', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const moodData = response.data.moodHistory;

        const groupedMoodHistory = {};
        moodData.forEach(item => {
          const date = moment(item.createdAt).format('YYYY-MM-DD');
          if (!groupedMoodHistory[date] || moment(item.createdAt).isAfter(moment(groupedMoodHistory[date].createdAt))) {
            groupedMoodHistory[date] = item;
          }
        });

        setMoodHistory(Object.entries(groupedMoodHistory).map(([date, mood]) => ({ date, mood })));
        calculateStatistics(moodData);  // Calculate statistics
        calculateMoodDistribution(moodData);  // Calculate mood distribution

      } else {
        alert('No mood history found.');
      }
    } catch (error) {
      console.error('Error fetching mood history:', error);
      alert('Error fetching mood history.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [calculateStatistics]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMoodHistory();
  };

  useEffect(() => {
    fetchMoodHistory();
  }, [fetchMoodHistory]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading mood history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} />

      <Text style={styles.title}>Mood History</Text>

      {statistics && (
        <View style={styles.statsContainer}>
          <Text>Total Entries: {statistics.totalMoodEntries}</Text>
          <Text>Average Mood: {statistics.averageMood}</Text>
          <Text>Highest Mood: {statistics.highestMood}</Text>
          <Text>Lowest Mood: {statistics.lowestMood}</Text>
        </View>
      )}

      <FlatList
        data={moodHistory}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.moodItem}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.mood}>{item.mood.mood}</Text>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <Text style={styles.chartTitle}>Mood Distribution</Text>
      <PieChart
        data={moodDistribution}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ADD8E6',
          backgroundGradientFrom: '#BAF',
          backgroundGradientTo: '#ABF',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(21, 81, 232, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(227, 16, 16, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  statsContainer: {
    marginBottom: 20,
  },
  moodItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mood: {
    fontSize: 16,
    color: '#333',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default RecordsScreen;

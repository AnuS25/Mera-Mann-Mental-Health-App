import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const MoodHistory = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const navigation = useNavigation();

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
        calculateStatistics(moodData);

      } else {
        alert('No mood history found.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Mood history not found.');
      } else {
        console.error('Error fetching mood history:', error);
        alert('Error fetching mood history.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const calculateStatistics = (moodData) => {
    if (!moodData || moodData.length === 0) {
      setStatistics(null);
      return;
    }

    const moodCounts = {};
    moodData.forEach(item => {
      const mood = item.mood;
      moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });

    const totalMoods = moodData.length;
    const moodPercentages = {};
    for (const mood in moodCounts) {
      moodPercentages[mood] = (moodCounts[mood] / totalMoods) * 100;
    }

    setStatistics(moodPercentages);
  };

  useEffect(() => {
    fetchMoodHistory();
  }, [fetchMoodHistory]);

  const getWeeklyMoodData = () => {
    const weeklyMoodData = {};
    const today = moment();

    for (let i = 6; i >= 0; i--) {
      const date = today.clone().subtract(i, 'days');
      const formattedDate = date.format('YYYY-MM-DD');

      const moodForDate = moodHistory.find(item => item.date === formattedDate);

      if (moodForDate) {
        weeklyMoodData[formattedDate] = moodForDate.mood.mood;
      } else {
        weeklyMoodData[formattedDate] = null;
      }
    }

    return weeklyMoodData;
  };

  const weeklyMoodData = getWeeklyMoodData();

  if (loading) {
    return <ActivityIndicator style={styles.loadingIndicator} size="large" color="#007BFF" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="#66509e" />
          </TouchableOpacity>
          <Text style={styles.title}>Mood History</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={fetchMoodHistory} disabled={refreshing}>
            <Icon name="refresh" size={30} color={refreshing ? "#CCC" : "#66509e"} />
          </TouchableOpacity>
        </View>

        <View style={styles.statisticsContainer}>
          <Text style={styles.statisticsTitle}>Mood Statistics</Text>
          {statistics ? (
            Object.entries(statistics).map(([mood, percentage]) => (
              <View key={mood} style={styles.statisticItem}>
                <Text style={styles.statisticText}>{mood}: {percentage.toFixed(1)}%</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noStatisticsText}>No statistics available yet.</Text>
          )}
        </View>

        <ScrollView horizontal contentContainerStyle={styles.weeklyContainer}>
          {Object.entries(weeklyMoodData).map(([date, mood], index) => {
            const day = moment(date).format('ddd');
            return (
              <View key={index} style={styles.dayMoodContainer}>
                <Text style={styles.dayText}>{day}</Text>
                <View style={styles.moodCircle}>
                  <Text style={styles.weeklyMoodEmoji}>{mood || ' '}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    padding: 20,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  backButton: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {},
  statisticsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  statisticItem: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statisticText: {
    fontSize: 18,
    color: '#555',
  },
  noStatisticsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  weeklyContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  dayMoodContainer: {
    alignItems: 'center',
    marginHorizontal: 10, // Space between each day
  },
  dayText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  moodCircle: {
    width: 60, // Increased size to better fit content
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  weeklyMoodEmoji: {
    fontSize: 40,
    lineHeight: 40, // Centering emoji
    textAlign: 'center',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default MoodHistory;

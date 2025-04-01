import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TaskScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',    // Center content horizontally
    backgroundColor: '#f0f8ff', // Light background color
  },
  text: {
    fontSize: 24,          // Font size for the text
    fontWeight: 'bold',    // Bold text
    color: '#333',         // Text color
  },
});

export default TaskScreen;

import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, FlatList } from "react-native";
import { fetchJournals, deleteJournal } from "../api/journalApi";
import JournalList from "../components/JournalList";

const JournalScreen = ({ navigation, route }) => {
  const [journals, setJournals] = useState([]);
  const userId = "USER_ID"; // Replace with actual user ID from auth

  useEffect(() => {
    loadJournals();
  }, []);

  const loadJournals = async () => {
    const data = await fetchJournals(userId);
    setJournals(data);
  };

  const handleDelete = async (id) => {
    await deleteJournal(id);
    loadJournals();
  };

  return (
    <View style={styles.container}>
      <Button title="Add Journal" onPress={() => navigation.navigate("AddJournal")} />
      <FlatList
        data={journals}
        renderItem={({ item }) => (
          <JournalList
            journals={journals}
            onEdit={(journal) => navigation.navigate("EditJournal", { journal })}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default JournalScreen;

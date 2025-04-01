import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { updateJournal } from "../api/journalApi";

const EditJournalScreen = ({ route, navigation }) => {
  const { journal } = route.params; // Retrieve the journal data passed from JournalScreen

  const [title, setTitle] = useState(journal.title);
  const [content, setContent] = useState(journal.content);

  const handleUpdate = async () => {
    await updateJournal(journal._id, { title, content });
    navigation.goBack(); // Go back to the JournalScreen after saving changes
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Save" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
});

export default EditJournalScreen;

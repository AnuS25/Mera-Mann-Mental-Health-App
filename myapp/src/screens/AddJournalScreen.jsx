import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { addJournal } from "../api/journalApi.js";
import { useAuth } from "./Auth.jsx";
const AddJournalScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userData, isLoggedIn } = useAuth(); // Access userData and login status from AuthContext
console.log('User Data:', userData);

//   const handleAdd = async () => {
//     const userId = "USER_ID"; // Replace with actual user ID
//     await addJournal({ userId, title, content });
//     navigation.goBack();
//   };
const handleAdd = async () => {
  //const journalData = await addJournal({ userId, title, content });

    console.log("Adding journal with title:", title, "and content:", content);

    // Check if user is logged in
    if (!isLoggedIn || !userData) {
     alert("Error", "You must be logged in to add a journal.");
      return;
    }

    // Ensure title and content are provided
    if (!title || !content) {
      alert("Error", "Please fill in both title and content.");
      return;
    }

    const userId = userData._id; // Assuming userData contains the _id property

    try {
      // Add journal using the API call
      //await addJournal({ userId, title, content });
          console.log('Sending data to API:', { userId, title, content });

      const journalData = await addJournal({ userId, title, content });
    console.log("Journal created:", journalData);
      navigation.goBack(); // Navigate back to the previous screen after adding the journal
    } catch (error) {
      console.error("Error adding journal:", error);
        const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred";

      alert("Error",`Failed to add journal: ${error.response?.data?.error || error.message || "Unknown error occurred"}`);
    }
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
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
});

export default AddJournalScreen;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const JournalList = ({ journals, onEdit, onDelete }) => {
  return (
    <View>
      {journals.map((journal) => (
        <View key={journal._id} style={styles.card}>
          <Text style={styles.title}>{journal.title}</Text>
          <Text>{journal.content}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit(journal)}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(journal._id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 10, margin: 10, backgroundColor: "#f9f9f9", borderRadius: 5 },
  title: { fontSize: 18, fontWeight: "bold" },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  edit: { color: "blue" },
  delete: { color: "red" },
});

export default JournalList;

import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { db, auth } from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export default function CreateEditEventScreen({ navigation, route }) {
  const { event } = route.params || {};
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState(event?.date || "");

  const handleSave = async () => {
    if (!title || !date) {
      Alert.alert("Error", "Title and date are required.");
      return;
    }
    try {
      if (event) {
        await updateDoc(doc(db, "events", event.id), {
          title,
          description,
          date,
          owner: auth.currentUser.uid, // Keep owner info intact!
        });
      } else {
        await addDoc(collection(db, "events"), {
          title,
          description,
          date,
          owner: auth.currentUser.uid, // Save event with owner
        });
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text style={styles.heading}>{event ? "Edit Event" : "Create Event"}</Text>
          <TextInput
            label="Event Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
            mode="outlined"
          />
          <TextInput
            label="Date (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
            style={styles.input}
            mode="outlined"
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleSave}
          >
            {event ? "Update Event" : "Create Event"}
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            style={styles.link}
          >
            Cancel
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#F5F8FF" },
  card: { marginHorizontal: 16, borderRadius: 18, paddingVertical: 8 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#26324D", marginBottom: 14, textAlign: "center" },
  input: { marginBottom: 14, backgroundColor: "#f8fafc" },
  button: { marginVertical: 8, borderRadius: 8 , backgroundColor:"#4A9DAE"},
  link: { marginTop: 8 }
});

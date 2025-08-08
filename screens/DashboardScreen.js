import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Appbar, FAB } from "react-native-paper";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import EventCard from "../components/EventCard";
import { listenFavourites, toggleFavourite } from "../favourites";

export default function DashboardScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const user = auth.currentUser;

  // Fetch only events owned by the current user
  useEffect(() => {
    const q = query(collection(db, "events"), where("owner", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsub = listenFavourites(setFavourites);
    return unsub;
  }, []);

  const handleLogout = async () => await signOut(auth);

  const handleDelete = (eventId) => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteDoc(doc(db, "events", eventId)),
      },
    ]);
  };

  const handleEdit = (event) => navigation.navigate("CreateEditEvent", { event });

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="My Events" />
        <Appbar.Action icon="star" onPress={() => navigation.navigate("Favourites")} />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>
      <View style={styles.listContainer}>
        {events.length === 0 ? (
          <Text style={styles.emptyText}>No Events</Text>
        ) : (
          events.map((item) => (
            <EventCard
              key={item.id}
              event={item}
              isFav={favourites.includes(item.id)}
              canEdit={item.owner === user.uid}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
              onFav={() => toggleFavourite(item.id, favourites.includes(item.id))}
            />
          ))
        )}
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        label="Create"
        onPress={() => navigation.navigate("CreateEditEvent")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F8FF" },
  header: { backgroundColor: "#77CBDA" },
  listContainer: { flex: 1, paddingTop: 4 },
  emptyText: { textAlign: "center", marginTop: 32, color: "#B0B0B0", fontSize: 18 },
  fab: { position: "absolute", right: 16, bottom: 24, backgroundColor: "#4A9DAE" },
});

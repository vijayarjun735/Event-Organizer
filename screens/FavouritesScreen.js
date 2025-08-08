import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import EventCard from "../components/EventCard";
import { toggleFavourite, listenFavourites } from "../favourites";

export default function FavouritesScreen({ navigation }) {
  const [favEvents, setFavEvents] = useState([]);
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    const unsub = listenFavourites(setFavIds);
    return unsub;
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = [];
      for (const id of favIds) {
        const eventSnap = await getDoc(doc(db, "events", id));
        if (eventSnap.exists()) {
          events.push({ id, ...eventSnap.data() });
        }
      }
      setFavEvents(events);
    };
    if (favIds.length > 0) {
      fetchEvents();
    } else {
      setFavEvents([]);
    }
  }, [favIds]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Favourites" />
      </Appbar.Header>
      <View style={styles.listContainer}>
        {favEvents.length === 0 ? (
          <Text style={styles.emptyText}>No Favourites</Text>
        ) : (
          favEvents.map((item) => (
            <EventCard
              key={item.id}
              event={item}
              isFav={true}
              onFav={() => toggleFavourite(item.id, true)}
              canEdit={false}
            />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F8FF" },
  header: { backgroundColor: "#77CBDA" },
  listContainer: { flex: 1, paddingTop: 4 },
  emptyText: { textAlign: "center", marginTop: 32, color: "#B0B0B0", fontSize: 18 },
});

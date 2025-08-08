import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

export default function EventCard({ event, onEdit, onDelete, onFav, isFav, canEdit }) {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Title
        title={event.title || ""}
        subtitle={event.date || ""}
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
      />
      <Card.Content>
        <Text style={styles.desc}>{event.description || "No Description"}</Text>
      </Card.Content>
      <View style={styles.actionRow}>
        {onFav && (
          <IconButton
            icon={isFav ? "star" : "star-outline"}
            size={24}
            onPress={onFav}
            style={styles.icon}
            accessibilityLabel={isFav ? "Remove from favourites" : "Add to favourites"}
          />
        )}
        {canEdit && (
          <>
            <IconButton
              icon="pencil"
              size={24}
              onPress={onEdit}
              style={styles.icon}
              accessibilityLabel="Edit event"
            />
            <IconButton
              icon="delete"
              size={24}
              onPress={onDelete}
              style={styles.icon}
              accessibilityLabel="Delete event"
            />
          </>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#26324D",
  },
  subtitle: {
    fontSize: 14,
    color: "#808080",
  },
  desc: {
    marginTop: 2,
    marginBottom: 8,
    fontSize: 15,
    color: "#393939",
    letterSpacing: 0.2,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 4,
    paddingBottom: 2,
  },
  icon: {
    marginHorizontal: 2,
  },
});

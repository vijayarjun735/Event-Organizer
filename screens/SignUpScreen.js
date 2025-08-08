import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Missing Info", "Please fill out all fields.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigation happens automatically via auth state in App.js
    } catch (err) {
      Alert.alert("Sign Up Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text style={styles.heading}>Sign Up</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleSignUp}
            loading={loading}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            style={styles.link}
          >
            Already have an account? Sign In
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#F5F8FF" },
  card: { marginHorizontal: 16, borderRadius: 18, paddingVertical: 8 },
  heading: { fontSize: 26, fontWeight: "bold", color: "#26324D", marginBottom: 18, textAlign: "center" },
  input: { marginBottom: 14, backgroundColor: "#f8fafc" },
  button: { marginVertical: 8, borderRadius: 8 ,backgroundColor:"#4A9DAE"},
  link: { marginTop: 8 }
});

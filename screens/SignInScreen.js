import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Make sure this is your correct import!

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation happens automatically on auth state change in App.js
    } catch (err) {
      Alert.alert("Sign In Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text style={styles.heading}>Sign In</Text>
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
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleSignIn}
            loading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("SignUp")}
            style={styles.link}
          >
            Don't have an account? Sign Up
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
  button: { marginVertical: 8, borderRadius: 8 , backgroundColor:"#4A9DAE"},
  link: { marginTop: 8 }
});

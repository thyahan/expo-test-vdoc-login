import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const url = "https://asia-northeast1-true-videocall-staging.cloudfunctions.net/keycloakLogin";

type Realm = "dealer" | "employee";
type Payload = {
  username: string;
  password: string;
  realm: Realm;
};

async function callAPILogin(payload: Payload) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch(err => {
    console.error("Error during API call", err);
    throw err;
  });
}

export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<string[]>([]);

  const updateFeedback = (nextFeedback: string) => {
    setFeedback(prev => [...prev, nextFeedback]);
  };

  const onLogin = (realm: Realm) => {
    setFeedback([]);
    updateFeedback(JSON.stringify({ username, password, realm }, null, 2));
    updateFeedback("Calling API...");
    callAPILogin({ realm, username, password })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        updateFeedback("Error during API call see console for more details");
      })
      .then(data => updateFeedback(JSON.stringify(data, null, 2)))
      .finally(() => updateFeedback("Done"));
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Test Login VDOC</Text>

      <TextInput style={styles.input} placeholder="username" onChangeText={setUsername}></TextInput>
      <TextInput style={styles.input} placeholder="password" onChangeText={setPassword}></TextInput>

      <View style={styles.buttonGroup}>
        <Pressable onPress={() => onLogin("employee")}>
          <Text style={styles.button}>Login As Shop</Text>
        </Pressable>
        <Pressable onPress={() => onLogin("dealer")}>
          <Text style={styles.button}>Login As Partner</Text>
        </Pressable>
      </View>

      <View style={styles.feedbackHeader}>
        <Pressable onPress={() => setFeedback([])}>
          <Text
            style={{
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
              textDecorationColor: "black",
            }}>
            Clear
          </Text>
        </Pressable>
      </View>
      <ScrollView style={styles.feedback}>
        {feedback.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 12,
    paddingTop: 48,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
  },

  feedback: {
    margin: 12,
    minHeight: 400,
    backgroundColor: "silver",
  },

  feedbackItem: {
    color: "#000",
    fontFamily: "monospace",
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },

  button: {
    backgroundColor: "#333",
    color: "white",
    padding: 12,
    borderRadius: 6,
  },

  feedbackHeader: {
    padding: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

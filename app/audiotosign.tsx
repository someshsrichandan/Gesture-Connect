import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

const { width } = Dimensions.get("window");

const VoiceToSign = () => {
  const [recognizing, setRecognizing] = useState(false);
  const [queryText, setQueryText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [speed, setSpeed] = useState("medium");

  const signDictionary = {
    a: require("../assets/signs/letters/a.jpg"),
    b: require("../assets/signs/letters/b.jpg"),
    c: require("../assets/signs/letters/c.jpg"),
    d: require("../assets/signs/letters/d.jpg"),
    e: require("../assets/signs/letters/e.jpg"),
    f: require("../assets/signs/letters/f.jpg"),
    g: require("../assets/signs/letters/g.jpg"),
    h: require("../assets/signs/letters/h.jpg"),
    i: require("../assets/signs/letters/i.jpg"),
    j: require("../assets/signs/letters/j.jpg"),
    k: require("../assets/signs/letters/k.jpg"),
    l: require("../assets/signs/letters/l.jpg"),
    m: require("../assets/signs/letters/m.jpg"),
    n: require("../assets/signs/letters/n.jpg"),
    o: require("../assets/signs/letters/o.jpg"),
    p: require("../assets/signs/letters/p.jpg"),
    q: require("../assets/signs/letters/q.jpg"),
    r: require("../assets/signs/letters/r.jpg"),
    s: require("../assets/signs/letters/s.jpg"),
    t: require("../assets/signs/letters/t.jpg"),
    u: require("../assets/signs/letters/u.jpg"),
    v: require("../assets/signs/letters/v.jpg"),
    w: require("../assets/signs/letters/w.jpg"),
    x: require("../assets/signs/letters/x.jpg"),
    y: require("../assets/signs/letters/y.jpg"),
    z: require("../assets/signs/letters/z.jpg"),
  };

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setQueryText(event.results[0]?.transcript || "");
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("Error code:", event.error, "Message:", event.message);
  });

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted:", result);
      return;
    }
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      maxAlternatives: 1,
    });
  };

  const handleStop = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  const getSignSequence = (inputText) => {
    const words = inputText.toLowerCase().trim().split("");
    return words.map((letter) => ({
      type: "letter",
      content: letter,
      sign: signDictionary[letter] || null,
    }));
  };

  const signs = getSignSequence(queryText);

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.languageTitle}>Sign Language</Text>

      <View style={styles.speedControlsContainer}>
        <TouchableOpacity
          style={[styles.speedButton, speed === "slow" && styles.activeSpeedButton]}
          onPress={() => handleSpeedChange("slow")}
        >
          <Text style={styles.buttonText}>Slow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.speedButton, speed === "medium" && styles.activeSpeedButton]}
          onPress={() => handleSpeedChange("medium")}
        >
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.speedButton, speed === "fast" && styles.activeSpeedButton]}
          onPress={() => handleSpeedChange("fast")}
        >
          <Text style={styles.buttonText}>Fast</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.microphoneButton, recognizing && styles.activeButton]}
        onPress={() => (recognizing ? handleStop() : handleStart())}
      >
        <Text style={styles.buttonText}>{recognizing ? "Stop" : "Start"}</Text>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Recognized text will appear here..."
          value={queryText}
          onChangeText={(text) => setQueryText(text)}
          multiline
        />
      </View>

      {recognizing && <ActivityIndicator size="large" color="#007AFF" />}

      <FlatList
        data={signs}
        renderItem={({ item }) =>
          item.sign ? (
            <View style={styles.signItem}>
              <Image source={item.sign} style={styles.signImage} />
              <Text style={styles.signText}>{item.content}</Text>
            </View>
          ) : null
        }
        keyExtractor={(_, index) => index.toString()}
        horizontal
        style={styles.signList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default VoiceToSign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
  },
  languageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  speedControlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  speedButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
  },
  activeSpeedButton: {
    backgroundColor: "#007AFF",
  },
  microphoneButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 20,
  },
  activeButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  textContainer: {
    width: "100%",
    marginBottom: 20,
  },
  textInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    textAlignVertical: "top",
  },
  signList: {
    marginTop: 20,
  },
  signItem: {
    alignItems: "center",
    marginRight: 15,
  },
  signImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  signText: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
});
